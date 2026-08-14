import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import { deflateRawSync } from 'node:zlib'
import {
  buildRegistry,
  crc32,
  normalizeManifest,
  readZipEntries,
  resolveArchiveLocation,
  sha256Hex,
  stripSingleRoot,
} from '../../scripts/distribution/core.mjs'

const exec = promisify(execFile)
const ROOT = resolve(new URL('../..', import.meta.url).pathname)
const CLI = resolve(ROOT, 'scripts/meshvara.mjs')

function le16(value) { const b = Buffer.alloc(2); b.writeUInt16LE(value); return b }
function le32(value) { const b = Buffer.alloc(4); b.writeUInt32LE(value >>> 0); return b }
function storedZip(files) {
  const locals = []
  const centrals = []
  let offset = 0
  for (const [name, content] of files) {
    const nameBytes = Buffer.from(name)
    const input = Buffer.from(content)
    const compressed = deflateRawSync(input)
    const crc = crc32(input)
    const local = Buffer.concat([
      le32(0x04034b50), le16(20), le16(0), le16(8), le16(0), le16(0), le32(crc), le32(compressed.length), le32(input.length), le16(nameBytes.length), le16(0), nameBytes, compressed,
    ])
    const central = Buffer.concat([
      le32(0x02014b50), le16(20), le16(20), le16(0), le16(8), le16(0), le16(0), le32(crc), le32(compressed.length), le32(input.length), le16(nameBytes.length), le16(0), le16(0), le16(0), le16(0), le32(0), le32(offset), nameBytes,
    ])
    locals.push(local); centrals.push(central); offset += local.length
  }
  const central = Buffer.concat(centrals)
  const eocd = Buffer.concat([le32(0x06054b50), le16(0), le16(0), le16(files.length), le16(files.length), le32(central.length), le32(offset), le16(0)])
  return Buffer.concat([...locals, central, eocd])
}

const manifest = normalizeManifest({
  brand: 'MESHVARA', count: 1, assets: [{
    slug: 'mercury-fold', name: 'Mercury Fold', category: 'Sculptures', subcategory: null,
    file: '/downloads/mercury-fold.zip', bytes: 10, sha256: 'a'.repeat(64),
  }],
})
assert.equal(manifest.count, 1)
assert.equal(buildRegistry({ ...manifest }, { dependencies: { three: '0.185.1', react: '19.2.8' } }).schemaVersion, 1)
assert.equal(
  resolveArchiveLocation('https://raw.githubusercontent.com/smeetbuilds/meshwara/main/public/downloads/manifest.json', '/downloads/mercury-fold.zip'),
  'https://raw.githubusercontent.com/smeetbuilds/meshwara/main/public/downloads/mercury-fold.zip',
)

const archive = storedZip([
  ['mercury-fold/README.md', '# Mercury Fold\n'],
  ['mercury-fold/package.json', JSON.stringify({ dependencies: { three: '0.185.1', react: '19.2.8' } })],
  ['mercury-fold/src/index.ts', 'export const mercuryFold = true\n'],
])
const parsed = stripSingleRoot(readZipEntries(archive), 'mercury-fold')
assert.deepEqual(parsed.map((entry) => entry.relative), ['README.md', 'package.json', 'src/index.ts'])
assert.equal(parsed[0].bytes.toString(), '# Mercury Fold\n')

const unsafe = storedZip([['../escape.txt', 'nope']])
assert.throws(() => readZipEntries(unsafe), /Unsafe ZIP traversal/)

const temp = await mkdtemp(join(tmpdir(), 'meshvara-cli-'))
const archivePath = join(temp, 'mercury-fold.zip')
await writeFile(archivePath, archive)
const registryPath = join(temp, 'manifest.json')
await writeFile(registryPath, JSON.stringify({
  brand: 'MESHVARA', count: 1, assets: [{
    slug: 'mercury-fold', name: 'Mercury Fold', category: 'Sculptures', subcategory: null,
    file: '/downloads/mercury-fold.zip', bytes: archive.length, sha256: sha256Hex(archive),
  }],
}))
const destination = join(temp, 'components')
await mkdir(destination)

const dry = await exec(process.execPath, [CLI, 'add', 'mercury-fold', '--registry', registryPath, '--archive', archivePath, '--dir', destination, '--dry-run'])
assert.match(dry.stdout, /Dry run Mercury Fold/)
await assert.rejects(readFile(join(destination, 'mercury-fold', 'README.md')), /ENOENT/)

const install = await exec(process.execPath, [CLI, 'add', 'mercury-fold', '--registry', registryPath, '--archive', archivePath, '--dir', destination])
assert.match(install.stdout, /Installed 3 files/)
assert.equal(await readFile(join(destination, 'mercury-fold', 'src/index.ts'), 'utf8'), 'export const mercuryFold = true\n')

await assert.rejects(
  exec(process.execPath, [CLI, 'add', 'mercury-fold', '--registry', registryPath, '--archive', archivePath, '--dir', destination]),
  (error) => /Refusing to overwrite/.test(error.stderr),
)
const verify = await exec(process.execPath, [CLI, 'verify', 'mercury-fold', '--registry', registryPath, '--archive', archivePath])
assert.match(verify.stdout, /Verified Mercury Fold/)

const tamperedPath = join(temp, 'tampered.zip')
const tampered = Buffer.from(archive)
tampered[10] ^= 0xff
await writeFile(tamperedPath, tampered)
await assert.rejects(
  exec(process.execPath, [CLI, 'verify', 'mercury-fold', '--registry', registryPath, '--archive', tamperedPath]),
  (error) => /SHA-256 mismatch/.test(error.stderr),
)

console.log('Meshvara distribution CLI integrity contract passed')
