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

export function updateStudioTimelineTiming(
  timeline: StudioTimelineState,
  patch: Partial<Pick<StudioTimelineState, 'duration' | 'fps' | 'loop'>>,
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
  const byFrame = new Map<string, StudioTransformKeyframe>()
  for (const keyframe of timeline.keyframes) {
    const time = snapStudioTime({ duration, fps }, keyframe.time)
    const normalized = { ...keyframe, time, value: normalizeValue(keyframe.channel, keyframe.value) }
    byFrame.set(`${keyframe.channel}:${frameOf({ fps }, time)}`, normalized)
  }
  return { ...timeline, duration, fps, loop, keyframes: sorted([...byFrame.values()]) }
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

function ease(kind: StudioTimelineEasing, t: number) {
  const value = clamp(t, 0, 1)
  if (kind === 'step') return 0
  if (kind === 'ease-in') return value * value
  if (kind === 'ease-out') return 1 - (1 - value) * (1 - value)
  if (kind === 'ease-in-out') return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2
  return value
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
