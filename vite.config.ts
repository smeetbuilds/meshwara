import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { shouldPrerenderMeshvaraPath } from './src/lib/prerenderRoutes'
import manifest from './public/downloads/manifest.json'

// Parameterized asset routes are not automatically discovered by the static crawler.
// Publish all 500 detail pages from the same manifest used by ZIP verification.
const assetSlugs = manifest.assets.map((asset) => asset.slug)
if (manifest.count !== 500 || assetSlugs.length !== 500 || new Set(assetSlugs).size !== 500 || assetSlugs.some((slug) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
  throw new Error('Static build requires exactly 500 unique valid asset slugs')
}

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      pages: assetSlugs.map((slug) => ({ path: `/assets/${slug}`, prerender: { enabled: true } })),
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: false, // Explicit pages avoid incomplete discovery and crawling binary URLs.
        concurrency: 8,
        failOnError: true,
        filter: ({ path }) => shouldPrerenderMeshvaraPath(path),
      },
    }),
    viteReact(),
  ],
})
