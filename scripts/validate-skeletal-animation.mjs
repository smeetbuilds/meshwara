import { readFile } from 'node:fs/promises'

const files = Object.fromEntries(await Promise.all([
  'package.json',
  'src/lib/studioRigState.ts',
  'src/lib/studioRigRuntime.ts',
  'src/lib/studioProject.ts',
  'src/components/studio/StudioRigPanel.tsx',
  'src/components/studio/StudioViewport.tsx',
  'src/components/studio/StudioImportedObject.tsx',
  'src/components/studio/StudioInspector.tsx',
  'src/components/studio/studioRigEvents.ts',
  'src/lib/studioExport.ts',
  'src/lib/studioComponentPack.ts',
  'src/styles/studio-rig.css',
  'SKELETAL_ANIMATION.md',
].map(async (path) => [path, await readFile(path, 'utf8')])))

function assert(condition, message) { if (!condition) throw new Error(message) }
function has(path, token) { assert(files[path].includes(token), `${path} missing ${token}`) }

has('package.json', 'rig:check')
has('package.json', 'tests/studio/rig-state.test.ts')
has('package.json', 'tests/studio/rig-project.test.ts')
has('src/lib/studioRigState.ts', 'STUDIO_HUMANOID_ROLES')
has('src/lib/studioRigState.ts', 'suggestStudioHumanoidMapping')
has('src/lib/studioRigState.ts', 'mirrorStudioPoseDirection')
has('src/lib/studioRigState.ts', 'meshvara-pose-library')
has('src/lib/studioRigRuntime.ts', 'inspectStudioRig')
has('src/lib/studioRigRuntime.ts', 'captureStudioRigPose')
has('src/lib/studioRigRuntime.ts', 'applyStudioRigPose')
has('src/lib/studioProject.ts', 'rig?: StudioRigState')
has('src/lib/studioProject.ts', "node.kind === 'imported' ? sanitizeStudioRig")
has('src/components/studio/StudioImportedObject.tsx', 'activePose ?? rigInspection.restPose')
has('src/components/studio/StudioImportedObject.tsx', 'captureStudioRigPose')
has('src/components/studio/StudioImportedObject.tsx', 'if (!node.animation.clip || activePose) return')
has('src/components/studio/StudioInspector.tsx', 'StudioInspectorCore')
has('src/components/studio/StudioInspector.tsx', 'StudioRigPanel')
has('src/components/studio/StudioInspector.tsx', 'addStudioPose(resolveStudioRig(node.rig), result.pose)')
has('src/components/studio/StudioInspector.tsx', 'onNodePatch({ rig })')
has('src/components/studio/studioRigEvents.ts', 'meshvara:studio-rig-capture-request')
has('src/components/studio/StudioImportedObject.tsx', 'onStudioRigCaptureRequest')
has('src/components/studio/StudioImportedObject.tsx', 'dispatchStudioRigCaptureResult')
has('src/components/studio/StudioViewport.tsx', 'StudioImportedObject')
has('src/components/studio/StudioRigPanel.tsx', 'AUTO MAP')
has('src/components/studio/StudioRigPanel.tsx', 'CAPTURE CURRENT')
has('src/components/studio/StudioRigPanel.tsx', 'L→R')
has('src/components/studio/StudioRigPanel.tsx', 'IMPORT POSES')
has('src/lib/studioExport.ts', 'rig?: ReturnType<typeof resolveStudioRig>')
has('src/lib/studioComponentPack.ts', 'preset.rig = resolveStudioRig(node.rig)')
has('SKELETAL_ANIMATION.md', 'IK')
has('SKELETAL_ANIMATION.md', 'does not')

assert(!/fetch\(|axios\(|supabase|firebase/i.test(files['src/lib/studioRigState.ts'] + files['src/lib/studioRigRuntime.ts']), 'Rig foundation must remain local-first')
console.log('Meshvara skeletal animation structural contract passed')
