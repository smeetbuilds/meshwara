import { createHash } from 'node:crypto'
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()
export const codecFiles = [
  { id: 'draco-js', source: 'examples/jsm/libs/draco/draco_decoder.js', output: 'draco/draco_decoder.js' },
  { id: 'draco-wasm', source: 'examples/jsm/libs/draco/draco_decoder.wasm', output: 'draco/draco_decoder.wasm' },
  { id: 'draco-wasm-wrapper', source: 'examples/jsm/libs/draco/draco_wasm_wrapper.js', output: 'draco/draco_wasm_wrapper.js' },
  { id: 'basis-js', source: 'examples/jsm/libs/basis/basis_transcoder.js', output: 'basis/basis_transcoder.js' },
  { id: 'basis-wasm', source: 'examples/jsm/libs/basis/basis_transcoder.wasm', output: 'basis/basis_transcoder.wasm' },
]

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

async function readPinnedThreeVersion(root = ROOT) {
  const appPackage = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
  const pinned = appPackage.dependencies?.three
  if (typeof pinned !== 'string' || !/^\d+\.\d+\.\d+$/.test(pinned)) throw new Error('package.json must pin three to an exact version before codec sync.')
  return pinned
}

export async function syncCodecs({ root = ROOT } = {}) {
  const threeRoot = resolve(root, 'node_modules/three')
  const outputRoot = resolve(root, 'public/codecs')
  const pinned = await readPinnedThreeVersion(root)
  const installedPackage = JSON.parse(await readFile(resolve(threeRoot, 'package.json'), 'utf8'))
  if (installedPackage.version !== pinned) {
    throw new Error(`Codec source version mismatch: package.json pins three@${pinned}, node_modules contains three@${installedPackage.version ?? 'unknown'}.`)
  }

  await rm(resolve(outputRoot, 'draco'), { recursive: true, force: true })
  await rm(resolve(outputRoot, 'basis'), { recursive: true, force: true })

  const files = []
  for (const item of codecFiles) {
    const sourcePath = resolve(threeRoot, item.source)
    const outputPath = resolve(outputRoot, item.output)
    const bytes = await readFile(sourcePath)
    await mkdir(dirname(outputPath), { recursive: true })
    await copyFile(sourcePath, outputPath)
    files.push({
      id: item.id,
      path: `/codecs/${item.output}`,
      source: `three/${item.source}`,
      bytes: bytes.byteLength,
      sha256: sha256(bytes),
    })
  }

  const manifest = {
    schemaVersion: 1,
    sourcePackage: 'three',
    threeVersion: pinned,
    sourcePackageLicense: 'MIT',
    runtimeLicense: 'Apache-2.0',
    runtimeOrigin: 'same-origin',
    files,
  }
  await mkdir(outputRoot, { recursive: true })
  await writeFile(resolve(outputRoot, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  return manifest
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const manifest = await syncCodecs()
  console.log(`Synced ${manifest.files.length} offline codec assets from three@${manifest.threeVersion}.`)
}
