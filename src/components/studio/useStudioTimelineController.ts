import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  resolveStudioTimeline,
  updateStudioGroupTransform,
  updateStudioNode,
  updateStudioTransform,
  type StudioProject,
  type StudioTimelineState,
  type StudioTimelineChannel,
  type StudioTransform,
  type StudioTransformKeyframe,
  type StudioTransformMode,
} from '../../lib/studioProject'
import {
  copyStudioTransformKeyframe,
  duplicateStudioTransformKeyframe,
  evaluateStudioTransform,
  nudgeStudioTransformKeyframe,
  pasteStudioTransformKeyframe,
  removeStudioTransformKeyframe,
  snapStudioTime,
  studioAdjacentTransformKeyframe,
  studioProjectTimelineDuration,
  studioTimelinePlaybackRange,
  updateStudioTimelineTiming,
  updateStudioTransformKeyframe,
  upsertStudioTransformKeyframe,
  type StudioTimelineClipboardKey,
} from '../../lib/studioTimeline'

type CommitStudioProject = (project: StudioProject, nextSelectedIds?: string[]) => void

export function useStudioTimelineController({
  project,
  selectedIds,
  selectedId,
  mode,
  commit,
  setStatus,
}: {
  project: StudioProject
  selectedIds: string[]
  selectedId: string | null
  mode: StudioTransformMode
  commit: CommitStudioProject
  setStatus: (status: string) => void
}) {
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [autoKey, setAutoKey] = useState(false)
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null)
  const [clipboard, setClipboard] = useState<StudioTimelineClipboardKey | null>(null)
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const selectedNode = useMemo(() => project.nodes.find((node) => node.id === selectedId) ?? null, [project.nodes, selectedId])
  const selectedTimeline = useMemo(() => selectedNode ? resolveStudioTimeline(selectedNode.timeline) : null, [selectedNode])
  const duration = selectedTimeline?.duration ?? studioProjectTimelineDuration(project.nodes, 5)
  const fps = selectedTimeline?.fps ?? 30
  const loop = selectedTimeline?.loop ?? true
  const playbackRange = useMemo(() => selectedTimeline ? studioTimelinePlaybackRange(selectedTimeline) : { start: 0, end: duration }, [duration, selectedTimeline])

  const seek = useCallback((next: number) => {
    const frameTimeline = selectedTimeline ?? { duration, fps, loop, rangeStart: 0, rangeEnd: duration, keyframes: [] }
    setTime(snapStudioTime(frameTimeline, next))
  }, [duration, fps, loop, selectedTimeline])

  useEffect(() => {
    setPlaying(false)
    setTime(0)
    setSelectedKeyId(null)
    setClipboard(null)
  }, [project.id])

  useEffect(() => {
    setSelectedKeyId(null)
  }, [selectedId])

  useEffect(() => {
    if (!selectedTimeline || !selectedKeyId) return
    if (!selectedTimeline.keyframes.some((keyframe) => keyframe.id === selectedKeyId)) setSelectedKeyId(null)
  }, [selectedKeyId, selectedTimeline])

  useEffect(() => {
    setTime((current) => Math.min(current, duration))
  }, [duration])

  useEffect(() => {
    if (!playing) return
    setTime((current) => current < playbackRange.start || current >= playbackRange.end ? playbackRange.start : current)
    lastTimeRef.current = performance.now()
    const tick = (now: number) => {
      const delta = Math.min(0.1, Math.max(0, (now - lastTimeRef.current) / 1000))
      lastTimeRef.current = now
      setTime((current) => {
        const next = current + delta
        if (next <= playbackRange.end) return next
        if (loop) {
          const span = Math.max(1 / fps, playbackRange.end - playbackRange.start)
          return playbackRange.start + ((next - playbackRange.start) % span)
        }
        setPlaying(false)
        return playbackRange.end
      })
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [fps, loop, playbackRange.end, playbackRange.start, playing])

  const patchSelectedTimeline = useCallback((patch: Partial<StudioTimelineState>) => {
    if (!selectedNode) return
    const timeline = updateStudioTimelineTiming(resolveStudioTimeline(selectedNode.timeline), patch)
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    setTime((current) => Math.min(current, timeline.duration))
    const range = studioTimelinePlaybackRange(timeline)
    setStatus(`TIMELINE · ${timeline.duration.toFixed(2)}S · ${timeline.fps} FPS · RANGE ${range.start.toFixed(2)}–${range.end.toFixed(2)}S`)
  }, [commit, project, selectedNode, setStatus])

  const setRangeBoundary = useCallback((boundary: 'in' | 'out') => {
    if (!selectedNode) return
    const current = resolveStudioTimeline(selectedNode.timeline)
    const patch = boundary === 'in' ? { rangeStart: Math.min(time, current.rangeEnd) } : { rangeEnd: Math.max(time, current.rangeStart) }
    const timeline = updateStudioTimelineTiming(current, patch)
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    setStatus(`WORK AREA ${boundary === 'in' ? 'IN' : 'OUT'} · ${snapStudioTime(timeline, time).toFixed(2)}S`)
  }, [commit, project, selectedNode, setStatus, time])

  const resetRange = useCallback(() => {
    if (!selectedNode) return
    const current = resolveStudioTimeline(selectedNode.timeline)
    const timeline = updateStudioTimelineTiming(current, { rangeStart: 0, rangeEnd: current.duration })
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    setStatus('WORK AREA RESET · FULL TIMELINE')
  }, [commit, project, selectedNode, setStatus])

  const addKeyframe = useCallback((channel: StudioTimelineChannel, options?: { time?: number; value?: [number, number, number]; easing?: StudioTransformKeyframe['easing'] }) => {
    if (!selectedNode) {
      setStatus('ANIMATION · SELECT ONE OBJECT TO ADD A KEYFRAME')
      return
    }
    const currentTimeline = resolveStudioTimeline(selectedNode.timeline)
    const authorTime = options?.time ?? time
    const transform = evaluateStudioTransform(currentTimeline, selectedNode.transform, authorTime)
    const value = options?.value ?? transform[channel]
    const timeline = upsertStudioTransformKeyframe(currentTimeline, channel, authorTime, value, options?.easing)
    const frame = Math.round(snapStudioTime(timeline, authorTime) * timeline.fps)
    const keyframe = timeline.keyframes.find((item) => item.channel === channel && Math.round(item.time * timeline.fps) === frame)
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    setSelectedKeyId(keyframe?.id ?? null)
    setStatus(`KEYFRAME · ${channel.toUpperCase()} · FRAME ${frame}`)
  }, [commit, project, selectedNode, setStatus, time])

  const updateKeyframe = useCallback((id: string, patch: Partial<Pick<StudioTransformKeyframe, 'time' | 'easing' | 'value' | 'channel'>>) => {
    if (!selectedNode) return
    const timeline = updateStudioTransformKeyframe(resolveStudioTimeline(selectedNode.timeline), id, patch)
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    const keyframe = timeline.keyframes.find((item) => item.id === id)
    if (keyframe) setTime(keyframe.time)
    setStatus('KEYFRAME UPDATED · UNDO AVAILABLE')
  }, [commit, project, selectedNode, setStatus])

  const removeKeyframe = useCallback((id = selectedKeyId ?? '') => {
    if (!selectedNode || !id) return
    commit(updateStudioNode(project, selectedNode.id, { timeline: removeStudioTransformKeyframe(resolveStudioTimeline(selectedNode.timeline), id) }))
    if (id === selectedKeyId) setSelectedKeyId(null)
    setStatus('KEYFRAME REMOVED · UNDO AVAILABLE')
  }, [commit, project, selectedKeyId, selectedNode, setStatus])

  const copyKeyframe = useCallback((id = selectedKeyId ?? '') => {
    if (!selectedNode || !id) return
    const copied = copyStudioTransformKeyframe(resolveStudioTimeline(selectedNode.timeline), id)
    if (!copied) return
    setClipboard(copied)
    setStatus(`KEY COPIED · ${copied.channel.toUpperCase()}`)
  }, [selectedKeyId, selectedNode, setStatus])

  const pasteKeyframe = useCallback(() => {
    if (!selectedNode || !clipboard) {
      setStatus('KEY PASTE · COPY A KEY FIRST')
      return
    }
    const result = pasteStudioTransformKeyframe(resolveStudioTimeline(selectedNode.timeline), clipboard, time)
    commit(updateStudioNode(project, selectedNode.id, { timeline: result.timeline }))
    setSelectedKeyId(result.keyframeId)
    setStatus(`KEY PASTED · ${clipboard.channel.toUpperCase()} · FRAME ${Math.round(snapStudioTime(result.timeline, time) * result.timeline.fps)}`)
  }, [clipboard, commit, project, selectedNode, setStatus, time])

  const duplicateKeyframe = useCallback((id = selectedKeyId ?? '') => {
    if (!selectedNode || !id) return
    const result = duplicateStudioTransformKeyframe(resolveStudioTimeline(selectedNode.timeline), id, 1)
    if (!result.keyframeId) {
      setStatus('KEY DUPLICATE BLOCKED · NEXT FRAME OCCUPIED OR OUT OF RANGE')
      return
    }
    commit(updateStudioNode(project, selectedNode.id, { timeline: result.timeline }))
    setSelectedKeyId(result.keyframeId)
    const key = result.timeline.keyframes.find((item) => item.id === result.keyframeId)
    if (key) setTime(key.time)
    setStatus('KEY DUPLICATED · +1 FRAME · UNDO AVAILABLE')
  }, [commit, project, selectedKeyId, selectedNode, setStatus])

  const nudgeKeyframe = useCallback((frames: -1 | 1, id = selectedKeyId ?? '') => {
    if (!selectedNode || !id) return
    const before = resolveStudioTimeline(selectedNode.timeline)
    const timeline = nudgeStudioTransformKeyframe(before, id, frames)
    if (timeline === before) {
      setStatus('KEY NUDGE BLOCKED · TARGET FRAME OCCUPIED OR LIMIT REACHED')
      return
    }
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    const key = timeline.keyframes.find((item) => item.id === id)
    if (key) setTime(key.time)
    setStatus(`KEY NUDGED · ${frames < 0 ? '-1' : '+1'} FRAME`)
  }, [commit, project, selectedKeyId, selectedNode, setStatus])

  const jumpKeyframe = useCallback((direction: -1 | 1) => {
    if (!selectedTimeline) return
    const key = studioAdjacentTransformKeyframe(selectedTimeline, time, direction)
    if (!key) return
    setSelectedKeyId(key.id)
    setTime(key.time)
    setStatus(`KEY NAVIGATION · ${key.channel.toUpperCase()} · FRAME ${Math.round(key.time * selectedTimeline.fps)}`)
  }, [selectedTimeline, setStatus, time])

  const commitTransform = useCallback((id: string, patch: Partial<StudioTransform>) => {
    const node = project.nodes.find((item) => item.id === id)
    if (!node) return
    const nextTransform: StudioTransform = { ...node.transform, ...patch }
    const channel = mode as StudioTimelineChannel

    if (autoKey) {
      if (selectedIds.length !== 1 || selectedIds[0] !== id) {
        setStatus('AUTO KEY · MULTI-SELECTION USES BASE TRANSFORM UNTIL GROUP TRACKS LAND')
      } else {
        const timeline = upsertStudioTransformKeyframe(resolveStudioTimeline(node.timeline), channel, time, nextTransform[channel])
        commit(updateStudioNode(project, id, { timeline }))
        const frame = Math.round(snapStudioTime(timeline, time) * timeline.fps)
        const key = timeline.keyframes.find((item) => item.channel === channel && Math.round(item.time * timeline.fps) === frame)
        setSelectedKeyId(key?.id ?? null)
        setStatus(`AUTO KEY · ${channel.toUpperCase()} · FRAME ${frame}`)
        return
      }
    }

    if (selectedIds.length > 1 && selectedIds.includes(id)) {
      const result = updateStudioGroupTransform(project, selectedIds, id, nextTransform)
      if (!result.preserved) {
        setStatus(`GROUP TRANSFORM REJECTED · ${(result.reason ?? 'UNREPRESENTABLE TRS').toUpperCase()}`)
        return
      }
      commit(result.project)
      setStatus(`${selectedIds.length} OBJECT GROUP TRANSFORM COMMITTED`)
      return
    }
    commit(updateStudioTransform(project, id, nextTransform))
  }, [autoKey, commit, mode, project, selectedIds, setStatus, time])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable)) return
      if (event.code === 'Space') {
        event.preventDefault()
        setPlaying((current) => !current)
        return
      }
      if (event.key.toLowerCase() === 'k' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        addKeyframe(mode as StudioTimelineChannel)
        return
      }
      if (event.key.toLowerCase() === 'i' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        setRangeBoundary('in')
        return
      }
      if (event.key.toLowerCase() === 'o' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        setRangeBoundary('out')
        return
      }
      if (event.key === '[') {
        event.preventDefault()
        jumpKeyframe(-1)
        return
      }
      if (event.key === ']') {
        event.preventDefault()
        jumpKeyframe(1)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [addKeyframe, jumpKeyframe, mode, setRangeBoundary])

  return {
    time,
    playing,
    autoKey,
    duration,
    fps,
    playbackRange,
    selectedKeyId,
    clipboard,
    seek,
    setPlaying,
    setAutoKey,
    setSelectedKeyId,
    patchSelectedTimeline,
    // Compatibility alias consumed by StudioShell; both mutate node.timeline, never native GLB clip state.
    patchSelectedAnimation: patchSelectedTimeline,
    setRangeBoundary,
    resetRange,
    addKeyframe,
    updateKeyframe,
    removeKeyframe,
    copyKeyframe,
    pasteKeyframe,
    duplicateKeyframe,
    nudgeKeyframe,
    jumpKeyframe,
    commitTransform,
  }
}
