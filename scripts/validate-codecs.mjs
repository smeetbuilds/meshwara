import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const ROOT = process.cwd()
const manifestPath = resolve(ROOT, 'public/codecs/manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
const packageJson = JSON.parse(await readFile(resolve(ROOT, 'package.json'), 'utf8'))
const runtime = await readFile(resolve(ROOT, 'src/lib/studioCodecRuntime.ts'), 'utf8')
const notices = await readFile(resolve(ROOT, 'public/codecs/THIRD_PARTY_LICENSES.md'), 'utf8')
const apache = await readFile(resolve(ROOT, 'public/codecs/APACHE-2.0.txt'), 'utf8')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(manifest.schemaVersion === 1, 'codec manifest schemaVersion must be 1')
assert(manifest.sourcePackage === 'three', 'codec manifest source package must be three')
assert(manifest.threeVersion === packageJson.dependencies?.three, 'codec manifest version must match the exact three dependency pin')
assert(manifest.runtimeOrigin === 'same-origin', 'codec runtime must be marked same-origin')
assert(manifest.sourcePackageLicense === 'MIT', 'three source package license metadata must remain MIT')
assert(manifest.runtimeLicense === 'Apache-2.0', 'Draco/Basis runtime license metadata must remain Apache-2.0')
assert(Array.isArray(manifest.files) && manifest.files.length === 5, 'codec manifest must contain exactly five Draco/Basis runtime files')

const expected = new Set([
  '/codecs/draco/draco_decoder.js',
  '/codecs/draco/draco_decoder.wasm',
  '/codecs/draco/draco_wasm_wrapper.js',
  '/codecs/basis/basis_transcoder.js',
  '/codecs/basis/basis_transcoder.wasm',
])

for (const file of manifest.files) {
  assert(expected.delete(file.path), `unexpected or duplicate codec path: ${file.path}`)
  const bytes = await readFile(resolve(ROOT, `public${file.path}`))
  const digest = createHash('sha256').update(bytes).digest('hex')
  assert(bytes.byteLength === file.bytes, `${file.path}: byte size differs from codec manifest`)
  assert(digest === file.sha256, `${file.path}: SHA-256 differs from codec manifest`)
  assert(typeof file.source === 'string' && file.source.startsWith('three/examples/jsm/libs/'), `${file.path}: invalid pinned source path`)
}
assert(expected.size === 0, `codec manifest missing ${[...expected].join(', ')}`)

for (const token of ["'/codecs/draco/'", "'/codecs/basis/'", 'setDRACOLoader', 'setMeshoptDecoder', 'setKTX2Loader', 'detectSupport']) {
  assert(runtime.includes(token), `Studio codec runtime missing ${token}`)
}
assert(!/https?:\/\//.test(runtime), 'Studio codec runtime must not contain remote decoder URLs')
assert(notices.includes('Google Draco') && notices.includes('Basis Universal') && notices.includes('Apache License 2.0'), 'third-party codec notice is incomplete')
assert(apache.includes('Apache License') && apache.includes('Version 2.0, January 2004'), 'Apache-2.0 license text is missing or invalid')

console.log(`Offline codec contract passed for three@${manifest.threeVersion} (${manifest.files.length} same-origin assets).`)
