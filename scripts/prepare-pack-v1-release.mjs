#!/usr/bin/env node
// Create a reviewable Pack-v1 candidate without rewriting the source checkout.
// No branches, commits, PRs, CI, network services or deployments are created by this script.
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import {
  copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync,
  readdirSync, realpathSync, rmSync, writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'

const EXPECTED_BUN = '1.3.14'
const EXPECTED_ASSETS = 500
const SHA256 = /^[a-f0-9]{64}$/
const safeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const allowedChange = /^(?:public\/downloads\/(?:manifest\.json|[a-z0-9-]+\.zip)|public\/registry\/v1\.json|public\/quality\/asset-audit\.json|public\/(?:robots\.txt|sitemap\.xml))$/

function usage() {
  return 'Usage: node scripts/prepare-pack-v1-release.mjs [--root DIR] [--plan | --prepare --candidate-dir DIR] [--skip-browser]'
}
function parseArgs(args) {
  const config = { root: '.', mode: 'plan', candidateDir: null, skipBrowser: false }
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--root' && args[i + 1] && !args[i + 1].startsWith('--')) config.root = args[++i]
    else if (arg === '--plan') config.mode = 'plan'
    else if (arg === '--prepare') config.mode = 'prepare'
    else if (arg === '--candidate-dir' && args[i + 1] && !args[i + 1].startsWith('--')) config.candidateDir = args[++i]
    else if (arg === '--skip-browser') config.skipBrowser = true
    else throw new Error(usage())
  }
  if (config.mode === 'prepare' && !config.candidateDir) throw new Error('--prepare requires --candidate-dir; never overwrite the checkout')
  if (config.mode !== 'prepare' && (config.candidateDir || config.skipBrowser)) throw new Error('--candidate-dir/--skip-browser require --prepare')
  config.root = realpathSync(resolve(config.root))
  if (config.candidateDir) {
    config.candidateDir = resolve(config.candidateDir)
    if (!existsSync(dirname(config.candidateDir))) throw new Error('Candidate parent directory does not exist')
    config.candidateDir = join(realpathSync(dirname(config.candidateDir)), basename(config.candidateDir))
    if (within(config.candidateDir, config.root) || within(config.root, config.candidateDir)) {
      throw new Error('Candidate directory must be outside the repository')
    }
    if (existsSync(config.candidateDir)) throw new Error('Candidate directory already exists; refusing to overwrite')
  }
  return config
}
function within(child, parent) {
  const rel = relative(parent, child)
  return rel === '' || (rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel))
}
function command(binary, args, cwd, { quiet = false } = {}) {
  const result = spawnSync(binary, args, {
    cwd, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024,
    stdio: quiet ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    windowsHide: true,
  })
  if (result.error || result.status !== 0) {
    throw new Error(`${basename(binary)} ${args[0]} failed (status ${result.status ?? result.error?.code ?? 'unknown'})`)
  }
  return quiet ? result.stdout.trimEnd() : ''
}
function readManifest(root, expectedSchema) {
  const file = join(root, 'public/downloads/manifest.json')
  const data = JSON.parse(readFileSync(file, 'utf8'))
  if (data.count !== EXPECTED_ASSETS || !Array.isArray(data.assets) || data.assets.length !== EXPECTED_ASSETS) {
    throw new Error(`Expected ${EXPECTED_ASSETS} manifest assets`)
  }
  if (expectedSchema != null && data.packSchemaVersion !== expectedSchema) {
    throw new Error(`Expected Pack-v${expectedSchema} manifest`)
  }
  const names = new Set()
  for (const asset of data.assets) {
    if (!safeSlug.test(asset.slug) || names.has(asset.slug)) throw new Error('Invalid or duplicate manifest slug')
    names.add(asset.slug)
    if (asset.file !== `/downloads/${asset.slug}.zip` || !SHA256.test(asset.sha256) || !Number.isSafeInteger(asset.bytes) || asset.bytes <= 0) {
      throw new Error(`Malformed integrity metadata for ${asset.slug}`)
    }
  }
  return data
}
function verifyPhysicalPacks(root, manifest) {
  const digests = new Map()
  for (const asset of manifest.assets) {
    const content = readFileSync(join(root, 'public/downloads', `${asset.slug}.zip`))
    const digest = createHash('sha256').update(content).digest('hex')
    if (content.length !== asset.bytes || digest !== asset.sha256) {
      throw new Error(`Physical archive does not match manifest: ${asset.slug}`)
    }
    digests.set(asset.slug, { sha256: digest, bytes: content.length })
  }
  const files = readdirSync(join(root, 'public/downloads')).filter(name => name.endsWith('.zip'))
  if (files.length !== EXPECTED_ASSETS) throw new Error(`Expected ${EXPECTED_ASSETS} physical ZIP archives, got ${files.length}`)
  return digests
}
function inspectRepo(root) {
  if (realpathSync(command('git', ['rev-parse', '--show-toplevel'], root, { quiet: true })) !== root) throw new Error('Run from the repository root')
  const branch = command('git', ['symbolic-ref', '--quiet', '--short', 'HEAD'], root, { quiet: true })
  if (branch !== 'main') throw new Error('Only a clean main checkout may prepare a release candidate')
  if (command('git', ['status', '--porcelain', '--untracked-files=normal'], root, { quiet: true })) throw new Error('Source checkout is dirty; preserve existing work before preparing a candidate')
  const head = command('git', ['rev-parse', 'HEAD'], root, { quiet: true })
  const bun = spawnSync('bun', ['--version'], { cwd: root, encoding: 'utf8', windowsHide: true })
  return { head, branch, bun: bun.status === 0 ? bun.stdout.trim() : null }
}
function printPlan(info, manifest) {
  console.log(JSON.stringify({
    mode: 'plan', head: info.head, branch: info.branch, bunVersion: info.bun,
    expectedBun: EXPECTED_BUN, assets: manifest.count,
    packSchemaVersion: manifest.packSchemaVersion ?? 0,
    status: manifest.packSchemaVersion === 1 ? 'pack-v1-declared; physical audit still required' : 'legacy-snapshot; pack-v1 migration required',
    readyToPrepare: info.bun === EXPECTED_BUN,
    requires: ['clean frozen install', 'local study/history tests', 'bun run qa', 'bun run release:audit', 'browser E2E unless explicitly skipped', 'repeatable pack hashes', 'owner rights review'],
  }, null, 2))
}
function changedPaths(root) {
  const status = command('git', ['status', '--porcelain', '--untracked-files=all'], root, { quiet: true })
  if (!status) return []
  return status.split('\n').map(line => line.slice(3)).filter(Boolean).sort()
}
function prepare(config, info, original) {
  if (info.bun !== EXPECTED_BUN) throw new Error(`Requires local Bun ${EXPECTED_BUN}, found ${info.bun ?? 'not installed'}`)
  const scratch = mkdtempSync(join(tmpdir(), 'meshwara-pack-v1-'))
  const checkout = join(scratch, 'worktree')
  let worktreeAdded = false
  let outputCreated = false
  try {
    command('git', ['worktree', 'add', '--detach', '--quiet', checkout, info.head], config.root, { quiet: true })
    worktreeAdded = true
    console.log('Isolated, detached Git worktree created. No branch or source checkout edits.')
    command('bun', ['install', '--frozen-lockfile'], checkout)
    command('bun', ['run', 'study:check'], checkout)
    command('node', ['scripts/audit-study-history.mjs'], checkout)
    command('bun', ['run', 'qa'], checkout)
    command('bun', ['run', 'release:audit'], checkout)
    if (!config.skipBrowser) {
      command('bun', ['run', 'e2e:install'], checkout)
      command('bun', ['run', 'e2e'], checkout)
    }
    const firstManifest = readManifest(checkout, 1)
    const firstDigests = verifyPhysicalPacks(checkout, firstManifest)
    command('bun', ['run', 'packs'], checkout)
    command('bun', ['run', 'pack:check'], checkout)
    command('bun', ['run', 'release:audit'], checkout)
    const secondManifest = readManifest(checkout, 1)
    const secondDigests = verifyPhysicalPacks(checkout, secondManifest)
    for (const [slug, artifact] of firstDigests) {
      const again = secondDigests.get(slug)
      if (!again || again.sha256 !== artifact.sha256 || again.bytes !== artifact.bytes) {
        throw new Error(`Pack generation is not repeatable: ${slug}`)
      }
    }
    const changed = changedPaths(checkout)
    const unexpected = changed.filter(path => !allowedChange.test(path))
    if (unexpected.length) {
      throw new Error(`Generated unrelated files (${unexpected.length}); inspect in a disposable local worktree before proceeding: ${unexpected.slice(0, 8).join(', ')}`)
    }
    const oldBySlug = new Map(original.assets.map(asset => [asset.slug, asset]))
    if (secondManifest.assets.some(asset => !oldBySlug.has(asset.slug))) {
      throw new Error('Generated asset slugs differ from the published 500-archive snapshot')
    }
    const summary = secondManifest.assets.map(asset => {
      const old = oldBySlug.get(asset.slug)
      return { slug: asset.slug, previousSha256: old?.sha256 ?? null, candidateSha256: asset.sha256, changed: old?.sha256 !== asset.sha256 }
    })
    const report = {
      status: config.skipBrowser ? 'candidate-generated-browser-not-tested' : 'candidate-generated-review-required',
      sourceCommit: info.head, bunVersion: info.bun, packSchemaVersion: 1,
      assets: summary.length, changedArchives: summary.filter(x => x.changed).length,
      frozenInstall: 'passed', studyChecks: 'passed', historyScreen: 'passed-pattern-screen-only',
      qa: 'passed', releaseAudit: 'passed', browserE2E: config.skipBrowser ? 'not-run' : 'passed',
      deterministicSecondBuild: 'passed', changedTrackedOrUntrackedPaths: changed,
      archives: summary,
      warnings: ['Manual license/ownership clearance required', 'Candidate not published or approved', 'History scanner is heuristic and does not establish absence of secrets'],
    }
    mkdirSync(config.candidateDir) // exclusive; an existing candidate must never be replaced
    outputCreated = true
    mkdirSync(join(config.candidateDir, 'public', 'downloads'), { recursive: true })
    for (const asset of secondManifest.assets) {
      const source = join(checkout, 'public', 'downloads', `${asset.slug}.zip`)
      const target = join(config.candidateDir, 'public', 'downloads', `${asset.slug}.zip`)
      copyFileSync(source, target)
      const copied = readFileSync(target)
      if (copied.length !== asset.bytes || createHash('sha256').update(copied).digest('hex') !== asset.sha256) {
        throw new Error(`Candidate copy-integrity mismatch: ${asset.slug}`)
      }
    }
    copyFileSync(join(checkout, 'public', 'downloads', 'manifest.json'), join(config.candidateDir, 'public', 'downloads', 'manifest.json'))
    if (existsSync(join(checkout, 'public', 'registry', 'v1.json'))) {
      mkdirSync(join(config.candidateDir, 'public', 'registry'), { recursive: true })
      copyFileSync(join(checkout, 'public', 'registry', 'v1.json'), join(config.candidateDir, 'public', 'registry', 'v1.json'))
    }
    writeFileSync(join(config.candidateDir, 'REPORT.json'), `${JSON.stringify(report, null, 2)}\n`)
    console.log(`Candidate prepared at ${config.candidateDir}; ${report.changedArchives}/${report.assets} ZIP digests changed. Manual diff and licensing approval still required.`)
  } catch (error) {
    if (outputCreated) rmSync(config.candidateDir, { recursive: true, force: true })
    throw error
  } finally {
    if (worktreeAdded) {
      try { command('git', ['worktree', 'remove', '--force', checkout], config.root, { quiet: true }) }
      catch { console.error('Warning: temporary Git worktree registration may need manual cleanup') }
    }
    rmSync(scratch, { recursive: true, force: true })
  }
}

try {
  const config = parseArgs(process.argv.slice(2))
  const info = inspectRepo(config.root)
  const original = readManifest(config.root)
  if (config.mode === 'plan') printPlan(info, original)
  else prepare(config, info, original)
} catch (error) {
  console.error(`Pack-v1 preparation stopped: ${error.message}`)
  process.exitCode = 1
}
