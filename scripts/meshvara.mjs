#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import {
  normalizeRegistry,
  outputPath,
  readZipEntries,
  resolveArchiveLocation,
  sha256Hex,
  stripSingleRoot,
} from './distribution/core.mjs'
import { inspectPackContract } from './distribution/pack-contract.mjs'

const DEFAULT_REGISTRY = 'https://raw.githubusercontent.com/smeetbuilds/meshwara/main/public/downloads/manifest.json'
const MAX_REGISTRY_BYTES = 8 * 1024 * 1024
const MAX_ARCHIVE_BYTES = 256 * 1024 * 1024
const DEFAULT_FETCH_TIMEOUT_MS = 120_000

function usage() {
  return `MESHVARA CLI\n\nUsage:\n  meshvara list [query] [--json]\n  meshvara info <slug> [--json]\n  meshvara verify <slug> [--registry <url|file>] [--archive <zip>] [--require-pack-v1]\n  meshvara add <slug> [--dir <path>] [--registry <url|file>] [--archive <zip>] [--dry-run] [--force] [--require-pack-v1]\n  meshvara doctor [--registry <url|file>]\n\nDefaults:\n  registry  ${DEFAULT_REGISTRY}\n  directory src/components/meshvara/<slug>\n\nCore commands never require authentication or upload project data.`
}

function parseArgs(argv) {
  const [command = 'help', ...rest] = argv
  const positionals = []
  const options = {}
  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index]
    if (!value.startsWith('--')) {
      positionals.push(value)
      continue
    }
    const key = value.slice(2)
    if (['dry-run', 'force', 'json', 'require-pack-v1'].includes(key)) options[key] = true
    else {
      const next = rest[index + 1]
      if (!next || next.startsWith('--')) throw new Error(`--${key} requires a value.`)
      options[key] = next
      index += 1
    }
  }
  return { command, positionals, options }
}

async function exists(path) {
  try { await access(path, constants.F_OK); return true } catch { return false }
}

function fetchTimeoutMs() {
  const configured = Number(process.env.MESHVARA_FETCH_TIMEOUT_MS)
  return Number.isFinite(configured) && configured > 0 ? Math.floor(configured) : DEFAULT_FETCH_TIMEOUT_MS
}

function payloadLimitMessage(maxBytes) {
  return `Remote payload exceeds the ${Math.floor(maxBytes / (1024 * 1024))} MB safety limit.`
}

async function readLocation(location, maxBytes = MAX_ARCHIVE_BYTES) {
  if (/^https?:\/\//i.test(location)) {
    const controller = new AbortController()
    const timeoutMs = fetchTimeoutMs()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const response = await fetch(location, {
        redirect: 'follow',
        headers: { 'user-agent': 'meshvara-cli/1' },
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`HTTP ${response.status} while reading ${location}`)
      const declaredBytes = Number(response.headers.get('content-length'))
      if (Number.isFinite(declaredBytes) && declaredBytes > maxBytes) throw new Error(payloadLimitMessage(maxBytes))
      if (!response.body) {
        const bytes = Buffer.from(await response.arrayBuffer())
        if (bytes.byteLength > maxBytes) throw new Error(payloadLimitMessage(maxBytes))
        return bytes
      }
      const reader = response.body.getReader()
      const chunks = []
      let total = 0
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        total += value.byteLength
        if (total > maxBytes) {
          await reader.cancel()
          throw new Error(payloadLimitMessage(maxBytes))
        }
        chunks.push(Buffer.from(value))
      }
      return Buffer.concat(chunks, total)
    } catch (error) {
      if (controller.signal.aborted) throw new Error(`Timed out after ${timeoutMs} ms while reading ${location}.`)
      throw error
    } finally {
      clearTimeout(timeout)
    }
  }
  const bytes = await readFile(resolve(location))
  if (bytes.byteLength > maxBytes) throw new Error(`Local payload exceeds the ${Math.floor(maxBytes / (1024 * 1024))} MB safety limit.`)
  return bytes
}

async function loadRegistry(location) {
  const raw = await readLocation(location, MAX_REGISTRY_BYTES)
  return normalizeRegistry(JSON.parse(raw.toString('utf8')))
}

function findAsset(registry, slug) {
  const asset = registry.assets.find((item) => item.slug === slug)
  if (!asset) throw new Error(`Unknown Meshvara asset: ${slug}`)
  return asset
}

async function archiveFor(asset, registryLocation, override) {
  if (asset.bytes > MAX_ARCHIVE_BYTES) throw new Error(`${asset.slug}: archive exceeds the 256 MB CLI safety limit.`)
  const location = override ? resolve(override) : resolveArchiveLocation(registryLocation, asset.file)
  const bytes = await readLocation(location, asset.bytes)
  if (bytes.byteLength !== asset.bytes) throw new Error(`${asset.slug}: archive byte-size mismatch (expected ${asset.bytes}, received ${bytes.byteLength}).`)
  const digest = sha256Hex(bytes)
  if (digest !== asset.sha256) throw new Error(`${asset.slug}: SHA-256 mismatch. Refusing to extract untrusted bytes.`)
  return { location, bytes }
}

