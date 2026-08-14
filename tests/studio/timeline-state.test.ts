import assert from 'node:assert/strict'
import {
  createImportedStudioNode,
  createStudioProject,
  defaultStudioTimeline,
  parseStudioProject,
  resolveStudioTimeline,
} from '../../src/lib/studioProject.ts'
import {
  evaluateStudioTransform,
  interpolateStudioRotation,
  removeStudioTransformKeyframe,
  snapStudioTime,
  studioTimelinePlaybackRange,
  updateStudioTimelineTiming,
  updateStudioTransformKeyframe,
  upsertStudioTransformKeyframe,
} from '../../src/lib/studioTimeline.ts'

const base = { position: [0, 0, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], scale: [1, 1, 1] as [number, number, number] }
let timeline = { ...defaultStudioTimeline(), duration: 2, fps: 30, loop: false, rangeStart: 0.25, rangeEnd: 1.75 }
timeline = upsertStudioTransformKeyframe(timeline, 'position', 0, [0, 0, 0], 'linear')
timeline = upsertStudioTransformKeyframe(timeline, 'position', 2, [10, 4, -2], 'linear')
assert.equal(timeline.keyframes.length, 2)
assert.equal(evaluateStudioTransform(timeline, base, 1).position[0], 5)
assert.equal(evaluateStudioTransform(timeline, base, 1).position[1], 2)
assert.deepEqual(studioTimelinePlaybackRange(timeline), { start: 0.26666666666666666, end: 1.7666666666666666 })

const first = timeline.keyframes[0]
timeline = updateStudioTransformKeyframe(timeline, first.id, { easing: 'step' })
assert.deepEqual(evaluateStudioTransform(timeline, base, 1).position, [0, 0, 0])
assert.equal(snapStudioTime(timeline, 0.051), 2 / 30)

const retimed = updateStudioTimelineTiming(timeline, { duration: 0.5, fps: 12, rangeStart: 0.1, rangeEnd: 0.4 })
assert.equal(retimed.duration, 0.5)
assert.equal(retimed.fps, 12)
assert.deepEqual(studioTimelinePlaybackRange(retimed), { start: 1 / 12, end: 5 / 12 })
assert.ok(retimed.keyframes.every((keyframe) => keyframe.time <= 0.5))
assert.deepEqual(new Set(retimed.keyframes.map((keyframe) => `${keyframe.channel}:${Math.round(keyframe.time * retimed.fps)}`)).size, retimed.keyframes.length)

timeline = upsertStudioTransformKeyframe(timeline, 'scale', 0.5, [2, 3, 4], 'ease-in-out')
const scaleKey = timeline.keyframes.find((keyframe) => keyframe.channel === 'scale')
assert.ok(scaleKey)
timeline = removeStudioTransformKeyframe(timeline, scaleKey.id)
assert.equal(timeline.keyframes.some((keyframe) => keyframe.channel === 'scale'), false)

const degrees = (value: number) => value * Math.PI / 180
const quaternionFromEuler = ([x, y, z]: [number, number, number]) => {
  const c1 = Math.cos(x / 2), c2 = Math.cos(y / 2), c3 = Math.cos(z / 2)
  const s1 = Math.sin(x / 2), s2 = Math.sin(y / 2), s3 = Math.sin(z / 2)
  return [s1*c2*c3 + c1*s2*s3, c1*s2*c3 - s1*c2*s3, c1*c2*s3 + s1*s2*c3, c1*c2*c3 - s1*s2*s3] as [number, number, number, number]
}
const orientationDot = (a: [number, number, number], b: [number, number, number]) => Math.abs(quaternionFromEuler(a).reduce((sum, value, index) => sum + value * quaternionFromEuler(b)[index], 0))
const shortestMid = interpolateStudioRotation([0, degrees(170), 0], [0, degrees(-170), 0], 0.5)
assert.ok(orientationDot(shortestMid, [0, Math.PI, 0]) > 0.99999, `expected shortest-path midpoint to be orientation-equivalent to 180° Y, got ${shortestMid}`)
const rotationTimeline = upsertStudioTransformKeyframe(
  upsertStudioTransformKeyframe({ ...defaultStudioTimeline(), duration: 1, rangeEnd: 1 }, 'rotation', 0, [0, degrees(170), 0], 'linear'),
  'rotation',
  1,
  [0, degrees(-170), 0],
  'linear',
)
const rotationMid = evaluateStudioTransform(rotationTimeline, base, 0.5).rotation
assert.ok(orientationDot(rotationMid, [0, Math.PI, 0]) > 0.99999)

