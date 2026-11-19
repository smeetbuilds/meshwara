#!/usr/bin/env node
// Read-only, dependency-free screening for obvious disclosures in reachable Git blobs.
// This is not a substitute for Gitleaks, a full licensing review, or human inspection.
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const MAX_TEXT_BLOB_BYTES = 2 * 1024 * 1024
const BATCH_BYTES = 8 * 1024 * 1024
const MAX_BUFFER_BYTES = 32 * 1024 * 1024
const binaryExt = /\.(?:zip|glb|gltf|wasm|woff2?|ttf|otf|png|jpe?g|webp|gif|ico|pdf|mp4|mov|mp3|ogg|webm|avif)$/i
const sensitivePath = /(?:^|\/)(?:\.env(?:\.[^/]+)?|\.npmrc|\.netrc|\.pypirc|id_rsa|id_ed25519|credentials(?:\.[^/]+)?|[^/]+\.(?:pem|p12|pfx|key))$/i
const samplePath = /(?:^|\/)\.env\.(?:example|sample|template)$/i
const rules = [
  ['private-key-header', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['github-token', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{50,}\b/],
  ['openai-token', /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ['cloud-access-id', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['slack-token', /\bxox[baprs]-[A-Za-z0-9-]{25,}\b/],
  ['stripe-live-secret', /\b(?:sk_live|rk_live)_[A-Za-z0-9]{20,}\b/],
  ['hardcoded-credential', /\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|secret[_-]?key|password)\s*[:=]\s*["'`][A-Za-z0-9_+\/=.-]{16,}["'`]/i],
]

function git(repo, args, input, maxBuffer = MAX_BUFFER_BYTES) {
  const result = spawnSync('git', ['-C', repo, ...args], { input, maxBuffer, encoding: null, windowsHide: true })
  if (result.error || result.status !== 0) {
    throw new Error(`git ${args[0]} failed: ${result.error?.code || result.status}`)
  }
  return result.stdout
}
function cleanPath(path) {
  return path.replace(/[\u0000-\u001f\u007f]/g, '?').slice(0, 240)
}
function scanBuffer(blob, entry, findings, stats) {
  if (blob.includes(0)) { stats.skippedBinary++; return }
  let text
  try { text = new TextDecoder('utf-8', { fatal: true }).decode(blob) }
  catch { stats.skippedBinary++; return }
  stats.scannedTextBlobs++
  stats.scannedTextBytes += blob.byteLength
  const matched = rules.filter(([, regex]) => regex.test(text)).map(([type]) => type)
  if (matched.length) findings.push({ path: cleanPath(entry.path), blob: entry.sha.slice(0, 12), types: matched })
}
function audit(repo) {
  if (git(repo, ['rev-parse', '--is-inside-work-tree']).toString('utf8').trim() !== 'true') throw new Error('Not a Git worktree')
  const lines = git(repo, ['rev-list', '--objects', '--all']).toString('utf8').split('\n').filter(Boolean)
  const paths = new Map()
  for (const line of lines) {
    const space = line.indexOf(' ')
    const sha = space < 0 ? line : line.slice(0, space)
    const path = space < 0 ? '(path unknown)' : line.slice(space + 1)
    if (!paths.has(sha)) paths.set(sha, path)
  }
  const allShas = [...paths.keys()]
  const stats = { objects: allShas.length, reachableBlobs: 0, scannedTextBlobs: 0, scannedTextBytes: 0, skippedBinary: 0, skippedLarge: 0, skippedArchive: 0 }
  const findings = []
  const suspiciousFiles = []
  if (!allShas.length) return { status: 'review-required', findings, suspiciousFiles, stats }
  const meta = git(repo, ['cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize)'], `${allShas.join('\n')}\n`).toString('utf8').trim().split('\n')
  const blobs = []
  for (const item of meta) {
    const [sha, type, sizeRaw] = item.split(' ')
    if (type !== 'blob') continue
    const path = paths.get(sha) ?? '(path unknown)', size = Number(sizeRaw)
    stats.reachableBlobs++
    if (sensitivePath.test(path) && !samplePath.test(path)) suspiciousFiles.push({ path: cleanPath(path), blob: sha.slice(0, 12) })
    if (binaryExt.test(path)) { stats.skippedArchive++; continue }
    if (!Number.isFinite(size) || size > MAX_TEXT_BLOB_BYTES) { stats.skippedLarge++; continue }
    blobs.push({ sha, path, size })
  }
  for (let start = 0; start < blobs.length;) {
    const batch = [], total = { bytes: 0 }
    while (start < blobs.length && (batch.length === 0 || total.bytes + blobs[start].size <= BATCH_BYTES)) {
      const entry = blobs[start++]
      batch.push(entry)
      total.bytes += entry.size
    }
    const raw = git(repo, ['cat-file', '--batch'], `${batch.map(x => x.sha).join('\n')}\n`)
    let offset = 0
    for (const item of batch) {
      const end = raw.indexOf(10, offset)
      if (end < 0) throw new Error('Malformed git cat-file batch response')
      const header = raw.subarray(offset, end).toString('utf8').split(' ')
      if (header[0] !== item.sha || header[1] !== 'blob' || Number(header[2]) !== item.size) throw new Error('Unexpected Git object in batch')
      const next = end + 1 + item.size
      if (next >= raw.length || raw[next] !== 10) throw new Error('Malformed Git object boundary')
      scanBuffer(raw.subarray(end + 1, next), item, findings, stats)
      offset = next + 1
    }
  }
  return { status: findings.length || suspiciousFiles.length ? 'review-required' : 'no-pattern-match', findings, suspiciousFiles, stats, caveat: 'Heuristic scan; skipped archives/binaries and large blobs require manual/appropriate specialist review. No scan proves absence of secrets.' }
}

const args = process.argv.slice(2)
const usage = 'Usage: node scripts/audit-study-history.mjs [--json] [--repo directory]'
let repo = '.'
let json = false
for (let index = 0; index < args.length; index++) {
  const argument = args[index]
  if (argument === '--json') { json = true; continue }
  if (argument === '--repo' && args[index + 1] && !args[index + 1].startsWith('--')) { repo = args[++index]; continue }
  console.error(usage)
  process.exit(1)
}
repo = resolve(repo)
try {
  const result = audit(repo)
  if (json) console.log(JSON.stringify(result, null, 2))
  else {
    console.log(`Reachable Git blobs: ${result.stats.reachableBlobs}; text scanned: ${result.stats.scannedTextBlobs}; skipped opaque/large: ${result.stats.skippedArchive + result.stats.skippedBinary + result.stats.skippedLarge}`)
    for (const hit of result.findings) console.log(`REVIEW ${hit.path} blob=${hit.blob} patterns=${hit.types.join(',')}`)
    for (const file of result.suspiciousFiles) console.log(`REVIEW FILE ${file.path} blob=${file.blob}`)
    console.log(`Result: ${result.status}. ${result.caveat}`)
  }
  if (result.status === 'review-required') process.exitCode = 2
} catch (error) {
  // Deliberately avoid printing potentially sensitive Git output.
  console.error(`History audit unavailable: ${error instanceof Error ? error.message : 'unknown error'}`)
  process.exitCode = 1
}