function dependencyHint(entries, contract) {
  const deps = contract?.metadata?.dependencies && typeof contract.metadata.dependencies === 'object'
    ? Object.entries(contract.metadata.dependencies)
    : null
  if (deps?.length) return `bun add ${deps.map(([name, version]) => `${name}@${version}`).join(' ')}`
  const pkg = entries.find((entry) => entry.relative === 'package.json')
  if (!pkg) return null
  try {
    const parsed = JSON.parse(pkg.bytes.toString('utf8'))
    const fallback = Object.entries(parsed.dependencies ?? {})
    return fallback.length ? `bun add ${fallback.map(([name, version]) => `${name}@${version}`).join(' ')}` : null
  } catch { return null }
}

function validateArchiveContract(asset, entries, requireV1 = false) {
  return inspectPackContract(asset, entries, { requireV1 })
}

async function commandList(registry, query, asJson) {
  const needle = (query ?? '').toLowerCase()
  const assets = registry.assets.filter((asset) => !needle || `${asset.slug} ${asset.name} ${asset.category} ${asset.subcategory ?? ''}`.toLowerCase().includes(needle))
  if (asJson) return console.log(JSON.stringify(assets, null, 2))
  for (const asset of assets) console.log(`${asset.slug.padEnd(34)} ${asset.name} · ${asset.category}`)
  console.log(`\n${assets.length}/${registry.count} assets`)
}

async function commandInfo(registry, slug, asJson) {
  const asset = findAsset(registry, slug)
  if (asJson) return console.log(JSON.stringify({ ...asset, packSchemaVersion: registry.packSchemaVersion }, null, 2))
  console.log(`${asset.name}\nslug      ${asset.slug}\ncategory  ${asset.category}${asset.subcategory ? ` / ${asset.subcategory}` : ''}\narchive   ${asset.bytes.toLocaleString()} bytes\nsha256    ${asset.sha256}\npack      ${registry.packSchemaVersion === 1 ? 'Pack-v1 release' : 'legacy/unspecified'}`)
}

async function commandVerify(registry, registryLocation, slug, archiveOverride, requireV1 = false) {
  const asset = findAsset(registry, slug)
  const archive = await archiveFor(asset, registryLocation, archiveOverride)
  const entries = stripSingleRoot(readZipEntries(archive.bytes), slug)
  const contract = validateArchiveContract(asset, entries, requireV1 || registry.packSchemaVersion === 1)
  const label = contract.version === 1 ? `Pack-v1 + ${contract.metadata.files.length} manifested payload files` : `${entries.length} ZIP file entries · legacy pack contract`
  console.log(`Verified ${asset.name}: SHA-256 + ${label} (${archive.location})`)
}

async function commandAdd(registry, registryLocation, slug, options) {
  const asset = findAsset(registry, slug)
  const archive = await archiveFor(asset, registryLocation, options.archive)
  const entries = stripSingleRoot(readZipEntries(archive.bytes), slug)
  const contract = validateArchiveContract(asset, entries, options['require-pack-v1'] || registry.packSchemaVersion === 1)
  const destination = resolve(options.dir ?? 'src/components/meshvara', slug)
  const planned = entries.map((entry) => ({ entry, target: outputPath(destination, entry.relative) }))
  const conflicts = []
  for (const item of planned) if (await exists(item.target)) conflicts.push(item.target)
  if (conflicts.length && !options.force) throw new Error(`Refusing to overwrite ${conflicts.length} existing file(s). Re-run with --force or choose --dir.`)

  console.log(`${options['dry-run'] ? 'Dry run' : 'Installing'} ${asset.name}`)
  console.log(`archive   ${archive.location}`)
  console.log(`verified  sha256:${asset.sha256}`)
  console.log(`pack      ${contract.version === 1 ? `Pack-v1 · ${contract.metadata.sourceKind} · ${contract.metadata.component ?? 'source entrypoint'}` : 'legacy metadata contract'}`)
  console.log(`target    ${destination}`)
  for (const item of planned) console.log(`${options['dry-run'] ? 'would write' : 'write'}    ${item.entry.relative}`)
  if (options['dry-run']) return

  for (const item of planned) {
    await mkdir(resolve(item.target, '..'), { recursive: true })
    await writeFile(item.target, item.entry.bytes)
  }
  const hint = dependencyHint(entries, contract)
  console.log(`\nInstalled ${planned.length} files. No account or runtime Meshvara API is required.`)
  if (hint) console.log(`Dependencies from the pack:\n  ${hint}`)
}

async function main() {
  const { command, positionals, options } = parseArgs(process.argv.slice(2))
  if (command === 'help' || command === '--help' || command === '-h') return console.log(usage())
  const registryLocation = options.registry ?? process.env.MESHVARA_REGISTRY ?? DEFAULT_REGISTRY
  const registry = await loadRegistry(registryLocation)
  if (command === 'list') return commandList(registry, positionals[0], options.json)
  if (command === 'info') return commandInfo(registry, positionals[0], options.json)
  if (command === 'verify') return commandVerify(registry, registryLocation, positionals[0], options.archive, options['require-pack-v1'])
  if (command === 'add') return commandAdd(registry, registryLocation, positionals[0], options)
  if (command === 'doctor') {
    console.log(`MESHVARA CLI ready\nregistry  ${registryLocation}\nassets    ${registry.count}\npack      ${registry.packSchemaVersion === 1 ? 'Pack-v1' : 'legacy/unspecified'}\nnode      ${process.version}\nnetwork   ${/^https?:/.test(registryLocation) ? 'registry reachable' : 'local registry'}`)
    return
  }
  throw new Error(`Unknown command: ${command}\n\n${usage()}`)
}

main().catch((error) => {
  console.error(`MESHVARA CLI ERROR: ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
})
