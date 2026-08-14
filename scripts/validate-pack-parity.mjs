import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { basename, resolve } from 'node:path'
import { normalizeManifest, readZipEntries, sha256Hex, stripSingleRoot } from './distribution/core.mjs'
import { inspectPackContract, MESHVARA_PACK_SCHEMA_VERSION } from './distribution/pack-contract.mjs'

const root = process.cwd()
const manifestPath = resolve(root, process.env.MESHVARA_MANIFEST ?? 'public/downloads/manifest.json')
const downloadDir = resolve(root, process.env.MESHVARA_DOWNLOAD_DIR ?? 'public/downloads')
const raw = JSON.parse(await readFile(manifestPath, 'utf8'))
const manifest = normalizeManifest(raw)
if (raw.packSchemaVersion !== MESHVARA_PACK_SCHEMA_VERSION) throw new Error(`Public manifest must declare packSchemaVersion ${MESHVARA_PACK_SCHEMA_VERSION}.`)
if (!process.env.MESHVARA_MANIFEST && manifest.count !== 500) throw new Error(`Canonical archive parity requires 500 assets, found ${manifest.count}.`)

let totalBytes = 0
for (const asset of manifest.assets) {
  const path = resolve(downloadDir, basename(asset.file))
  await access(path, constants.R_OK)
  const bytes = await readFile(path)
  if (bytes.byteLength !== asset.bytes) throw new Error(`${asset.slug}: manifest byte size does not match the public ZIP.`)
  if (sha256Hex(bytes) !== asset.sha256) throw new Error(`${asset.slug}: manifest SHA-256 does not match the public ZIP.`)
  const entries = stripSingleRoot(readZipEntries(bytes), asset.slug)
  inspectPackContract(asset, entries, { requireV1: true })
  totalBytes += bytes.byteLength
}

console.log(`MESHVARA Pack-v${MESHVARA_PACK_SCHEMA_VERSION} parity passed: ${manifest.count} archives · ${totalBytes.toLocaleString()} bytes`)
