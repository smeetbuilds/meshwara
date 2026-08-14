import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { resolve } from 'node:path'
import { normalizeManifest } from './distribution/core.mjs'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [packageText, cli, core, builder, component, route, css, docs, schemaText] = await Promise.all([
  read('package.json'),
  read('scripts/meshvara.mjs'),
  read('scripts/distribution/core.mjs'),
  read('scripts/build-registry.mjs'),
  read('src/components/AssetInstallPanel.tsx'),
  read('src/routes/assets/$slug.tsx'),
  read('src/styles/distribution.css'),
  read('DISTRIBUTION.md'),
  read('public/registry/schema-v1.json'),
])
const pkg = JSON.parse(packageText)
const schema = JSON.parse(schemaText)

function assert(condition, message) {
  if (!condition) throw new Error(`Distribution contract failed: ${message}`)
}

assert(pkg.private === true, 'repository package must remain private until an npm publication decision is explicit')
assert(pkg.bin?.meshvara === './scripts/meshvara.mjs', 'package bin does not expose the dependency-free meshvara CLI')
for (const script of ['registry:build', 'distribution:check']) assert(typeof pkg.scripts?.[script] === 'string', `package script ${script} is missing`)
assert(pkg.scripts.build.startsWith('node scripts/build-registry.mjs &&'), 'production build does not generate the public registry first')
assert(pkg.scripts.qa.includes('bun run packs && bun run registry:build && bun run distribution:check'), 'QA does not validate distribution immediately after pack regeneration')

for (const token of ['DEFAULT_REGISTRY', "command === 'list'", "command === 'info'", "command === 'verify'", "command === 'add'", "command === 'doctor'", "'dry-run'", "'force'", 'SHA-256 mismatch', 'Refusing to overwrite']) {
  assert(cli.includes(token), `CLI missing ${token}`)
}
for (const token of ['sha256Hex', 'readZipEntries', 'crc32', 'inflateRawSync', 'Unsafe ZIP traversal', 'MAX_ARCHIVE_BYTES', 'MAX_EXPANDED_BYTES', 'outputPath']) {
  assert(core.includes(token), `archive safety core missing ${token}`)
}
for (const forbidden of ['supabase', 'firebase', 'stripe', 'signIn', 'login required', 'api key required']) {
  assert(!`${cli}\n${core}`.toLowerCase().includes(forbidden.toLowerCase()), `CLI introduced forbidden gate/dependency ${forbidden}`)
}
assert(builder.includes("public/downloads/manifest.json") && builder.includes("public/registry/v1.json") && builder.includes('buildRegistry'), 'registry builder is not derived from the canonical archive manifest')
assert(schema.properties?.schemaVersion?.const === 1, 'public registry schema is not pinned to version 1')
assert(schema.properties?.assets?.type === 'array', 'public registry schema does not define assets')

for (const token of ['npx github:smeetbuilds/meshwara#main add', 'SHA-256', '--dry-run', '--force', 'NO LOGIN', 'NO RUNTIME API']) {
  assert(component.includes(token), `asset install panel missing ${token}`)
}
assert(route.includes("import { AssetInstallPanel }") && route.includes('<AssetInstallPanel slug={asset.slug} name={asset.name} />'), 'asset detail route is not wired to the install panel')
assert(css.includes('@media(max-width:900px)') && css.includes('@media(max-width:560px)'), 'install panel lacks tablet/mobile responsive contracts')
for (const section of ['Canonical integrity source', 'CLI', 'Archive safety contract', 'Registry resolution', 'Asset-page handoff', 'QA', 'Current boundary']) {
  assert(docs.includes(`## ${section}`), `distribution documentation missing ${section}`)
}
assert(docs.includes('does not claim Draco, Meshopt, or KTX2'), 'distribution docs blur real delivery with unavailable codecs')

const manifestPath = resolve(root, process.env.MESHVARA_MANIFEST ?? 'public/downloads/manifest.json')
try {
  await access(manifestPath, constants.R_OK)
  const manifest = normalizeManifest(JSON.parse(await readFile(manifestPath, 'utf8')))
  if (!process.env.MESHVARA_MANIFEST) assert(manifest.count === 500, `canonical public manifest must contain 500 assets, found ${manifest.count}`)
} catch (error) {
  if (!process.env.MESHVARA_MANIFEST) throw error
}

console.log('Meshvara distribution structural contract passed')
