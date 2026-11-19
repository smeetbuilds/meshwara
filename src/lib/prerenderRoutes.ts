/**
 * Keep static assets and query-driven Studio states out of the HTML prerender
 * crawler. Vite still copies /public/downloads and other public files verbatim.
 */
export function shouldPrerenderMeshvaraPath(path: string): boolean {
  if (!path.startsWith('/') || path.includes('?') || path.includes('#')) return false
  if (path.startsWith('/downloads/') || path.startsWith('/registry/')) return false
  return !/\.(?:zip|glb|gltf|json|xml|txt|png|jpe?g|webp|svg|ico|wasm)$/i.test(path)
}
