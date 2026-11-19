import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Make a successful build prove that HTML and the public archives are deployable. */
export function verifyStaticOutput(root = process.cwd(), expectedAssets = 500) {
  const output = resolve(root, 'dist/client')
  const indexPath = join(output, 'index.html')
  if (!existsSync(indexPath)) throw new Error('Static output is missing dist/client/index.html')
  const html = readFileSync(indexPath, 'utf8')
  if (!/<html\b/i.test(html) || !/<body\b/i.test(html)) {
    throw new Error('Static output index.html is not a rendered HTML document')
  }
  const manifestPath = join(output, 'downloads/manifest.json')
  if (!existsSync(manifestPath)) throw new Error('Static output is missing the public download manifest')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (!Array.isArray(manifest.assets) || manifest.count !== expectedAssets || manifest.assets.length !== expectedAssets) {
    throw new Error(`Static manifest must contain ${expectedAssets} assets`)
  }
  const seen = new Set()
  let bytesChecked = 0
  for (const asset of manifest.assets) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(asset.slug) || seen.has(asset.slug)) {
      throw new Error('Static manifest contains an invalid or duplicate slug')
    }
    seen.add(asset.slug)
    if (asset.file !== `/downloads/${asset.slug}.zip` || !/^[a-f0-9]{64}$/.test(asset.sha256)) {
      throw new Error(`Static manifest metadata is invalid for ${asset.slug}`)
    }
    const filePath = join(output, 'downloads', `${asset.slug}.zip`)
    if (!existsSync(filePath)) throw new Error(`Static ZIP missing: ${asset.slug}`)
    const size = statSync(filePath).size
    if (size !== asset.bytes) throw new Error(`Static ZIP size mismatch: ${asset.slug}`)
    const data = readFileSync(filePath)
    if (data.length < 4 || data.readUInt32LE(0) !== 0x04034b50) {
      throw new Error(`Static ZIP is not a ZIP payload: ${asset.slug}`)
    }
    if (createHash('sha256').update(data).digest('hex') !== asset.sha256) {
      throw new Error(`Static ZIP hash mismatch: ${asset.slug}`)
    }
    bytesChecked += data.length
  }
  const physicalZips = readdirSync(join(output, 'downloads')).filter(file => file.endsWith('.zip'))
  if (physicalZips.length !== expectedAssets) throw new Error('Static ZIP count differs from manifest')
  return { output, assets: expectedAssets, bytesChecked }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const checked = verifyStaticOutput()
    console.log(`Static deployment verified: index.html and ${checked.assets} ZIP SHA-256 digests (${checked.bytesChecked} bytes)`)
  } catch (error) {
    console.error(`Static deployment verification failed: ${error.message}`)
    process.exitCode = 1
  }
}
