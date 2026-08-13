import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
const failures = []
const exactSemver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/

for (const section of ['dependencies', 'devDependencies']) {
  for (const [name, version] of Object.entries(pkg[section] ?? {})) {
    if (!exactSemver.test(String(version))) failures.push(`${section}.${name} must be an exact semver pin, received ${version}`)
  }
}
if (!/^bun@\d+\.\d+\.\d+$/.test(pkg.packageManager ?? '')) failures.push('packageManager must pin an exact Bun version')

const packBuilder = await readFile(resolve(root, 'scripts/build-download-packs.mjs'), 'utf8')
for (const name of ['@react-three/drei', '@react-three/fiber', 'react', 'three']) {
  const version = pkg.dependencies?.[name]
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const key = name.startsWith('@') ? `['\"]${escaped}['\"]` : `(?:['\"]${escaped}['\"]|${escaped})`
  const pattern = new RegExp(`${key}\\s*:\\s*['\"]${String(version).replaceAll('.', '\\.') }['\"]`)
  if (!pattern.test(packBuilder)) failures.push(`download-pack runtime pin for ${name} is out of sync with package.json (${version})`)
}

if (failures.length) {
  console.error(`Version pin validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}
console.log(`Version pin validation passed: ${Object.keys(pkg.dependencies ?? {}).length + Object.keys(pkg.devDependencies ?? {}).length} exact package pins + ${pkg.packageManager}.`)
