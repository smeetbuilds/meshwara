import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [
  routeTree, studioRoute, shell, viewport, storage, project, transforms, inspector, outliner, library,
  exportModule, modelTools, modelExport, textureResources, componentPack, browserZip,
  header, assetsIndex, assetDetail, contract, packageJson,
] = await Promise.all([
  read('src/routeTree.gen.ts'),
  read('src/routes/studio.tsx'),
  read('src/components/studio/StudioShell.tsx'),
  read('src/components/studio/StudioViewport.tsx'),
  read('src/lib/studioStorage.ts'),
  read('src/lib/studioProject.ts'),
  read('src/lib/studioTransforms.ts'),
  read('src/components/studio/StudioInspector.tsx'),
  read('src/components/studio/StudioOutliner.tsx'),
  read('src/components/studio/StudioLibrary.tsx'),
  read('src/lib/studioExport.ts'),
  read('src/lib/studioModelTools.ts'),
  read('src/lib/studioModelExport.ts'),
  read('src/lib/studioTextureResources.ts'),
  read('src/lib/studioComponentPack.ts'),
  read('src/lib/browserZip.ts'),
  read('src/components/SiteHeader.tsx'),
  read('src/routes/assets/index.tsx'),
  read('src/routes/assets/$slug.tsx'),
  read('STUDIO_ARCHITECTURE.md'),
  read('package.json'),
])

function assert(condition, message) {
  if (!condition) throw new Error(`Studio contract failed: ${message}`)
}

for (const stale of ["./routes/playground/$slug", "./routes/library/index", "./routes/about"]) assert(!routeTree.includes(stale), `route tree still imports missing route ${stale}`)
for (const token of ["./routes/assets/index", "./routes/assets/$slug", "./routes/studio", "'/assets/'", "'/studio'"]) assert(routeTree.includes(token), `route tree missing ${token}`)
assert(studioRoute.includes("createFileRoute('/studio')"), 'Studio route is missing')
assert(studioRoute.includes('validateSearch'), 'Studio asset deep-link search is not validated')
assert(header.includes('to="/studio"'), 'desktop/mobile navigation does not expose Studio')
assert(assetsIndex.includes('<LibraryGrid'), '/assets index does not render the existing archive grid')
assert(assetDetail.includes('search={{ asset: asset.slug }}'), 'asset detail does not hand off directly into Studio')

for (const token of [
  'createStudioHistory', 'undoStudioHistory', 'redoStudioHistory', 'duplicateStudioNodes', 'removeStudioNodes',
  'setStudioParentPreserveWorld', 'updateStudioGroupTransform', 'storeStudioTexture', 'garbageCollectStudioFiles', 'collectStudioFileIds',
  'exportStudioGlb', 'createStudioComponentPack', 'generateStudioR3FScaffold', '<StudioViewport', '<StudioOutliner', '<StudioLibrary', '<StudioInspector',
]) assert(shell.includes(token), `Studio shell missing ${token}`)

for (const token of [
  'STUDIO_HISTORY_LIMIT = 50', 'STUDIO_NODE_LIMIT = 250', 'StudioTextureChannel', 'textures?: Partial<Record<StudioTextureChannel',
  'setStudioParentPreserveWorld', 'updateStudioGroupTransform', 'studioSelectedRootIds', 'sanitizeMaterialOverrides', 'collectStudioFileIds',
]) assert(project.includes(token), `project model missing ${token}`)
for (const token of ['composeStudioMatrix', 'invertStudioMatrix', 'decomposeStudioMatrix', 'studioWorldMatrix', 'localTransformForWorld', 'matricesApproximatelyEqual']) assert(transforms.includes(token), `transform math missing ${token}`)

for (const token of [
  'indexedDB.open', "createObjectStore(PROJECT_STORE", "createObjectStore(FILE_STORE", 'memoryProjects', 'memoryFiles',
  'validateStudioGlbBytes', 'validateStudioTextureBytes', 'MAX_STUDIO_TEXTURE_BYTES', "kind: StudioFileKind", 'storeStudioTexture',
  'garbageCollectStudioFiles(protectedFileIds', 'referenced.has(file.id)', 'textureReferences', 'bytesToBase64', 'base64ToBytes',
]) assert(storage.includes(token), `local persistence missing ${token}`)
for (const forbidden of ['fetch(', 'supabase', 'firebase', 'localStorage.setItem']) assert(!storage.toLowerCase().includes(forbidden.toLowerCase()), `storage introduced remote/cloud dependency ${forbidden}`)

