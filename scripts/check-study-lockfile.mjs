#!/usr/bin/env node
// Lightweight manifest/lockfile shape check. Bun's frozen install remains authoritative.
import { readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'

const args = process.argv.slice(2)
let root = '.'
let json = false
for (let index = 0; index < args.length; index++) {
  const value = args[index]
  if (value === '--json') { json = true; continue }
  if (value === '--root' && args[index + 1] && !args[index + 1].startsWith('--')) { root = args[++index]; continue }
  console.error('Usage: node scripts/check-study-lockfile.mjs [--json] [--root directory]')
  process.exit(1)
}
const errors = []
try {
  const pkg = JSON.parse(readFileSync(join(resolve(root), 'package.json'), 'utf8'))
  const lock = JSON.parse(readFileSync(join(resolve(root), 'bun.lock'), 'utf8').replace(/,\s*([}\]])/g, '$1'))
  const workspace = lock.workspaces?.['']
  if (!workspace) errors.push('bun.lock is missing the root workspace')
  else {
    if (workspace.name !== pkg.name) errors.push('root workspace name differs from package.json')
    for (const section of ['dependencies', 'devDependencies']) {
      for (const [name, version] of Object.entries(pkg[section] ?? {})) {
        if (workspace[section]?.[name] !== version) errors.push(`${section}.${name} differs between package.json and bun.lock`)
        if (lock.packages?.[name]?.[0] !== `${name}@${version}`) errors.push(`${name} is missing its exact direct package resolution in bun.lock`)
      }
      for (const name of Object.keys(workspace[section] ?? {})) {
        if (!(name in (pkg[section] ?? {}))) errors.push(`${section}.${name} is stale in bun.lock`)
      }
    }
  }
  const output = { status: errors.length ? 'mismatch' : 'structure-matches', dependencyCount: Object.keys(pkg.dependencies ?? {}).length + Object.keys(pkg.devDependencies ?? {}).length, errors, caveat: 'Static check only. bun install --frozen-lockfile is still mandatory.' }
  if (json) console.log(JSON.stringify(output, null, 2))
  else { console.log(`Lockfile structure: ${output.status}; ${output.dependencyCount} declared packages`); errors.forEach(x => console.error(`- ${x}`)); console.log(output.caveat) }
  if (errors.length) process.exitCode = 2
} catch {
  // Never echo local file contents on parse failures.
  console.error('Cannot read or parse package.json / bun.lock for static validation.')
  process.exitCode = 1
}
