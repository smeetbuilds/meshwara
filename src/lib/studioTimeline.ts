import type {
  StudioTimelineState,
  StudioNode,
  StudioTimelineChannel,
  StudioTimelineEasing,
  StudioTransform,
  StudioTransformKeyframe,
  StudioVec3,
} from './studioProject'
import { resolveStudioTimeline } from './studioProject'

export const STUDIO_TIMELINE_MIN_DURATION = 0.25
export const STUDIO_TIMELINE_MAX_DURATION = 120
export const STUDIO_TIMELINE_MIN_FPS = 12
export const STUDIO_TIMELINE_MAX_FPS = 60
export const STUDIO_TIMELINE_KEYFRAME_LIMIT = 600

const EASINGS = new Set<StudioTimelineEasing>(['linear', 'ease-in', 'ease-out', 'ease-in-out', 'step'])
const CHANNELS = new Set<StudioTimelineChannel>(['position', 'rotation', 'scale'])

function keyId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `key-${crypto.randomUUID()}`
  return `key-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function cloneVec3(value: StudioVec3): StudioVec3 {
  return [value[0], value[1], value[2]]
}

function normalizeValue(channel: StudioTimelineChannel, value: StudioVec3): StudioVec3 {
  if (channel === 'scale') return value.map((item) => clamp(Number.isFinite(item) ? item : 1, 0.001, 1000)) as StudioVec3
  if (channel === 'rotation') return value.map((item) => clamp(Number.isFinite(item) ? item : 0, -Math.PI * 20, Math.PI * 20)) as StudioVec3
  return value.map((item) => clamp(Number.isFinite(item) ? item : 0, -10000, 10000)) as StudioVec3
}

export function snapStudioTime(timeline: Pick<StudioTimelineState, 'duration' | 'fps'>, time: number) {
  const fps = clamp(Math.round(timeline.fps || 30), STUDIO_TIMELINE_MIN_FPS, STUDIO_TIMELINE_MAX_FPS)
  const duration = clamp(timeline.duration || 5, STUDIO_TIMELINE_MIN_DURATION, STUDIO_TIMELINE_MAX_DURATION)
  return clamp(Math.round(clamp(Number.isFinite(time) ? time : 0, 0, duration) * fps) / fps, 0, duration)
}

function frameOf(timeline: Pick<StudioTimelineState, 'fps'>, time: number) {
  return Math.round(time * clamp(Math.round(timeline.fps || 30), STUDIO_TIMELINE_MIN_FPS, STUDIO_TIMELINE_MAX_FPS))
}

function sorted(keyframes: StudioTransformKeyframe[]) {
  return [...keyframes].sort((a, b) => a.time - b.time || a.channel.localeCompare(b.channel) || a.id.localeCompare(b.id))
}

export function studioTimelinePlaybackRange(timeline: StudioTimelineState) {
  const duration = clamp(timeline.duration, STUDIO_TIMELINE_MIN_DURATION, STUDIO_TIMELINE_MAX_DURATION)
  const start = snapStudioTime(timeline, Math.min(timeline.rangeStart ?? 0, timeline.rangeEnd ?? duration))
  const end = snapStudioTime(timeline, Math.max(timeline.rangeStart ?? 0, timeline.rangeEnd ?? duration))
  if (end - start >= 1 / timeline.fps) return { start, end }
  const expandedEnd = snapStudioTime(timeline, Math.min(duration, start + 1 / timeline.fps))
  if (expandedEnd > start) return { start, end: expandedEnd }
  return { start: snapStudioTime(timeline, Math.max(0, end - 1 / timeline.fps)), end }
}

export function updateStudioTimelineTiming(
  timeline: StudioTimelineState,
  patch: Partial<Pick<StudioTimelineState, 'duration' | 'fps' | 'loop' | 'rangeStart' | 'rangeEnd'>>,
): StudioTimelineState {
  const duration = clamp(
    typeof patch.duration === 'number' && Number.isFinite(patch.duration) ? patch.duration : timeline.duration,
    STUDIO_TIMELINE_MIN_DURATION,
    STUDIO_TIMELINE_MAX_DURATION,
  )
  const fps = clamp(
    Math.round(typeof patch.fps === 'number' && Number.isFinite(patch.fps) ? patch.fps : timeline.fps),
    STUDIO_TIMELINE_MIN_FPS,
    STUDIO_TIMELINE_MAX_FPS,
  )
  const loop = typeof patch.loop === 'boolean' ? patch.loop : timeline.loop
  const rawStart = typeof patch.rangeStart === 'number' && Number.isFinite(patch.rangeStart) ? patch.rangeStart : timeline.rangeStart
  const rawEnd = typeof patch.rangeEnd === 'number' && Number.isFinite(patch.rangeEnd) ? patch.rangeEnd : timeline.rangeEnd
  const rangeStart = snapStudioTime({ duration, fps }, Math.min(rawStart ?? 0, rawEnd ?? duration))
  const rangeEnd = snapStudioTime({ duration, fps }, Math.max(rawStart ?? 0, rawEnd ?? duration))
  const byFrame = new Map<string, StudioTransformKeyframe>()
  for (const keyframe of timeline.keyframes) {
    const time = snapStudioTime({ duration, fps }, keyframe.time)
    const normalized = { ...keyframe, time, value: normalizeValue(keyframe.channel, keyframe.value) }
    byFrame.set(`${keyframe.channel}:${frameOf({ fps }, time)}`, normalized)
  }
  const next = { ...timeline, duration, fps, loop, rangeStart, rangeEnd, keyframes: sorted([...byFrame.values()]) }
  const range = studioTimelinePlaybackRange(next)
  return { ...next, rangeStart: range.start, rangeEnd: range.end }
}

export function upsertStudioTransformKeyframe(
  timeline: StudioTimelineState,
  channel: StudioTimelineChannel,
  time: number,
  value: StudioVec3,
  easing: StudioTimelineEasing = 'ease-in-out',
): StudioTimelineState {
  const resolvedChannel = CHANNELS.has(channel) ? channel : 'position'
  const resolvedEasing = EASINGS.has(easing) ? easing : 'ease-in-out'
  const resolvedTime = snapStudioTime(timeline, time)
  const frame = frameOf(timeline, resolvedTime)
  const index = timeline.keyframes.findIndex((keyframe) => keyframe.channel === resolvedChannel && frameOf(timeline, keyframe.time) === frame)
  const nextKeyframe: StudioTransformKeyframe = index >= 0
    ? { ...timeline.keyframes[index], time: resolvedTime, value: normalizeValue(resolvedChannel, value), easing: resolvedEasing }
    : { id: keyId(), time: resolvedTime, channel: resolvedChannel, value: normalizeValue(resolvedChannel, value), easing: resolvedEasing }
  const keyframes = [...timeline.keyframes]
  if (index >= 0) keyframes[index] = nextKeyframe
  else if (keyframes.length < STUDIO_TIMELINE_KEYFRAME_LIMIT) keyframes.push(nextKeyframe)
  return { ...timeline, keyframes: sorted(keyframes) }
}

export function updateStudioTransformKeyframe(
  timeline: StudioTimelineState,
  keyframeId: string,
  patch: Partial<Pick<StudioTransformKeyframe, 'time' | 'channel' | 'value' | 'easing'>>,
): StudioTimelineState {
  const current = timeline.keyframes.find((keyframe) => keyframe.id === keyframeId)
  if (!current) return timeline
  const channel = patch.channel && CHANNELS.has(patch.channel) ? patch.channel : current.channel
  const easing = patch.easing && EASINGS.has(patch.easing) ? patch.easing : current.easing
  const time = patch.time === undefined ? current.time : snapStudioTime(timeline, patch.time)
  const value = patch.value ? normalizeValue(channel, patch.value) : normalizeValue(channel, current.value)
  const frame = frameOf(timeline, time)
  const keyframes = timeline.keyframes
    .filter((keyframe) => keyframe.id === keyframeId || keyframe.channel !== channel || frameOf(timeline, keyframe.time) !== frame)
    .map((keyframe) => keyframe.id === keyframeId ? { ...keyframe, channel, easing, time, value } : keyframe)
  return { ...timeline, keyframes: sorted(keyframes) }
}

export function removeStudioTransformKeyframe(timeline: StudioTimelineState, keyframeId: string): StudioTimelineState {
  const keyframes = timeline.keyframes.filter((keyframe) => keyframe.id !== keyframeId)
  return keyframes.length === timeline.keyframes.length ? timeline : { ...timeline, keyframes }
}

export function duplicateStudioTransformKeyframe(timeline: StudioTimelineState, keyframeId: string, frameOffset = 1) {
  const keyframe = timeline.keyframes.find((item) => item.id === keyframeId)
  if (!keyframe || timeline.keyframes.length >= STUDIO_TIMELINE_KEYFRAME_LIMIT) return { timeline, keyframeId: null as string | null }
  const targetTime = snapStudioTime(timeline, keyframe.time + frameOffset / timeline.fps)
  const targetFrame = frameOf(timeline, targetTime)
  if (timeline.keyframes.some((item) => item.channel === keyframe.channel && frameOf(timeline, item.time) === targetFrame)) return { timeline, keyframeId: null as string | null }
  const duplicate = { ...keyframe, id: keyId(), time: targetTime, value: cloneVec3(keyframe.value) }
  return { timeline: { ...timeline, keyframes: sorted([...timeline.keyframes, duplicate]) }, keyframeId: duplicate.id }
}

export function nudgeStudioTransformKeyframe(timeline: StudioTimelineState, keyframeId: string, frameDelta: number) {
  const keyframe = timeline.keyframes.find((item) => item.id === keyframeId)
  if (!keyframe || !Number.isFinite(frameDelta) || frameDelta === 0) return timeline
  const targetTime = snapStudioTime(timeline, keyframe.time + Math.round(frameDelta) / timeline.fps)
  const targetFrame = frameOf(timeline, targetTime)
  if (timeline.keyframes.some((item) => item.id !== keyframeId && item.channel === keyframe.channel && frameOf(timeline, item.time) === targetFrame)) return timeline
  return updateStudioTransformKeyframe(timeline, keyframeId, { time: targetTime })
}

export interface StudioTimelineClipboardKey {
  channel: StudioTimelineChannel
  value: StudioVec3
  easing: StudioTimelineEasing
}

export function copyStudioTransformKeyframe(timeline: StudioTimelineState, keyframeId: string): StudioTimelineClipboardKey | null {
  const keyframe = timeline.keyframes.find((item) => item.id === keyframeId)
  return keyframe ? { channel: keyframe.channel, value: cloneVec3(keyframe.value), easing: keyframe.easing } : null
}

export function pasteStudioTransformKeyframe(timeline: StudioTimelineState, clipboard: StudioTimelineClipboardKey, time: number) {
  const beforeIds = new Set(timeline.keyframes.map((keyframe) => keyframe.id))
  const next = upsertStudioTransformKeyframe(timeline, clipboard.channel, time, clipboard.value, clipboard.easing)
  const frame = frameOf(next, snapStudioTime(next, time))
  const keyframe = next.keyframes.find((item) => item.channel === clipboard.channel && frameOf(next, item.time) === frame)
  return { timeline: next, keyframeId: keyframe && !beforeIds.has(keyframe.id) ? keyframe.id : keyframe?.id ?? null }
}

export function studioAdjacentTransformKeyframe(timeline: StudioTimelineState, time: number, direction: -1 | 1) {
  const ordered = sorted(timeline.keyframes)
  if (!ordered.length) return null
  const epsilon = 0.5 / timeline.fps
  if (direction < 0) return [...ordered].reverse().find((keyframe) => keyframe.time < time - epsilon) ?? ordered[0]
  return ordered.find((keyframe) => keyframe.time > time + epsilon) ?? ordered.at(-1)!
}

function ease(kind: StudioTimelineEasing, t: number) {
  const value = clamp(t, 0, 1)
  if (kind === 'step') return 0
  if (kind === 'ease-in') return value * value
  if (kind === 'ease-out') return 1 - (1 - value) * (1 - value)
  if (kind === 'ease-in-out') return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2
  return value
}

type Quaternion = [number, number, number, number]

function normalizeQuaternion(value: Quaternion): Quaternion {
  const length = Math.hypot(value[0], value[1], value[2], value[3]) || 1
  return [value[0] / length, value[1] / length, value[2] / length, value[3] / length]
}

function eulerXyzToQuaternion(rotation: StudioVec3): Quaternion {
  const [x, y, z] = rotation
  const c1 = Math.cos(x / 2); const c2 = Math.cos(y / 2); const c3 = Math.cos(z / 2)
  const s1 = Math.sin(x / 2); const s2 = Math.sin(y / 2); const s3 = Math.sin(z / 2)
  return normalizeQuaternion([
    s1 * c2 * c3 + c1 * s2 * s3,
    c1 * s2 * c3 - s1 * c2 * s3,
    c1 * c2 * s3 + s1 * s2 * c3,
    c1 * c2 * c3 - s1 * s2 * s3,
  ])
}

function quaternionToEulerXyz(quaternion: Quaternion): StudioVec3 {
  const [x, y, z, w] = normalizeQuaternion(quaternion)
  const m11 = 1 - 2 * (y * y + z * z)
  const m12 = 2 * (x * y - z * w)
  const m13 = 2 * (x * z + y * w)
  const m22 = 1 - 2 * (x * x + z * z)
  const m23 = 2 * (y * z - x * w)
  const m32 = 2 * (y * z + x * w)
  const m33 = 1 - 2 * (x * x + y * y)
  const ry = Math.asin(clamp(m13, -1, 1))
  if (Math.abs(m13) < 0.9999999) return [Math.atan2(-m23, m33), ry, Math.atan2(-m12, m11)]
  return [Math.atan2(m32, m22), ry, 0]
}

function slerpQuaternion(left: Quaternion, right: Quaternion, alpha: number): Quaternion {
  let a = normalizeQuaternion(left)
  let b = normalizeQuaternion(right)
  let dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
  if (dot < 0) {
    b = [-b[0], -b[1], -b[2], -b[3]]
    dot = -dot
  }
  if (dot > 0.9995) return normalizeQuaternion([
    a[0] + (b[0] - a[0]) * alpha,
    a[1] + (b[1] - a[1]) * alpha,
    a[2] + (b[2] - a[2]) * alpha,
    a[3] + (b[3] - a[3]) * alpha,
  ])
  const theta0 = Math.acos(clamp(dot, -1, 1))
  const sinTheta0 = Math.sin(theta0)
  const theta = theta0 * alpha
  const s0 = Math.cos(theta) - dot * Math.sin(theta) / sinTheta0
  const s1 = Math.sin(theta) / sinTheta0
  return normalizeQuaternion([
    s0 * a[0] + s1 * b[0],
    s0 * a[1] + s1 * b[1],
    s0 * a[2] + s1 * b[2],
    s0 * a[3] + s1 * b[3],
  ])
}

export function interpolateStudioRotation(left: StudioVec3, right: StudioVec3, alpha: number): StudioVec3 {
  return quaternionToEulerXyz(slerpQuaternion(eulerXyzToQuaternion(left), eulerXyzToQuaternion(right), clamp(alpha, 0, 1)))
}

function evaluateChannel(
  timeline: StudioTimelineState,
  channel: StudioTimelineChannel,
  fallback: StudioVec3,
  time: number,
): StudioVec3 {
  const keys = timeline.keyframes.filter((keyframe) => keyframe.channel === channel).sort((a, b) => a.time - b.time)
  if (!keys.length) return cloneVec3(fallback)
  if (keys.length === 1 || time <= keys[0].time) return cloneVec3(keys[0].value)
  const last = keys.at(-1)!
  if (time >= last.time) return cloneVec3(last.value)
  for (let index = 0; index < keys.length - 1; index += 1) {
    const left = keys[index]
    const right = keys[index + 1]
    if (time < left.time || time > right.time) continue
    const span = Math.max(1e-6, right.time - left.time)
    const alpha = ease(left.easing, (time - left.time) / span)
    if (channel === 'rotation') return interpolateStudioRotation(left.value, right.value, alpha)
    return [
      left.value[0] + (right.value[0] - left.value[0]) * alpha,
      left.value[1] + (right.value[1] - left.value[1]) * alpha,
      left.value[2] + (right.value[2] - left.value[2]) * alpha,
    ]
  }
  return cloneVec3(fallback)
}

export function normalizeStudioPlaybackTime(timeline: StudioTimelineState, time: number) {
  const duration = Math.max(STUDIO_TIMELINE_MIN_DURATION, timeline.duration)
  if (timeline.loop && time > duration) return time % duration
  return clamp(time, 0, duration)
}

export function normalizeStudioRangePlaybackTime(timeline: StudioTimelineState, time: number) {
  const { start, end } = studioTimelinePlaybackRange(timeline)
  if (time < start) return start
  if (time <= end) return time
  if (!timeline.loop) return end
  const span = Math.max(1 / timeline.fps, end - start)
  return start + ((time - start) % span)
}

export function evaluateStudioTransform(timeline: StudioTimelineState, fallback: StudioTransform, time: number): StudioTransform {
  const resolvedTime = normalizeStudioPlaybackTime(timeline, time)
  return {
    position: evaluateChannel(timeline, 'position', fallback.position, resolvedTime),
    rotation: evaluateChannel(timeline, 'rotation', fallback.rotation, resolvedTime),
    scale: evaluateChannel(timeline, 'scale', fallback.scale, resolvedTime),
  }
}

export function studioTimelineKeyframes(timeline: StudioTimelineState, channel?: StudioTimelineChannel) {
  return timeline.keyframes.filter((keyframe) => !channel || keyframe.channel === channel).sort((a, b) => a.time - b.time)
}

export function studioProjectTimelineDuration(nodes: StudioNode[], fallback = 5) {
  const timelines = nodes.map((node) => resolveStudioTimeline(node.timeline)).filter((timeline) => timeline.keyframes.length)
  if (!timelines.length) return fallback
  return Math.max(...timelines.map((timeline) => timeline.duration), fallback)
}

export function studioTimelineHasTransformKeys(timeline: StudioTimelineState) {
  return timeline.keyframes.length > 0
}
