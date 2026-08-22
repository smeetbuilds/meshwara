import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const PUBLIC_DIR = fileURLToPath(new URL('../public/', import.meta.url))
const MANIFEST = fileURLToPath(new URL('../public/downloads/manifest.json', import.meta.url))
const ROBOTS = `${PUBLIC_DIR}robots.txt`
const SITEMAP = `${PUBLIC_DIR}sitemap.xml`

function siteUrlFromArgs() {
  const index = process.argv.indexOf('--site-url')
  if (index !== -1 && process.argv[index + 1]) return process.argv[index + 1]
  return process.env.MESHVARA_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || process.env.URL || null
}

function normalizeSiteUrl(value) {
  if (!value) return null
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`
  const url = new URL(candidate)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('MESHVARA_SITE_URL must use http or https.')
  url.search = ''
  url.hash = ''
  url.pathname = `${url.pathname.replace(/\/+$/, '')}/`
  return url
}

function absoluteUrl(base, path) {
  return new URL(path.replace(/^\/+/, ''), base).href
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

if (process.argv.includes('--clean')) {
  await Promise.all([rm(ROBOTS, { force: true }), rm(SITEMAP, { force: true })])
  process.exit(0)
}

const siteUrl = normalizeSiteUrl(siteUrlFromArgs())
const robots = siteUrl
  ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(siteUrl, 'sitemap.xml')}\n`
  : 'User-agent: *\nAllow: /\n'
await writeFile(ROBOTS, robots)

if (!siteUrl) {
  await rm(SITEMAP, { force: true })
  console.warn('MESHVARA_SITE_URL is not set; robots.txt was generated but sitemap.xml was skipped.')
  process.exit(0)
}

const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'))
if (!manifest || !Array.isArray(manifest.assets)) throw new Error('Download manifest is missing an assets array.')
const slugs = manifest.assets.map((asset) => asset?.slug)
if (slugs.some((slug) => typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) throw new Error('Download manifest contains an invalid asset slug.')
if (new Set(slugs).size !== slugs.length) throw new Error('Download manifest contains duplicate asset slugs.')

const routes = ['/', '/assets', '/studio', ...slugs.map((slug) => `/assets/${slug}`)]
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${escapeXml(absoluteUrl(siteUrl, route))}</loc></url>`),
  '</urlset>',
  '',
].join('\n')
await writeFile(SITEMAP, xml)
console.log(`Generated robots.txt + sitemap.xml for ${routes.length} routes at ${siteUrl.href}`)
