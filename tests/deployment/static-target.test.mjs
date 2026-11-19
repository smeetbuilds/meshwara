import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { shouldPrerenderMeshvaraPath } from '../../src/lib/prerenderRoutes.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const config = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'))
assert.equal(config.framework, 'vite')
assert.equal(config.outputDirectory, 'dist/client')
assert.ok(!('rewrites' in config), 'do not route binary downloads into HTML')
for (const path of ['/', '/assets', '/assets/mercury-fold', '/studio', '/about']) {
  assert.equal(shouldPrerenderMeshvaraPath(path), true, `should prerender page ${path}`)
}
for (const path of [
  '/downloads/mercury-fold.zip', '/downloads/manifest.json',
  '/registry/v1.json', '/assets/favicon.svg', '/sitemap.xml',
  '/studio?asset=mercury-fold', 'https://example.invalid/', '/assets/card#frag',
]) {
  assert.equal(shouldPrerenderMeshvaraPath(path), false, `should not prerender static/dynamic URL ${path}`)
}

const catalog = JSON.parse(readFileSync(resolve(root, 'public/downloads/manifest.json'), 'utf8'))
const slugs = catalog.assets.map((asset) => asset.slug)
assert.equal(catalog.count, 500)
assert.equal(slugs.length, 500)
assert.equal(new Set(slugs).size, 500)
const vite = readFileSync(resolve(root, 'vite.config.ts'), 'utf8')
assert.match(vite, /pages: assetSlugs\.map/)
assert.match(vite, /crawlLinks: false/)
assert.match(vite, /public\/downloads\/manifest\.json/)

console.log('Vercel static target, full asset route inventory, and prerender resource protection: passed')
