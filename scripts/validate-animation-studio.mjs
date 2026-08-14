import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const read = (path) => readFile(resolve(root, path), 'utf8')
const [
  project,
  timeline,
  controller,
  component,
  viewport,
  shell,
  studioExport,
  css,
  architecture,
  packageText,
] = await Promise.all([
  read('src/lib/studioProject.ts'),
  read('src/lib/studioTimeline.ts'),
  read('src/components/studio/useStudioTimelineController.ts'),
  read('src/components/studio/StudioTimeline.tsx'),
  read('src/components/studio/StudioViewport.tsx'),
  read('src/components/studio/StudioShell.tsx'),
  read('src/lib/studioExport.ts'),
  read('src/styles/studio-animation.css'),
  read('ANIMATION_STUDIO.md'),
  read('package.json'),
])
const pkg = JSON.parse(packageText)

function assert(condition, message) {
  if (!condition) throw new Error(`Animation Studio contract failed: ${message}`)
}

for (const token of ['StudioTransformKeyframe', "StudioTimelineChannel = 'position' | 'rotation' | 'scale'", 'StudioTimelineState', 'timeline?: StudioTimelineState', 'STUDIO_KEYFRAME_LIMIT', 'sanitizeStudioTimeline']) {
  assert(project.includes(token), `project persistence missing ${token}`)
}
for (const token of ['snapStudioTime', 'updateStudioTimelineTiming', 'upsertStudioTransformKeyframe', 'updateStudioTransformKeyframe', 'removeStudioTransformKeyframe', 'evaluateStudioTransform', "'ease-in-out'", "'step'", 'STUDIO_TIMELINE_KEYFRAME_LIMIT']) {
  assert(timeline.includes(token), `timeline runtime missing ${token}`)
}
for (const token of ['requestAnimationFrame', "event.code === 'Space'", "event.key.toLowerCase() === 'k'", 'AUTO KEY', 'commitTransform', 'selectedIds.length !== 1', 'resolveStudioTimeline']) {
  assert(controller.includes(token), `timeline controller missing ${token}`)
}
for (const token of ['ANIMATION TIMELINE', 'Timeline playhead', '+ {channel.toUpperCase()}', 'DELETE KEY', 'AUTO KEY', 'EASING']) {
  assert(component.includes(token), `timeline UI missing ${token}`)
}
assert(viewport.includes('evaluateStudioTransform(resolveStudioTimeline(node.timeline), node.transform, timelineTime)'), 'viewport is not driven by persisted transform timeline')
assert(viewport.includes('node.locked || playing'), 'gizmo is not disabled during playback')
for (const token of ['<StudioTimeline', 'timelineTime={timeline.time}', 'timelinePlaying={timeline.playing}', 'onUpdateKeyframe={timeline.updateKeyframe}', "import '../../styles/studio-animation.css'"]) {
  assert(shell.includes(token), `Studio shell integration missing ${token}`)
}
assert(studioExport.includes('keyframes: resolveStudioTimeline(node.timeline).keyframes.map'), 'developer config does not deep-copy timeline keyframes')
assert(studioExport.includes("channel: 'position' | 'rotation' | 'scale'"), 'generated config type drops transform timeline channels')
for (const token of ['.studio-timeline', '.studio-track-rail', '.studio-auto-key', '@media(max-width:760px)']) assert(css.includes(token), `responsive timeline styling missing ${token}`)
for (const token of ['frame-snapped', 'undo/redo', 'native GLB clips', 'not skeletal keyframing', 'quaternion']) assert(architecture.toLowerCase().includes(token.toLowerCase()), `animation architecture boundary missing ${token}`)
assert(typeof pkg.scripts?.['animation:check'] === 'string', 'animation:check package script missing')
assert(pkg.scripts['studio:check']?.includes('animation:check'), 'studio:check does not include Animation Studio contract')

console.log('Meshvara Animation Studio structural contract passed')
