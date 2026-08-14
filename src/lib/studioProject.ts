import * as core from './studioProjectCore'
import type { AssetSceneKind } from './types'

export * from './studioProjectCore'
export { resolveAssetCustomization, resolveAssetCustomizationForAsset } from './assetCustomization'
export type { AssetCustomization } from './assetCustomization'

// The core StudioNode contract persists `customization: AssetCustomization`; this facade re-exports its resolvers.

export const STUDIO_KEYFRAME_LIMIT = 600

export type StudioTimelineChannel = 'position' | 'rotation' | 'scale'
export type StudioTimelineEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step'

export interface StudioTransformKeyframe {
  id: string
  time: number
  channel: StudioTimelineChannel
  value: core.StudioVec3
  easing: StudioTimelineEasing
}

export interface StudioTimelineState {
  duration: number
  fps: number
  loop: boolean
  /** Inclusive playback work-area start in seconds. Scrubbing can still inspect the full duration. */
  rangeStart: number
  /** Inclusive playback work-area end in seconds. */
  rangeEnd: number
  keyframes: StudioTransformKeyframe[]
}

declare module './studioProjectCore' {
  interface StudioNode {
    /** Local object-transform timeline. Native GLB clip state remains in `animation`. */
    timeline?: StudioTimelineState
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function finite(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback
}

function sanitizeVec3(value: unknown, fallback: core.StudioVec3, min: number, max: number): core.StudioVec3 {
  if (!Array.isArray(value) || value.length !== 3) return [...fallback]
  return [
    clamp(finite(value[0], fallback[0]), min, max),
    clamp(finite(value[1], fallback[1]), min, max),
    clamp(finite(value[2], fallback[2]), min, max),
  ]
}

export function defaultStudioTimeline(): StudioTimelineState {
  return { duration: 5, fps: 30, loop: true, rangeStart: 0, rangeEnd: 5, keyframes: [] }
}

export function sanitizeStudioTimeline(value: unknown): StudioTimelineState {
  const input = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
  const duration = clamp(finite(input.duration, 5), 0.25, 120)
  const fps = Math.round(clamp(finite(input.fps, 30), 12, 60))
  const rawRangeStart = clamp(finite(input.rangeStart, 0), 0, duration)
  const rawRangeEnd = clamp(finite(input.rangeEnd, duration), 0, duration)
  const rangeStart = Math.min(rawRangeStart, rawRangeEnd)
  const rangeEnd = Math.max(rawRangeStart, rawRangeEnd)
  const channels = new Set<StudioTimelineChannel>(['position', 'rotation', 'scale'])
  const easings = new Set<StudioTimelineEasing>(['linear', 'ease-in', 'ease-out', 'ease-in-out', 'step'])
  const occupied = new Set<string>()
  const ids = new Set<string>()
  const keyframes: StudioTransformKeyframe[] = []

  if (Array.isArray(input.keyframes)) {
    for (const raw of input.keyframes.slice(0, STUDIO_KEYFRAME_LIMIT)) {
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) continue
      const key = raw as Record<string, unknown>
      if (typeof key.id !== 'string' || !/^key-[a-zA-Z0-9-]{4,120}$/.test(key.id) || ids.has(key.id)) continue
      if (!channels.has(key.channel as StudioTimelineChannel) || !easings.has(key.easing as StudioTimelineEasing)) continue
      const channel = key.channel as StudioTimelineChannel
      const time = clamp(Math.round(clamp(finite(key.time, 0), 0, duration) * fps) / fps, 0, duration)
      const frameKey = `${channel}:${Math.round(time * fps)}`
      if (occupied.has(frameKey)) continue
      occupied.add(frameKey)
      ids.add(key.id)
      const fallback: core.StudioVec3 = channel === 'scale' ? [1, 1, 1] : [0, 0, 0]
      const min = channel === 'scale' ? 0.001 : channel === 'rotation' ? -Math.PI * 20 : -10000
      const max = channel === 'scale' ? 1000 : channel === 'rotation' ? Math.PI * 20 : 10000
      keyframes.push({
        id: key.id,
        channel,
        easing: key.easing as StudioTimelineEasing,
        time,
        value: sanitizeVec3(key.value, fallback, min, max),
      })
    }
  }

  keyframes.sort((a, b) => a.time - b.time || a.channel.localeCompare(b.channel) || a.id.localeCompare(b.id))
  return { duration, fps, loop: input.loop !== false, rangeStart, rangeEnd, keyframes }
}

export function resolveStudioTimeline(value?: StudioTimelineState | null): StudioTimelineState {
  return sanitizeStudioTimeline(value ?? defaultStudioTimeline())
}

function keyId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return `key-${crypto.randomUUID()}`
  return `key-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function createArchiveStudioNode(asset: { slug: string; name: string; scene?: AssetSceneKind | string }): core.StudioNode {
  const node = core.createArchiveStudioNode(asset)
  return { ...node, timeline: defaultStudioTimeline() }
}

export function createImportedStudioNode(file: { id: string; name: string }): core.StudioNode {
  const node = core.createImportedStudioNode(file)
  return { ...node, timeline: defaultStudioTimeline() }
}

export function duplicateStudioNodes(project: core.StudioProject, nodeIds: Iterable<string>): { project: core.StudioProject; nodeIds: string[] } {
  const result = core.duplicateStudioNodes(project, nodeIds)
  const duplicated = new Set(result.nodeIds)
  return {
    nodeIds: result.nodeIds,
    project: {
      ...result.project,
      nodes: result.project.nodes.map((node) => {
        if (!duplicated.has(node.id)) return node
        const timeline = resolveStudioTimeline(node.timeline)
        return { ...node, timeline: { ...timeline, keyframes: timeline.keyframes.map((keyframe) => ({ ...keyframe, id: keyId() })) } }
      }),
    },
  }
}

export function duplicateStudioNode(project: core.StudioProject, nodeId: string): { project: core.StudioProject; nodeId?: string } {
  const result = duplicateStudioNodes(project, [nodeId])
  return { project: result.project, nodeId: result.nodeIds[0] }
}

export function parseStudioProject(value: unknown): core.StudioProject | null {
  const project = core.parseStudioProject(value)
  if (!project || !value || typeof value !== 'object' || !Array.isArray((value as Record<string, unknown>).nodes)) return project
  const rawById = new Map<string, Record<string, unknown>>()
  for (const raw of (value as Record<string, unknown>).nodes as unknown[]) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) continue
    const record = raw as Record<string, unknown>
    if (typeof record.id === 'string') rawById.set(record.id, record)
  }
  return {
    ...project,
    nodes: project.nodes.map((node) => ({
      ...node,
      timeline: sanitizeStudioTimeline(rawById.get(node.id)?.timeline),
    })),
  }
}
