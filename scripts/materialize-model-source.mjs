import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, isAbsolute, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

function usage() {
  console.error('Usage: bun scripts/materialize-model-source.mjs [--check-only] <staging-source.json> [output-directory]')
}

function fail(message) {
  throw new Error(message)
}

function validateRelativePath(value, label) {
  if (typeof value !== 'string' || !value || isAbsolute(value) || value.split(/[\\/]/).includes('..')) fail(`${label} must be a safe relative path`)
}

export function validateRegistry(registry, source = 'registry') {
  if (registry.schemaVersion !== 1) fail(`${source}: schemaVersion must be 1`)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(registry.id ?? '')) fail(`${source}: id must be lowercase kebab-case`)
  if (registry.publish !== false) fail(`${source}: staged source must explicitly set publish=false`)
  if (!/^https:\/\/github\.com\//.test(registry.sourceRepository ?? '')) fail(`${source}: sourceRepository must be an HTTPS GitHub repository URL`)
  if (!/^[a-f0-9]{40}$/.test(registry.sourceRevision ?? '')) fail(`${source}: sourceRevision must be a pinned 40-character Git object SHA`)
  if (!registry.license?.id || !registry.license?.author || !registry.license?.source) fail(`${source}: license id, author and source are required`)
  if (registry.license?.redistribution !== true || registry.license?.commercialUse !== true) fail(`${source}: staged source license must allow redistribution and commercial use`)
  if (!Array.isArray(registry.files) || !registry.files.length) fail(`${source}: files must be a non-empty array`)

  const destinations = new Set()
  let modelCount = 0
  let licenseCount = 0
  for (const [index, file] of registry.files.entries()) {
    const label = `${source}: files[${index}]`
    if (!['model', 'license', 'texture', 'animation', 'other'].includes(file.role)) fail(`${label}: unsupported role ${file.role}`)
    if (file.role === 'model') modelCount += 1
    if (file.role === 'license') licenseCount += 1
    validateRelativePath(file.destination, `${label}.destination`)
    if (destinations.has(file.destination)) fail(`${label}: duplicate destination ${file.destination}`)
    destinations.add(file.destination)
    if (!/^https:\/\/raw\.githubusercontent\.com\//.test(file.url ?? '')) fail(`${label}: url must be a raw.githubusercontent.com HTTPS URL`)
    if (!String(file.url).includes(`/${registry.sourceRevision}/`)) fail(`${label}: url must be pinned to sourceRevision ${registry.sourceRevision}`)
    if (!/^[a-f0-9]{40}$/.test(file.gitBlobSha1 ?? '')) fail(`${label}: gitBlobSha1 must be a lowercase 40-character SHA-1`)
    if (!Number.isSafeInteger(file.bytes) || file.bytes <= 0) fail(`${label}: bytes must be a positive integer`)
  }
  if (modelCount < 1) fail(`${source}: at least one model file is required`)
  if (licenseCount !== 1) fail(`${source}: exactly one license file is required`)
  return registry
}

export function gitBlobSha1(bytes) {
  const header = Buffer.from(`blob ${bytes.length}\0`)
  return createHash('sha1').update(header).update(bytes).digest('hex')
}

async function downloadVerified(file) {
  const response = await fetch(file.url, { redirect: 'follow' })
  if (!response.ok) fail(`${file.destination}: HTTP ${response.status} from source`)
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length !== file.bytes) fail(`${file.destination}: expected ${file.bytes} bytes, received ${bytes.length}`)
  const digest = gitBlobSha1(bytes)
  if (digest !== file.gitBlobSha1) fail(`${file.destination}: Git blob SHA-1 mismatch (${digest})`)
  return bytes
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const args = process.argv.slice(2)
  const checkOnly = args[0] === '--check-only'
  if (checkOnly) args.shift()
  const registryPath = args[0]
  if (!registryPath) {
    usage()
    process.exit(2)
  }

  const absoluteRegistry = resolve(registryPath)
  const registry = validateRegistry(JSON.parse(await readFile(absoluteRegistry, 'utf8')), registryPath)
  if (checkOnly) {
    console.log(`Staged source registry passed: ${registry.id} (${registry.files.filter((file) => file.role === 'model').length} model file(s), publish=false).`)
    process.exit(0)
  }

  const out = resolve(args[1] ?? `staging/materialized/${registry.id}`)
  await mkdir(out, { recursive: true })
  for (const file of registry.files) {
    const target = resolve(out, file.destination)
    if (!(target === out || target.startsWith(`${out}${sep}`))) fail(`${file.destination}: resolved path escaped output directory`)
    await mkdir(dirname(target), { recursive: true })
    const bytes = await downloadVerified(file)
    await writeFile(target, bytes)
    console.log(`Verified ${basename(file.destination)} (${bytes.length} bytes)`)
  }
  await writeFile(resolve(out, 'SOURCE_PROVENANCE.json'), JSON.stringify(registry, null, 2) + '\n')
  console.log(`Materialized ${registry.id} into ${out}. This is staged source only; no asset was published.`)
}
