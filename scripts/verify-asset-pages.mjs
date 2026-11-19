import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Validate the entire asset detail HTML corpus, not just the homepage. */
export function verifyAssetPages(root = process.cwd(), expectedCount = 500) {
  const output = resolve(root, 'dist/client')
  const manifestPath = join(output, 'downloads/manifest.json')
  if (!existsSync(manifestPath)) throw new Error('Missing deployed download manifest')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  if (manifest.count !== expectedCount || !Array.isArray(manifest.assets) || manifest.assets.length !== expectedCount) {
    throw new Error(`Expected ${expectedCount} deployed asset entries`)
  }
  const seen = new Set()
  let verified = 0
  for (const { slug, name } of manifest.assets) {
    if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || seen.has(slug)) {
      throw new Error('Invalid or duplicate asset detail slug')
    }
    seen.add(slug)
    if (typeof name !== 'string' || !name.trim()) throw new Error(`Missing asset name: ${slug}`)
    const pagePath = join(output, 'assets', slug, 'index.html')
    if (!existsSync(pagePath)) throw new Error(`Missing prerendered asset detail page: ${slug}`)
    const html = readFileSync(pagePath, 'utf8')
    if (!/<html\b/i.test(html) || !/<body\b/i.test(html)) {
      throw new Error(`Invalid asset detail HTML: ${slug}`)
    }
    const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;')
    if (!html.includes(`<title>${escapeHtml(name)} — MESHVARA</title>`)) {
      throw new Error(`Wrong or missing asset detail title: ${slug}`)
    }
    verified++
  }
  return { verified }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { verified } = verifyAssetPages()
    console.log(`Static asset detail verification passed: ${verified} complete rendered pages`)
  } catch (error) {
    console.error(`Static asset detail verification failed: ${error.message}`)
    process.exitCode = 1
  }
}
