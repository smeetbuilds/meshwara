import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { verifyAssetPages } from '../../scripts/verify-asset-pages.mjs'

const fixture = mkdtempSync(join(tmpdir(), 'meshwara-asset-pages-'))
const root = join(fixture, 'dist/client')
const first = { slug: 'mercury-fold', name: 'Mercury Fold', file: '/downloads/mercury-fold.zip' }
const second = { slug: 'robotics-assembly-cell', name: 'Robotics Assembly Cell', file: '/downloads/robotics-assembly-cell.zip' }
const manifest = { brand: 'MESHVARA', count: 2, assets: [first, second] }
function page(asset, title = asset.name) {
  mkdirSync(join(root, 'assets', asset.slug), { recursive: true })
  writeFileSync(join(root, 'assets', asset.slug, 'index.html'), `<!doctype html><html><head><title>${title} — MESHVARA</title></head><body>${title}</body></html>`)
}
try {
  mkdirSync(join(root, 'downloads'), { recursive: true })
  writeFileSync(join(root, 'downloads', 'manifest.json'), JSON.stringify(manifest))
  page(first)
  assert.throws(() => verifyAssetPages(fixture, 2), /Missing prerendered asset detail page: robotics-assembly-cell/)
  page(second)
  assert.equal(verifyAssetPages(fixture, 2).verified, 2)
  page(second, 'Mercury Fold')
  assert.throws(() => verifyAssetPages(fixture, 2), /Wrong or missing asset detail title: robotics-assembly-cell/)
  page(second)
  manifest.assets.push(first)
  manifest.count = 3
  writeFileSync(join(root, 'downloads', 'manifest.json'), JSON.stringify(manifest))
  assert.throws(() => verifyAssetPages(fixture, 3), /Invalid or duplicate asset detail slug/)
  assert.throws(() => verifyAssetPages(fixture, 500), /Expected 500 deployed asset entries/)
  console.log('Asset detail static-page contract passed: missing, valid, wrong-title, duplicate, and count cases')
} finally {
  rmSync(fixture, { recursive: true, force: true })
}
