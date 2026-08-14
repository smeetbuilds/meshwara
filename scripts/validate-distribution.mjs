import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { resolve } from 'node:path'
import { normalizeManifest } from './distribution/core.mjs'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [packageText, cli, core, packContract, standardizer, packParity, packEnricher, codecSync, zipUtils, builder, component, route, css, docs, schemaText, packSchemaText] = await Promise.all([
  read('package.json'),
  read('scripts/meshvara.mjs'),
  read('scripts/distribution/core.mjs'),
  read('scripts/distribution/pack-contract.mjs'),
  read('scripts/standardize-download-packs.mjs'),
  read('scripts/validate-pack-parity.mjs'),
  read('scripts/enrich-customizable-packs.mjs'),
  read('scripts/sync-codecs.mjs'),
  read('scripts/zip-utils.mjs'),
  read('scripts/build-registry.mjs'),
  read('src/components/AssetInstallPanel.tsx'),
  read('src/routes/assets/$slug.tsx'),
  read('src/styles/distribution.css'),
  read('DISTRIBUTION.md'),
  read('public/registry/schema-v1.json'),
  read('public/downloads/pack-schema-v1.json'),
])
const pkg = JSON.parse(packageText)
const schema = JSON.parse(schemaText)
const packSchema = JSON.parse(packSchemaText)

function assert(condition, message) {
  if (!condition) throw new Error(`Distribution contract failed: ${message}`)
}

assert(pkg.private === true, 'repository package must remain private until an npm publication decision is explicit')
assert(pkg.bin?.meshvara === './scripts/meshvara.mjs', 'package bin does not expose the dependency-free meshvara CLI')
for (const script of ['registry:build', 'distribution:check', 'pack:check', 'customization:check', 'codecs:sync', 'codecs:check']) assert(typeof pkg.scripts?.[script] === 'string', `package script ${script} is missing`)
assert(pkg.scripts['codecs:check'].includes('tests/studio/codec-sync.test.mjs') && pkg.scripts['codecs:check'].includes('scripts/validate-codecs.mjs'), 'codec release gate does not combine deterministic sync and emitted-runtime validation')
assert(pkg.scripts.build.startsWith('node scripts/sync-codecs.mjs && node scripts/build-registry.mjs &&'), 'production build does not sync same-origin codecs and generate the public registry first')
assert(pkg.scripts.packs.endsWith('node scripts/standardize-download-packs.mjs'), 'pack generation does not standardize archives to Pack-v1')
assert(pkg.scripts.packs.includes('scripts/enrich-customizable-packs.mjs'), 'pack generation does not enrich curated typed-customization archives')
assert(pkg.scripts.packs.indexOf('scripts/enrich-customizable-packs.mjs') < pkg.scripts.packs.indexOf('scripts/standardize-download-packs.mjs'), 'typed customization enrichment must run before Pack-v1 standardization')
assert(pkg.scripts.qa.includes('bun run codecs:sync && bun run codecs:check && bun run customization:check'), 'QA does not gate same-origin codecs and typed customization')
assert(pkg.scripts.qa.includes('bun run packs && bun run pack:check && bun run registry:build && bun run distribution:check'), 'QA does not validate Pack-v1 parity immediately after pack regeneration')

