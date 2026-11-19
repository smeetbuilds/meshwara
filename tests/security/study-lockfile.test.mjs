import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const script = new URL('../../scripts/check-study-lockfile.mjs', import.meta.url).pathname
const dir = mkdtempSync(join(tmpdir(), 'meshwara-lockfile-test-'))
const pkg = { name: 'synthetic-project', dependencies: { react: '19.2.8' }, devDependencies: { '@playwright/test': '1.62.1' } }
const lock = { lockfileVersion: 1, workspaces: { '': { name: pkg.name, dependencies: pkg.dependencies, devDependencies: pkg.devDependencies } }, packages: { react: ['react@19.2.8', '', {}], '@playwright/test': ['@playwright/test@1.62.1', '', {}] } }
function run() {
  const r = spawnSync('node', [script, '--json', '--root', dir], { encoding: 'utf8' })
  return { code: r.status, out: JSON.parse(r.stdout) }
}
try {
  writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg))
  writeFileSync(join(dir, 'bun.lock'), JSON.stringify(lock))
  assert.deepEqual([run().code, run().out.status], [0, 'structure-matches'])
  writeFileSync(join(dir, 'bun.lock'), JSON.stringify(lock).replace(/}$/, ',}'))
  assert.equal(run().code, 0, 'Bun JSONC trailing commas are supported')
  lock.workspaces[''].name = 'wrong-name'
  writeFileSync(join(dir, 'bun.lock'), JSON.stringify(lock))
  assert.equal(run().code, 2)
  assert.match(run().out.errors.join(' '), /workspace name/)
  lock.workspaces[''].name = pkg.name
  delete lock.packages['@playwright/test']
  writeFileSync(join(dir, 'bun.lock'), JSON.stringify(lock))
  assert.equal(run().code, 2)
  assert.match(run().out.errors.join(' '), /@playwright\/test.*missing/)
  console.log('Study lockfile checker: exact match, workspace mismatch and missing Playwright cases passed')
} finally {
  rmSync(dir, { recursive: true, force: true })
}
