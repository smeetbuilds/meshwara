import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [routeTree, studioRoute, shell, viewport, storage, project, inspector, library, exportModule, header, assetsIndex, assetDetail, contract] = await Promise.all([
  read('src/routeTree.gen.ts'),
  read('src/routes/studio.tsx'),
  read('src/components/studio/StudioShell.tsx'),
  read('src/components/studio/StudioViewport.tsx'),
  read('src/lib/studioStorage.ts'),
  read('src/lib/studioProject.ts'),
  read('src/components/studio/StudioInspector.tsx'),
  read('src/components/studio/StudioLibrary.tsx'),
  read('src/lib/studioExport.ts'),
  read('src/components/SiteHeader.tsx'),
  read('src/routes/assets/index.tsx'),
  read('src/routes/assets/$slug.tsx'),
  read('STUDIO_ARCHITECTURE.md'),
])

function assert(condition, message) {
  if (!condition) throw new Error(`Studio contract failed: ${message}`)
}

for (const stale of ["./routes/playground/$slug", "./routes/library/index", "./routes/about"]) {
  assert(!routeTree.includes(stale), `route tree still imports missing route ${stale}`)
}
for (const token of ["./routes/assets/index", "./routes/assets/$slug", "./routes/studio", "'/assets/'", "'/studio'"]) {
  assert(routeTree.includes(token), `route tree missing ${token}`)
}
assert(studioRoute.includes("createFileRoute('/studio')"), 'Studio route is missing')
assert(studioRoute.includes('validateSearch'), 'Studio asset deep-link search is not validated')
assert(header.includes('to="/studio"'), 'desktop/mobile navigation does not expose Studio')
assert(assetsIndex.includes('<LibraryGrid'), '/assets index does not render the existing archive grid')
assert(assetDetail.includes('search={{ asset: asset.slug }}'), 'asset detail does not hand off directly into Studio')

for (const token of ['createStudioHistory', 'undoStudioHistory', 'redoStudioHistory', 'storeStudioFile', 'createPortableStudioProject', 'restorePortableStudioProject', 'generateStudioConfigModule', '<StudioViewport', '<StudioOutliner', '<StudioLibrary', '<StudioInspector']) {
  assert(shell.includes(token), `Studio shell missing ${token}`)
}
for (const token of ['STUDIO_HISTORY_LIMIT = 50', "kind: 'archive'", "kind: 'imported'", 'parseStudioProject', 'nodes.slice(0, 250)', 'clamp(finiteNumber(scene.exposure']) {
  assert(project.includes(token), `project model missing ${token}`)
}
for (const token of ['indexedDB.open', "createObjectStore(PROJECT_STORE", "createObjectStore(FILE_STORE", 'memoryProjects', 'memoryFiles', 'bytesToBase64', 'base64ToBytes']) {
  assert(storage.includes(token), `local persistence missing ${token}`)
}
for (const forbidden of ['fetch(', 'supabase', 'firebase', 'localStorage.setItem']) {
  assert(!storage.toLowerCase().includes(forbidden.toLowerCase()), `storage introduced remote/cloud dependency ${forbidden}`)
}
for (const token of ['<Canvas', '<TransformControls', '<OrbitControls', '<Grid', 'GLTFLoader', 'loadStudioFile', 'sceneRegistry', 'state.gl.info.render.triangles', 'toneMappingExposure']) {
  assert(viewport.includes(token), `viewport missing ${token}`)
}
assert(!viewport.includes('<Environment'), 'viewport must not silently depend on remote HDR environment assets')
assert(!viewport.includes('setDecoderPath'), 'Studio foundation must not use a remote Draco decoder path')
assert(inspector.includes('Wireframe') && inspector.includes('POSITION') && inspector.includes('ROTATION') && inspector.includes('SCALE'), 'production inspector primitives are incomplete')
assert(library.includes('IMPORT LOCAL GLB') && library.includes('PROJECTS') && library.includes('assets.filter'), 'asset/project library is incomplete')
assert(exportModule.includes('satisfies MeshvaraStudioConfig'), 'typed scene handoff is missing')

for (const section of ['Local-first boundary', 'Project format', 'Scene editor foundation', 'Developer handoff', 'Known boundary', 'QA invariant']) {
  assert(contract.includes(`## ${section}`), `architecture contract missing ${section}`)
}

console.log('Meshvara Studio structural contract passed')
