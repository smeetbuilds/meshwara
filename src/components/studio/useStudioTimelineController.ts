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
  evaluateStudioTransform,
  removeStudioTransformKeyframe,
  snapStudioTime,
  studioProjectTimelineDuration,
  updateStudioTimelineTiming,
  updateStudioTransformKeyframe,
  upsertStudioTransformKeyframe,
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
  const frameRef = useRef<number | null>(null)
  const lastTimeRef = useRef(0)
  const selectedNode = useMemo(() => project.nodes.find((node) => node.id === selectedId) ?? null, [project.nodes, selectedId])
  const selectedTimeline = useMemo(() => selectedNode ? resolveStudioTimeline(selectedNode.timeline) : null, [selectedNode])
  const duration = selectedTimeline?.duration ?? studioProjectTimelineDuration(project.nodes, 5)
  const fps = selectedTimeline?.fps ?? 30
  const loop = selectedTimeline?.loop ?? true

  const seek = useCallback((next: number) => {
    const frameTimeline = selectedTimeline ?? { duration, fps, loop, keyframes: [] }
    setTime(snapStudioTime(frameTimeline, next))
  }, [duration, fps, loop, selectedTimeline])

  useEffect(() => {
    setPlaying(false)
    setTime(0)
  }, [project.id])

  useEffect(() => {
    setTime((current) => Math.min(current, duration))
  }, [duration])

  useEffect(() => {
    if (!playing) return
    lastTimeRef.current = performance.now()
    const tick = (now: number) => {
      const delta = Math.min(0.1, Math.max(0, (now - lastTimeRef.current) / 1000))
      lastTimeRef.current = now
      setTime((current) => {
        const next = current + delta
        if (next <= duration) return next
        if (loop) return duration > 0 ? next % duration : 0
        setPlaying(false)
        return duration
      })
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [duration, loop, playing])

  const patchSelectedTimeline = useCallback((patch: Partial<StudioTimelineState>) => {
    if (!selectedNode) return
    const timeline = updateStudioTimelineTiming(resolveStudioTimeline(selectedNode.timeline), patch)
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    setTime((current) => Math.min(current, timeline.duration))
    setStatus(`TIMELINE · ${timeline.duration.toFixed(2)}S · ${timeline.fps} FPS · KEYS RE-SNAPPED`)
  }, [commit, project, selectedNode, setStatus])

  const addKeyframe = useCallback((channel: StudioTimelineChannel) => {
    if (!selectedNode) {
      setStatus('ANIMATION · SELECT ONE OBJECT TO ADD A KEYFRAME')
      return
    }
    const currentTimeline = resolveStudioTimeline(selectedNode.timeline)
    const transform = evaluateStudioTransform(currentTimeline, selectedNode.transform, time)
    const timeline = upsertStudioTransformKeyframe(currentTimeline, channel, time, transform[channel])
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    setStatus(`KEYFRAME · ${channel.toUpperCase()} · FRAME ${Math.round(snapStudioTime(timeline, time) * timeline.fps)}`)
  }, [commit, project, selectedNode, setStatus, time])

  const updateKeyframe = useCallback((id: string, patch: Partial<Pick<StudioTransformKeyframe, 'time' | 'easing' | 'value' | 'channel'>>) => {
    if (!selectedNode) return
    const timeline = updateStudioTransformKeyframe(resolveStudioTimeline(selectedNode.timeline), id, patch)
    commit(updateStudioNode(project, selectedNode.id, { timeline }))
    const keyframe = timeline.keyframes.find((item) => item.id === id)
    if (keyframe) setTime(keyframe.time)
    setStatus('KEYFRAME UPDATED · UNDO AVAILABLE')
  }, [commit, project, selectedNode, setStatus])

  const removeKeyframe = useCallback((id: string) => {
    if (!selectedNode) return
    commit(updateStudioNode(project, selectedNode.id, { timeline: removeStudioTransformKeyframe(resolveStudioTimeline(selectedNode.timeline), id) }))
    setStatus('KEYFRAME REMOVED · UNDO AVAILABLE')
  }, [commit, project, selectedNode, setStatus])

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
        setStatus(`AUTO KEY · ${channel.toUpperCase()} · FRAME ${Math.round(snapStudioTime(timeline, time) * timeline.fps)}`)
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
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [addKeyframe, mode])

  return {
    time,
    playing,
    autoKey,
    duration,
    fps,
    seek,
    setPlaying,
    setAutoKey,
    patchSelectedTimeline,
    // Compatibility alias consumed by the staged StudioShell; both mutate node.timeline, never native GLB clip state.
    patchSelectedAnimation: patchSelectedTimeline,
    addKeyframe,
    updateKeyframe,
    removeKeyframe,
    commitTransform,
  }
}
