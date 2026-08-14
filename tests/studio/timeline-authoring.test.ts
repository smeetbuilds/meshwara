import assert from 'node:assert/strict'
import { defaultStudioTimeline } from '../../src/lib/studioProject.ts'
import {
  copyStudioTransformKeyframe,
  duplicateStudioTransformKeyframe,
  nudgeStudioTransformKeyframe,
  pasteStudioTransformKeyframe,
  studioAdjacentTransformKeyframe,
  studioTimelinePlaybackRange,
  updateStudioTimelineTiming,
  upsertStudioTransformKeyframe,
} from '../../src/lib/studioTimeline.ts'

let timeline = { ...defaultStudioTimeline(), duration: 4, fps: 24, rangeEnd: 4 }
timeline = upsertStudioTransformKeyframe(timeline, 'position', 0, [0, 0, 0], 'linear')
timeline = upsertStudioTransformKeyframe(timeline, 'rotation', 1, [0.1, 0.2, 0.3], 'ease-in-out')
timeline = upsertStudioTransformKeyframe(timeline, 'scale', 2, [2, 2, 2], 'ease-out')

const rotation = timeline.keyframes.find((key) => key.channel === 'rotation')!
const copied = copyStudioTransformKeyframe(timeline, rotation.id)
assert.ok(copied)
assert.equal(copied.channel, 'rotation')
assert.deepEqual(copied.value, [0.1, 0.2, 0.3])

const pasted = pasteStudioTransformKeyframe(timeline, copied, 3)
assert.ok(pasted.keyframeId)
assert.equal(pasted.timeline.keyframes.filter((key) => key.channel === 'rotation').length, 2)
assert.equal(pasted.timeline.keyframes.find((key) => key.id === pasted.keyframeId)?.time, 3)
timeline = pasted.timeline

const duplicated = duplicateStudioTransformKeyframe(timeline, pasted.keyframeId!, 1)
assert.ok(duplicated.keyframeId)
const duplicate = duplicated.timeline.keyframes.find((key) => key.id === duplicated.keyframeId)!
assert.equal(duplicate.time, 3 + 1 / 24)
assert.notEqual(duplicate.id, pasted.keyframeId)
timeline = duplicated.timeline

const nudgedLeft = nudgeStudioTransformKeyframe(timeline, duplicate.id, -1)
assert.equal(nudgedLeft, timeline, 'nudge into an occupied same-channel frame must be rejected')
const nudgedRight = nudgeStudioTransformKeyframe(timeline, duplicate.id, 1)
assert.notEqual(nudgedRight, timeline)
assert.equal(nudgedRight.keyframes.find((key) => key.id === duplicate.id)?.time, 3 + 2 / 24)
timeline = nudgedRight

const previous = studioAdjacentTransformKeyframe(timeline, 2.5, -1)
const next = studioAdjacentTransformKeyframe(timeline, 2.5, 1)
assert.equal(previous?.channel, 'scale')
assert.equal(next?.channel, 'rotation')
assert.equal(next?.time, 3)

const ranged = updateStudioTimelineTiming(timeline, { rangeStart: 1.1, rangeEnd: 2.9 })
const range = studioTimelinePlaybackRange(ranged)
assert.equal(range.start, Math.round(1.1 * 24) / 24)
assert.equal(range.end, Math.round(2.9 * 24) / 24)

const reversed = updateStudioTimelineTiming(ranged, { rangeStart: 3.5, rangeEnd: 0.5 })
assert.deepEqual(studioTimelinePlaybackRange(reversed), { start: 0.5, end: 3.5 })

console.log('Meshvara Animation Studio precision-authoring clipboard/navigation/work-area contract passed')
