import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, mkdirSync, rmSync, unlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const scanner = new URL('../../scripts/audit-study-history.mjs', import.meta.url).pathname
const root = mkdtempSync(join(tmpdir(), 'meshwara-study-test-'))
const exec = (args, cwd = root) => {
  const r = spawnSync(args[0], args.slice(1), { cwd, encoding: 'utf8' })
  assert.equal(r.status, 0, `${args.join(' ')} failed`)
}
try {
  exec(['git', 'init', '-q', '--initial-branch=main'])
  exec(['git', 'config', 'user.name', 'Synthetic Test'])
  exec(['git', 'config', 'user.email', 'test@example.invalid'])
  writeFileSync(join(root, 'README.md'), 'Synthetic clean project\n')
  exec(['git', 'add', '.'])
  exec(['git', 'commit', '-qm', 'initial'])
  const clean = spawnSync('node', [scanner, '--json', '--repo', root], { encoding: 'utf8' })
  assert.equal(clean.status, 0)
  assert.equal(JSON.parse(clean.stdout).status, 'no-pattern-match')

  const fakeToken = 'ghp_' + 'T'.repeat(36)
  writeFileSync(join(root, 'old-config.txt'), `fixture=${fakeToken}\n`)
  mkdirSync(join(root, 'samples'))
  writeFileSync(join(root, 'samples', '.env.example'), 'KEY=fakeexample\n')
  exec(['git', 'add', '.'])
  exec(['git', 'commit', '-qm', 'temporary fixture'])
  unlinkSync(join(root, 'old-config.txt'))
  exec(['git', 'add', '-u'])
  exec(['git', 'commit', '-qm', 'remove fixture'])
  writeFileSync(join(root, '.env.local'), 'EMPTY=true\n')
  exec(['git', 'add', '-f', '.env.local'])
  exec(['git', 'commit', '-qm', 'sensitive filename'])

  const flagged = spawnSync('node', [scanner, '--json', '--repo', root], { encoding: 'utf8' })
  assert.equal(flagged.status, 2)
  assert.equal(flagged.stdout.includes(fakeToken), false, 'must never reveal token contents')
  const parsed = JSON.parse(flagged.stdout)
  assert.ok(parsed.findings.some(x => x.path === 'old-config.txt' && x.types.includes('github-token')))
  assert.ok(parsed.suspiciousFiles.some(x => x.path === '.env.local'))
  assert.ok(!parsed.suspiciousFiles.some(x => x.path === 'samples/.env.example'))
  assert.equal(parsed.status, 'review-required')
  console.log('Study history scanner: clean, deleted-secret, redaction and sensitive-path cases passed')
} finally {
  rmSync(root, { recursive: true, force: true })
}
