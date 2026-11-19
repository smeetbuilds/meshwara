import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { deflateRawSync } from 'node:zlib'
import { inspectArchive } from '../../scripts/study-archive-scan.mjs'

function fixtureZip(members) {
  const locals = [], central = []
  let offset = 0
  for (const [filename, source] of members) {
    const name = Buffer.from(filename), body = Buffer.from(source), zipped = deflateRawSync(body)
    const local = Buffer.alloc(30)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(8, 8)
    local.writeUInt32LE(zipped.length, 18)
    local.writeUInt32LE(body.length, 22)
    local.writeUInt16LE(name.length, 26)
    locals.push(local, name, zipped)
    const meta = Buffer.alloc(46)
    meta.writeUInt32LE(0x02014b50, 0)
    meta.writeUInt16LE(20, 4)
    meta.writeUInt16LE(20, 6)
    meta.writeUInt16LE(8, 10)
    meta.writeUInt32LE(zipped.length, 20)
    meta.writeUInt32LE(body.length, 24)
    meta.writeUInt16LE(name.length, 28)
    meta.writeUInt32LE(offset, 42)
    central.push(meta, name)
    offset += local.length + name.length + zipped.length
  }
  const directory = Buffer.concat(central)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(members.length, 8)
  end.writeUInt16LE(members.length, 10)
  end.writeUInt32LE(directory.length, 12)
  end.writeUInt32LE(offset, 16)
  return Buffer.concat([...locals, directory, end])
}

const secret = 'ghp_' + 'Q'.repeat(36)
const archive = fixtureZip([
  ['scene/src/index.ts', "const token = '" + secret + "'"],
  ['scene/.env.production', 'TEMP=synthetic'],
])
const read = []
const parsed = inspectArchive(archive, (name, bytes) => read.push([name, bytes.toString('utf8')]))
assert.deepEqual(parsed.issues, [])
assert.equal(parsed.inspected, 2)
assert.equal(read[0][1].includes(secret), true)
assert.ok(inspectArchive(Buffer.from('not zip'), () => {}).issues.length)
const oversized = inspectArchive(fixtureZip([['large.txt', 'x'.repeat(2 * 1024 * 1024 + 1)]]), () => { throw new Error('large entry must not be expanded') })
assert.ok(oversized.issues.includes('expanded-size-limit'))

const root = mkdtempSync(join(tmpdir(), 'meshwara-archive-scan-'))
const git = (...args) => {
  const r = spawnSync('git', args, { cwd: root, encoding: 'utf8' })
  assert.equal(r.status, 0, 'git ' + args.join(' ') + ' failed')
}
try {
  git('init', '-q', '--initial-branch=main')
  git('config', 'user.name', 'Synthetic Test')
  git('config', 'user.email', 'test@example.invalid')
  mkdirSync(join(root, 'published'))
  writeFileSync(join(root, 'published', 'sample.zip'), archive)
  git('add', '.')
  git('commit', '-qm', 'synthetic packed source')
  const scanner = new URL('../../scripts/audit-study-history.mjs', import.meta.url).pathname
  const result = spawnSync('node', [scanner, '--json', '--repo', root], { encoding: 'utf8' })
  assert.equal(result.status, 2)
  assert.equal(result.stdout.includes(secret), false, 'candidate token must not appear in scanner output')
  const report = JSON.parse(result.stdout)
  assert.ok(report.findings.some(x => x.path === 'published/sample.zip!scene/src/index.ts' && x.types.includes('github-token')))
  assert.ok(report.suspiciousFiles.some(x => x.path === 'published/sample.zip!scene/.env.production'))
  assert.equal(report.stats.scannedArchives, 1)
  assert.equal(report.stats.scannedArchiveEntries, 2)
  console.log('Study archive scanner: packed credentials, path warnings, redaction and ZIP expansion limits passed')
} finally {
  rmSync(root, { recursive: true, force: true })
}