for (const token of ['DEFAULT_REGISTRY', "command === 'list'", "command === 'info'", "command === 'verify'", "command === 'add'", "command === 'doctor'", "'dry-run'", "'force'", 'SHA-256 mismatch', 'Refusing to overwrite']) {
  assert(cli.includes(token), `CLI missing ${token}`)
}
for (const token of ['require-pack-v1', 'inspectPackContract', 'Pack-v1', 'legacy metadata contract']) assert(cli.includes(token), `CLI Pack-v1 migration support missing ${token}`)
for (const token of ['sha256Hex', 'readZipEntries', 'crc32', 'inflateRawSync', 'Unsafe ZIP traversal', 'MAX_ARCHIVE_BYTES', 'MAX_EXPANDED_BYTES', 'outputPath']) {
  assert(core.includes(token), `archive safety core missing ${token}`)
}
for (const token of ['MESHVARA_PACK_SCHEMA_VERSION', 'buildPackMetadata', 'inspectPackContract', 'files:', 'sha256Hex', 'required pack file', 'dependency metadata']) assert(packContract.includes(token), `Pack-v1 contract missing ${token}`)
for (const token of ['buildPackMetadata', 'inspectPackContract', 'createZip', 'packSchemaVersion', 'sha256Hex', 'MESHVARA_PACK_SCHEMA_VERSION']) assert(`${standardizer}
${packParity}`.includes(token), `Pack-v1 release pipeline missing ${token}`)
for (const token of ['enrichCustomizableArchive', 'CUSTOMIZATION.json', 'CustomizationLayer.tsx', 'CustomizableScene.tsx', 'meshvara.json']) assert(packEnricher.includes(token), `typed customization pack enrichment missing ${token}`)
for (const token of ['node_modules/three', 'public/codecs', 'draco_decoder.wasm', 'basis_transcoder.wasm', 'runtimeOrigin', 'sha256']) assert(codecSync.includes(token), `same-origin codec sync missing ${token}`)
for (const token of ['getUTCFullYear', 'getUTCHours', "new Date('2026-08-10T00:00:00Z')"]) assert(zipUtils.includes(token), `ZIP determinism missing ${token}`)

for (const forbidden of ['supabase', 'firebase', 'stripe', 'signIn', 'login required', 'api key required']) {
  assert(!`${cli}\n${core}`.toLowerCase().includes(forbidden.toLowerCase()), `CLI introduced forbidden gate/dependency ${forbidden}`)
}
assert(builder.includes("public/downloads/manifest.json") && builder.includes("public/registry/v1.json") && builder.includes('buildRegistry'), 'registry builder is not derived from the canonical archive manifest')
assert(schema.properties?.schemaVersion?.const === 1, 'public registry schema is not pinned to version 1')
assert(schema.properties?.packSchemaVersion?.type === 'integer', 'registry schema does not expose packSchemaVersion')
assert(packSchema.properties?.schemaVersion?.const === 1 && packSchema.properties?.files?.type === 'array', 'public Pack-v1 schema is invalid')
assert(schema.properties?.assets?.type === 'array', 'public registry schema does not define assets')

for (const token of ['npx github:smeetbuilds/meshwara#main add', 'SHA-256', '--dry-run', '--force', 'NO LOGIN', 'NO RUNTIME API']) {
  assert(component.includes(token), `asset install panel missing ${token}`)
}
assert(route.includes("import { AssetInstallPanel }") && route.includes('<AssetInstallPanel slug={asset.slug} name={asset.name} />'), 'asset detail route is not wired to the install panel')
assert(css.includes('@media(max-width:900px)') && css.includes('@media(max-width:560px)'), 'install panel lacks tablet/mobile responsive contracts')
for (const section of ['Canonical integrity source', 'Pack-v1 archive contract', 'Typed customization pack enrichment', 'CLI', 'Archive safety contract', 'Registry resolution', 'Asset-page handoff', 'QA', 'Current boundary']) {
  assert(docs.includes(`## ${section}`), `distribution documentation missing ${section}`)
}
assert(docs.includes('Studio input decoding now has an offline/same-origin runtime contract for Draco, Meshopt and KTX2/BasisU'), 'distribution docs do not describe the same-origin codec input runtime')
assert(docs.includes('not a claim that Meshvara\'s GLB exporter or pack pipeline currently re-encodes'), 'distribution docs blur input decoding with codec re-encoding')
assert(docs.includes('cannot run the repository\'s complete Bun pack build'), 'distribution docs do not state the actual archive-regeneration verification boundary')
assert(docs.includes('13 curated public ZIPs'), 'distribution docs do not state the curated binary-regeneration boundary')

const manifestPath = resolve(root, process.env.MESHVARA_MANIFEST ?? 'public/downloads/manifest.json')
try {
  await access(manifestPath, constants.R_OK)
  const manifest = normalizeManifest(JSON.parse(await readFile(manifestPath, 'utf8')))
  if (!process.env.MESHVARA_MANIFEST) assert(manifest.count === 500, `canonical public manifest must contain 500 assets, found ${manifest.count}`)
} catch (error) {
  if (!process.env.MESHVARA_MANIFEST) throw error
}

console.log('Meshvara Pack-v1 distribution structural contract passed')