const node = createImportedStudioNode({ id: 'file-fixture', name: 'Fixture.glb' })
node.timeline = timeline
const project = { ...createStudioProject('Timeline fixture'), nodes: [node] }
const parsed = parseStudioProject(JSON.parse(JSON.stringify(project)))
assert.ok(parsed)
assert.deepEqual(resolveStudioTimeline(parsed.nodes[0].timeline).keyframes, timeline.keyframes)
assert.equal(resolveStudioTimeline(parsed.nodes[0].timeline).rangeStart, timeline.rangeStart)
assert.equal(resolveStudioTimeline(parsed.nodes[0].timeline).rangeEnd, timeline.rangeEnd)

const legacy = JSON.parse(JSON.stringify(project))
delete legacy.nodes[0].timeline
const migrated = parseStudioProject(legacy)
assert.ok(migrated)
const migratedTimeline = resolveStudioTimeline(migrated.nodes[0].timeline)
assert.equal(migratedTimeline.duration, 5)
assert.equal(migratedTimeline.fps, 30)
assert.equal(migratedTimeline.rangeStart, 0)
assert.equal(migratedTimeline.rangeEnd, 5)
assert.deepEqual(migratedTimeline.keyframes, [])

const legacyFoundation = JSON.parse(JSON.stringify(project))
delete legacyFoundation.nodes[0].timeline.rangeStart
delete legacyFoundation.nodes[0].timeline.rangeEnd
const migratedFoundation = parseStudioProject(legacyFoundation)
assert.ok(migratedFoundation)
assert.equal(resolveStudioTimeline(migratedFoundation.nodes[0].timeline).rangeStart, 0)
assert.equal(resolveStudioTimeline(migratedFoundation.nodes[0].timeline).rangeEnd, timeline.duration)

const hostile = JSON.parse(JSON.stringify(project))
hostile.nodes[0].timeline = {
  loop: false,
  duration: 900,
  fps: 500,
  rangeStart: 999,
  rangeEnd: -40,
  keyframes: [
    { id: 'key-valid-a', channel: 'position', time: 999, value: [999999, 0, 0], easing: 'linear' },
    { id: 'key-valid-b', channel: 'scale', time: -10, value: [-5, 2, 3], easing: 'ease-out' },
    { id: 'bad', channel: 'evil', time: 1, value: [1, 2, 3], easing: 'linear' },
  ],
}
const sanitized = parseStudioProject(hostile)
assert.ok(sanitized)
const sanitizedTimeline = resolveStudioTimeline(sanitized.nodes[0].timeline)
assert.equal(sanitizedTimeline.duration, 120)
assert.equal(sanitizedTimeline.fps, 60)
assert.equal(sanitizedTimeline.loop, false)
assert.equal(sanitizedTimeline.rangeStart, 0)
assert.equal(sanitizedTimeline.rangeEnd, 120)
assert.equal(sanitizedTimeline.keyframes.length, 2)
assert.equal(sanitizedTimeline.keyframes[0].value[0], 0.001)
assert.equal(sanitizedTimeline.keyframes[1].value[0], 10000)

console.log('Meshvara Animation Studio timeline state + range + quaternion migration contract passed')
