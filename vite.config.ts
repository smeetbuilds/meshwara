import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { shouldPrerenderMeshvaraPath } from './src/lib/prerenderRoutes'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        concurrency: 8,
        failOnError: true,
        filter: ({ path }) => shouldPrerenderMeshvaraPath(path),
      },
    }),
    viteReact(),
  ],
})
