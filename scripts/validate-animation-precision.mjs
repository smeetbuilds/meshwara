import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [project, timeline, controller, ui, shell, exportModule, componentPack, css, contract, packageText, e2e] = await Promise.all([
  read('src/lib/studioProject.ts'),
  read('src/lib/studioTimeline.ts'),
  read('src/components/studio/useStudioTimelineController.ts'),
  read('src/components/studio/StudioTimeline.tsx'),
  read('src/components/studio/StudioShell.tsx'),
  read('src/lib/studioExport.ts'),
  read('src/lib/studioComponentPack.ts'),
  read('src/styles/studio-animation.css'),
  read('ANIMATION_PRECISION.md'),
  read('package.json'),
  read('tests/e2e/studio-animation-precision.spec.ts'),
])
const pkg = JSON.parse(packageText)

function assert(condition, message) {
  if (!condition) throw new Error(`Animation precision contract failed: ${message}`)
}

for (const token of ['rangeStart: number', 'rangeEnd: number', 'rawRangeStart', 'rawRangeEnd', 'defaultStudioTimeline', 'sanitizeStudioTimeline']) {
  assert(project.includes(token), `project persistence missing ${token}`)
}
for (const token of [
  'studioTimelinePlaybackRange', 'duplicateStudioTransformKeyframe', 'nudgeStudioTransformKeyframe', 'copyStudioTransformKeyframe',
  'pasteStudioTransformKeyframe', 'studioAdjacentTransformKeyframe', 'interpolateStudioRotation', 'slerpQuaternion', 'eulerXyzToQuaternion',
  'quaternionToEulerXyz', 'normalizeStudioRangePlaybackTime',
]) assert(timeline.includes(token), `timeline precision runtime missing ${token}`)
assert(timeline.includes("if (dot < 0)"), 'quaternion interpolation does not enforce shortest-path hemisphere selection')
assert(timeline.includes("if (channel === 'rotation') return interpolateStudioRotation"), 'rotation channel still uses scalar Euler interpolation')

for (const token of [
  'selectedKeyId', 'clipboard', 'setRangeBoundary', 'resetRange', 'copyKeyframe', 'pasteKeyframe', 'duplicateKeyframe', 'nudgeKeyframe', 'jumpKeyframe',
  "event.key.toLowerCase() === 'i'", "event.key.toLowerCase() === 'o'", "event.key === '['", "event.key === ']'", 'playbackRange.start', 'playbackRange.end',
]) assert(controller.includes(token), `timeline controller missing ${token}`)

for (const token of [
  'Playback range in', 'Playback range out', 'SET IN', 'SET OUT', 'FULL', 'PREV KEY', 'NEXT KEY', 'PASTE @ PLAYHEAD', 'DUP +1F',
  "const AXES = ['X', 'Y', 'Z'] as const", 'Key value ${axis}', 'SHORTEST-PATH QUATERNION INTERPOLATION', 'studio-work-range', 'studio-track-range',
]) assert(ui.includes(token), `timeline UI missing ${token}`)
for (const token of ['<StudioTimeline', 'onAnimationPatch={timeline.patchSelectedAnimation}', 'onAddKeyframe={timeline.addKeyframe}', 'onUpdateKeyframe={timeline.updateKeyframe}', 'onRemoveKeyframe={timeline.removeKeyframe}']) assert(shell.includes(token), `Studio shell compatibility missing ${token}`)

assert(exportModule.includes('rangeStart: number; rangeEnd: number'), 'typed scene export drops playback work area')
assert(componentPack.includes('the playback work area') && componentPack.includes('shortest path with quaternion interpolation'), 'component pack docs do not describe precision timeline semantics')
for (const token of ['.studio-work-range', '.studio-range-actions', '.studio-key-toolbar', '.studio-key-vector', '.studio-key-actions', '--studio-range-start', '--studio-range-end']) assert(css.includes(token), `precision CSS missing ${token}`)
for (const token of ['shortest-path spherical interpolation', 'Persistent work area', 'transient key clipboard', 'Delivery parity', 'does not claim skeletal authoring']) assert(contract.includes(token), `precision architecture missing ${token}`)

assert(typeof pkg.scripts?.['animation:precision:check'] === 'string', 'animation:precision:check script missing')
assert(pkg.scripts['animation:check']?.includes('animation:precision:check'), 'animation:check does not include precision gate')
assert(pkg.scripts['e2e:studio']?.includes('studio-animation-precision.spec.ts'), 'Studio E2E gate omits precision browser workflow')
for (const token of ['sets a persistent work area', 'edits XYZ key values', 'copies pastes duplicates and nudges a key']) assert(e2e.includes(token), `precision E2E missing ${token}`)

console.log('Meshvara Animation Studio precision-authoring structural contract passed')
