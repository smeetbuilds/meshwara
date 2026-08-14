import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [
  routeTree, studioRoute, shell, viewport, storage, project, transforms, inspector, outliner, library,
  exportModule, modelTools, modelExport, textureResources, componentPack, browserZip, themeModule, themeCss, codecCapabilities, codecRuntime,
  header, assetsIndex, assetDetail, contract, packageJson, playwrightConfig, e2eStudio, e2eFixtures,
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
  read('src/lib/studioTheme.ts'),
  read('src/styles/studio-theme.css'),
  read('src/lib/studioGlbCapabilities.ts'),
  read('src/lib/studioCodecRuntime.ts'),
  read('src/components/SiteHeader.tsx'),
  read('src/routes/assets/index.tsx'),
  read('src/routes/assets/$slug.tsx'),
  read('STUDIO_ARCHITECTURE.md'),
  read('package.json'),
  read('playwright.config.ts'),
  read('tests/e2e/studio.spec.ts'),
  read('tests/e2e/fixtures/studio-fixtures.ts'),
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

for (const token of ['STUDIO_THEME_STORAGE_KEY', "'dark' | 'light' | 'system'", 'resolveStudioTheme', 'readStudioThemePreference', 'writeStudioThemePreference']) assert(themeModule.includes(token), `appearance module missing ${token}`)
for (const token of ['data-studio-theme="light"', '--studio-page-bg', '--studio-accent-soft', '.studio-theme-select', 'color-scheme:light', ':focus-visible']) assert(themeCss.includes(token), `light-theme stylesheet missing ${token}`)
for (const token of ['readStudioThemePreference', 'resolveStudioTheme', 'writeStudioThemePreference', 'data-studio-theme={resolvedTheme}', 'Studio appearance', '<option value="light">LIGHT</option>', '<option value="system">SYSTEM</option>', 'aria-live="polite"']) assert(shell.includes(token), `Studio shell appearance/accessibility missing ${token}`)

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

for (const token of ['studioOfflineRequiredGlbCodecs', 'offlineCodecsUsed', 'offlineCodecsRequired', 'KHR_draco_mesh_compression', 'EXT_meshopt_compression', 'KHR_texture_basisu', 'assertStudioGlbCapabilities']) assert(codecCapabilities.includes(token), `codec capability reporting missing ${token}`)
assert(storage.includes("import { assertStudioGlbCapabilities } from './studioGlbCapabilities'") && storage.includes('assertStudioGlbCapabilities(json)'), 'GLB storage validation does not inspect codec capability requirements')
for (const token of ['STUDIO_DRACO_DECODER_PATH', 'STUDIO_BASIS_TRANSCODER_PATH', 'setDecoderPath', 'setTranscoderPath', 'setDRACOLoader', 'setMeshoptDecoder', 'setKTX2Loader', 'detectSupport']) assert(codecRuntime.includes(token), `offline codec runtime missing ${token}`)
for (const forbidden of ['http://', 'https://']) assert(!codecRuntime.includes(forbidden), `offline codec runtime introduced remote URL ${forbidden}`)

for (const token of [
  'indexedDB.open', "createObjectStore(PROJECT_STORE", "createObjectStore(FILE_STORE", 'memoryProjects', 'memoryFiles',
  'validateStudioGlbBytes', 'validateStudioTextureBytes', 'MAX_STUDIO_TEXTURE_BYTES', "kind: StudioFileKind", 'storeStudioTexture',
  'garbageCollectStudioFiles(protectedFileIds', 'referenced.has(file.id)', 'textureReferences', 'bytesToBase64', 'base64ToBytes',
]) assert(storage.includes(token), `local persistence missing ${token}`)
for (const forbidden of ['fetch(', 'supabase', 'firebase', 'localStorage.setItem']) assert(!storage.toLowerCase().includes(forbidden.toLowerCase()), `storage introduced remote/cloud dependency ${forbidden}`)

for (const token of [
  '<Canvas', '<TransformControls', '<OrbitControls', '<Grid', 'GLTFLoader', 'cloneSkeleton', 'useAnimations', 'prepareStudioModel',
  'loadStudioTextureResources', 'textureSignature', 'sceneRegistry', 'children.get(node.id)', 'node.debug.bounds', 'node.debug.skeleton',
  'state.gl.info.render.triangles', 'toneMappingExposure', 'configureStudioGltfLoader',
]) assert(viewport.includes(token), `viewport missing ${token}`)
assert(!viewport.includes('<Environment'), 'Studio viewport must not silently depend on remote HDR environment assets')
assert(viewport.includes('configureStudioGltfLoader(loader, renderer)'), 'Studio viewport does not configure the same-origin codec runtime')

for (const token of [
  'PBR + TEXTURES', 'TEXTURE CHANNELS', 'MODEL REPORT', 'ANIMATION', 'DEBUG VIEW', 'preserves world transform',
  'EXPORT WEB GLB', 'R3F COMPONENT ZIP', 'RESET TO AUTHORED', 'studioGlbExportProfiles', 'selectedIds.length > 1',
  'TYPED CUSTOMIZATION', 'onCustomizationPatch', 'getAssetCustomizationDefinition',
]) assert(inspector.includes(token), `model inspector missing ${token}`)
assert(outliner.includes('Shift / Ctrl / ⌘ click') && outliner.includes('node.parentId'), 'hierarchical multi-select outliner is incomplete')
assert(library.includes('IMPORT LOCAL GLB') && library.includes('PROJECTS') && library.includes('assets.filter') && library.includes('same-origin offline codec runtime'), 'asset/project library is incomplete')

for (const token of ['inspectStudioModel', 'prepareStudioModel', 'StudioMaterialSlot', 'SkinnedMesh', 'missingNormals', 'studioEditableTextureChannels', 'studioTextureResourceKey']) assert(modelTools.includes(token), `model tooling missing ${token}`)
for (const token of ['loadStudioFile', 'TextureLoader', 'flipY = false', 'studioTextureColorSpace', 'missing']) assert(textureResources.includes(token), `texture runtime missing ${token}`)
for (const token of ['GLTFExporter', 'GLTFLoader', 'loadStudioTextureResources', 'maxTextureSize', "source: { label: 'PRESERVE'", '2048', '1024', 'binary: true', 'animations', 'onlyVisible: true', 'trs: true']) assert(modelExport.includes(token), `local GLB export missing ${token}`)
assert(!modelExport.includes('fetch('), 'local GLB export introduced a remote processing dependency')

for (const token of ['createBrowserZip', 'crc32', '0x04034b50', '0x02014b50', '0x06054b50', 'Duplicate ZIP path']) assert(browserZip.includes(token), `browser ZIP implementation missing ${token}`)
for (const token of ['createStudioComponentPack', '@react-three/drei', '10.7.7', '@react-three/fiber', '9.7.0', '0.185.1', 'meshvara-preset.json', 'QUALITY.md', 'src/models/', 'SkeletonUtils']) assert(componentPack.includes(token), `component pack missing ${token}`)
for (const forbidden of ['fetch(', 'XMLHttpRequest', 'supabase', 'firebase']) assert(!componentPack.includes(forbidden), `component pack introduced remote dependency ${forbidden}`)

for (const token of ['satisfies MeshvaraStudioConfig', 'parentId', 'materials', 'textures?: Partial<Record', 'animation', 'customization', 'generateStudioR3FScaffold', 'renderSource', 'children.get(object.id)']) assert(exportModule.includes(token), `developer handoff missing ${token}`)
for (const token of [
  'tests/studio/project-state.test.ts', 'tests/studio/glb-validation.test.ts', 'tests/studio/codec-capabilities.test.ts', 'tests/studio/transform-preservation.test.ts',
  'tests/studio/customization-project.test.ts', 'tests/studio/texture-validation.test.ts', 'tests/studio/local-storage.test.ts', 'tests/studio/component-pack.test.ts', 'tests/studio/theme.test.ts', 'tests/studio/theme-contrast.test.mjs', 'scripts/validate-studio.mjs',
]) assert(packageJson.includes(token), `studio:check missing ${token}`)
for (const token of ['"@playwright/test": "1.62.1"', '"e2e": "playwright test"', '"release:check": "bun run qa && bun run e2e"']) assert(packageJson.includes(token), `browser release gate missing ${token}`)
for (const token of ['desktop-chromium', 'tablet-chromium', 'mobile-chromium', 'node scripts/sync-codecs.mjs && bun --bun vite dev', 'trace:', 'screenshot:']) assert(playwrightConfig.includes(token), `Playwright config missing ${token}`)
for (const token of [
  'Studio appearance supports dark, light and live system preference', 'local project autosave survives a real browser reload',
  'asset deep link opens an isolated Studio study', 'asset detail hands off into Studio through the real UI link',
  'keyboard transform modes expose accessible pressed state', 'viewport-contained across configured breakpoints',
  'imports a real GLB, replaces a texture and round-trips a portable project', 'exports a validated R3F component ZIP',
  'rejects malformed GLB bytes through the real import control', 'mobile Studio can add an archive object and edit it through the stacked inspector',
  'serves the generated Draco and Basis runtimes from the same origin', 'flagship customization persists into a downloaded portable project',
  "page.on('pageerror'", "message.type() === 'error'", "ControlOrMeta+D", "ControlOrMeta+Z",
]) assert(e2eStudio.includes(token), `Studio browser regression missing ${token}`)

for (const token of ['createStudioTriangleGlb', 'Fixture Triangle', 'Fixture Material', 'STUDIO_RED_PIXEL_PNG']) assert(e2eFixtures.includes(token), `Studio E2E binary fixture missing ${token}`)

for (const section of [
  'Local-first boundary', 'Project, hierarchy and transform model', 'Production model editor', 'Local texture workflow',
  'Local GLB validation and storage safety', 'Offline codec runtime', 'Typed archive customization parity', 'Web GLB export profiles', 'Downloadable component delivery', 'Developer handoff',
  'Appearance and browser release gate', 'Regression coverage', 'Known boundary', 'QA invariant',
]) assert(contract.includes(`## ${section}`), `architecture contract missing ${section}`)

assert(contract.includes('does **not** mean the checked-in public ZIP corpus has been physically regenerated'), 'archive-pack parity boundary is not explicit')
assert(contract.includes('KHR_draco_mesh_compression') && contract.includes('EXT_meshopt_compression') && contract.includes('KHR_texture_basisu'), 'offline codec input contract is not explicit')
assert(contract.includes("worker-src 'self' blob:") && contract.includes('no decoder CDN dependency'), 'same-origin/CSP codec contract is not explicit')
assert(contract.includes('13 flagship procedural archive assets') && contract.includes('enrich-customizable-packs.mjs'), 'typed archive customization parity contract is not explicit')
assert(contract.includes('export encoding/re-compression') && contract.includes('export encoding'), 'codec re-encoding boundary is not explicit')

console.log('Meshvara Studio offline-codec + typed-customization + browser release contract passed')