for (const token of [
  '<Canvas', '<TransformControls', '<OrbitControls', '<Grid', 'GLTFLoader', 'cloneSkeleton', 'useAnimations', 'prepareStudioModel',
  'loadStudioTextureResources', 'textureSignature', 'sceneRegistry', 'children.get(node.id)', 'node.debug.bounds', 'node.debug.skeleton',
  'state.gl.info.render.triangles', 'toneMappingExposure',
]) assert(viewport.includes(token), `viewport missing ${token}`)
assert(!viewport.includes('<Environment'), 'Studio viewport must not silently depend on remote HDR environment assets')
assert(!viewport.includes('setDecoderPath'), 'Studio must not use a remote Draco decoder path')

for (const token of [
  'PBR + TEXTURES', 'TEXTURE CHANNELS', 'MODEL REPORT', 'ANIMATION', 'DEBUG VIEW', 'preserves world transform',
  'EXPORT WEB GLB', 'R3F COMPONENT ZIP', 'RESET TO AUTHORED', 'studioGlbExportProfiles', 'selectedIds.length > 1',
]) assert(inspector.includes(token), `model inspector missing ${token}`)
assert(outliner.includes('Shift / Ctrl / ⌘ click') && outliner.includes('node.parentId'), 'hierarchical multi-select outliner is incomplete')
assert(library.includes('IMPORT LOCAL GLB') && library.includes('PROJECTS') && library.includes('assets.filter'), 'asset/project library is incomplete')

for (const token of ['inspectStudioModel', 'prepareStudioModel', 'StudioMaterialSlot', 'SkinnedMesh', 'missingNormals', 'studioEditableTextureChannels', 'studioTextureResourceKey']) assert(modelTools.includes(token), `model tooling missing ${token}`)
for (const token of ['loadStudioFile', 'TextureLoader', 'flipY = false', 'studioTextureColorSpace', 'missing']) assert(textureResources.includes(token), `texture runtime missing ${token}`)
for (const token of ['GLTFExporter', 'GLTFLoader', 'loadStudioTextureResources', 'maxTextureSize', "source: { label: 'PRESERVE'", '2048', '1024', 'binary: true', 'animations', 'onlyVisible: true', 'trs: true']) assert(modelExport.includes(token), `local GLB export missing ${token}`)
assert(!modelExport.includes('fetch('), 'local GLB export introduced a remote processing dependency')

for (const token of ['createBrowserZip', 'crc32', '0x04034b50', '0x02014b50', '0x06054b50', 'Duplicate ZIP path']) assert(browserZip.includes(token), `browser ZIP implementation missing ${token}`)
for (const token of ['createStudioComponentPack', '@react-three/drei', '10.7.7', '@react-three/fiber', '9.7.0', '0.185.1', 'meshvara-preset.json', 'QUALITY.md', 'src/models/', 'SkeletonUtils']) assert(componentPack.includes(token), `component pack missing ${token}`)
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'supabase', 'firebase']) assert(!componentPack.includes(forbidden), `component pack introduced remote dependency ${forbidden}`)

for (const token of ['satisfies MeshvaraStudioConfig', 'parentId', 'materials', 'textures?: Partial<Record', 'animation', 'generateStudioR3FScaffold', 'renderSource', 'children.get(object.id)']) assert(exportModule.includes(token), `developer handoff missing ${token}`)
for (const token of [
  'tests/studio/project-state.test.ts', 'tests/studio/glb-validation.test.ts', 'tests/studio/transform-preservation.test.ts',
  'tests/studio/texture-validation.test.ts', 'tests/studio/local-storage.test.ts', 'tests/studio/component-pack.test.ts', 'scripts/validate-studio.mjs',
]) assert(packageJson.includes(token), `studio:check missing ${token}`)

for (const section of [
  'Local-first boundary', 'Project, hierarchy and transform model', 'Production model editor', 'Local texture workflow',
  'Local GLB validation and storage safety', 'Web GLB export profiles', 'Downloadable component delivery', 'Developer handoff',
  'Regression coverage', 'Known boundary', 'QA invariant',
]) assert(contract.includes(`## ${section}`), `architecture contract missing ${section}`)

assert(contract.includes('does **not** yet mean every existing Meshvara archive ZIP'), 'archive-pack parity boundary is not explicit')
assert(contract.includes('Draco geometry compression') && contract.includes('Meshopt geometry compression') && contract.includes('KTX2/Basis texture transcoding'), 'codec boundary is not explicit')

console.log('Meshvara Studio texture + local delivery contract passed')
