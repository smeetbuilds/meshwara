import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { resolveStudioTimeline } from '../../lib/studioProject'
import type {
  StudioTimelineState,
  StudioNode,
  StudioTimelineChannel,
  StudioTimelineEasing,
  StudioTransformKeyframe,
  StudioVec3,
} from '../../lib/studioProject'
import {
  copyStudioTransformKeyframe,
  studioAdjacentTransformKeyframe,
  studioTimelineKeyframes,
  studioProjectTimelineDuration,
  studioTimelinePlaybackRange,
} from '../../lib/studioTimeline'

const CHANNELS: StudioTimelineChannel[] = ['position', 'rotation', 'scale']
const EASINGS: StudioTimelineEasing[] = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'step']
const FPS_OPTIONS = [12, 24, 25, 30, 48, 60]
const AXES = ['X', 'Y', 'Z'] as const

function frameLabel(time: number, fps: number) {
  return `${Math.round(time * fps)}F`
}

export function StudioTimeline({
  nodes,
  selectedNode,
  time,
  playing,
  autoKey,
  onTime,
  onPlaying,
  onAutoKey,
  onAnimationPatch,
  onAddKeyframe,
  onUpdateKeyframe,
  onRemoveKeyframe,
}: {
  nodes: StudioNode[]
  selectedNode: StudioNode | null
  time: number
  playing: boolean
  autoKey: boolean
  onTime: (time: number) => void
  onPlaying: (playing: boolean) => void
  onAutoKey: (enabled: boolean) => void
  onAnimationPatch: (patch: Partial<StudioTimelineState>) => void
  onAddKeyframe: (channel: StudioTimelineChannel, options?: { time?: number; value?: StudioVec3; easing?: StudioTimelineEasing }) => void
  onUpdateKeyframe: (id: string, patch: Partial<Pick<StudioTransformKeyframe, 'time' | 'easing' | 'value' | 'channel'>>) => void
  onRemoveKeyframe: (id: string) => void
}) {
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null)
  const [clipboard, setClipboard] = useState<ReturnType<typeof copyStudioTransformKeyframe>>(null)
  const timeline = selectedNode ? resolveStudioTimeline(selectedNode.timeline) : null
  const duration = timeline?.duration ?? studioProjectTimelineDuration(nodes, 5)
  const fps = timeline?.fps ?? 30
  const selectedKey = timeline?.keyframes.find((keyframe) => keyframe.id === selectedKeyId) ?? null
  const playbackRange = timeline ? studioTimelinePlaybackRange(timeline) : { start: 0, end: duration }
  const rangeStartPercent = duration ? (playbackRange.start / duration) * 100 : 0
  const rangeEndPercent = duration ? (playbackRange.end / duration) * 100 : 100
  const rangeStyle = {
    '--studio-range-start': `${rangeStartPercent}%`,
    '--studio-range-end': `${rangeEndPercent}%`,
  } as CSSProperties

  useEffect(() => setSelectedKeyId(null), [selectedNode?.id])
  useEffect(() => {
    if (selectedKeyId && timeline && !timeline.keyframes.some((keyframe) => keyframe.id === selectedKeyId)) setSelectedKeyId(null)
  }, [selectedKeyId, timeline])

  const channelKeys = useMemo(() => Object.fromEntries(CHANNELS.map((channel) => [channel, timeline ? studioTimelineKeyframes(timeline, channel) : []])) as Record<StudioTimelineChannel, StudioTransformKeyframe[]>, [timeline])

  const step = (direction: -1 | 1) => onTime(Math.min(duration, Math.max(0, time + direction / fps)))
  const updateAxis = (axis: number, next: number) => {
    if (!selectedKey || !Number.isFinite(next)) return
    const value = [...selectedKey.value] as StudioVec3
    value[axis] = next
    onUpdateKeyframe(selectedKey.id, { value })
  }
  const jumpKey = (direction: -1 | 1) => {
    if (!timeline) return
    const key = studioAdjacentTransformKeyframe(timeline, time, direction)
    if (!key) return
    setSelectedKeyId(key.id)
    onTime(key.time)
  }
  const copyKey = () => {
    if (!timeline || !selectedKey) return
    setClipboard(copyStudioTransformKeyframe(timeline, selectedKey.id))
  }
  const pasteKey = () => {
    if (!clipboard) return
    onAddKeyframe(clipboard.channel, { time, value: clipboard.value, easing: clipboard.easing })
  }
  const duplicateKey = () => {
    if (!selectedKey || !timeline) return
    const target = Math.min(timeline.duration, selectedKey.time + 1 / timeline.fps)
    if (timeline.keyframes.some((keyframe) => keyframe.channel === selectedKey.channel && Math.round(keyframe.time * timeline.fps) === Math.round(target * timeline.fps))) return
    onAddKeyframe(selectedKey.channel, { time: target, value: selectedKey.value, easing: selectedKey.easing })
    onTime(target)
  }
  const nudgeKey = (frames: -1 | 1) => {
    if (!selectedKey || !timeline) return
    const target = Math.min(timeline.duration, Math.max(0, selectedKey.time + frames / timeline.fps))
    if (timeline.keyframes.some((keyframe) => keyframe.id !== selectedKey.id && keyframe.channel === selectedKey.channel && Math.round(keyframe.time * timeline.fps) === Math.round(target * timeline.fps))) return
    onUpdateKeyframe(selectedKey.id, { time: target })
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable)) return
      if (event.key === '[') { event.preventDefault(); jumpKey(-1) }
      if (event.key === ']') { event.preventDefault(); jumpKey(1) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  return (
    <section className="studio-timeline" aria-label="Animation timeline">
      <div className="studio-timeline-head">
        <div className="studio-section-title">
          <span>ANIMATION TIMELINE</span>
          <small>{selectedNode ? `${selectedNode.name} · ${timeline?.keyframes.length ?? 0} KEYS` : `${nodes.length} OBJECT SCENE`}</small>
        </div>
        <div className="studio-transport" aria-label="Timeline transport">
          <button type="button" onClick={() => onTime(playbackRange.start)} title="Work-area first frame">|◀</button>
          <button type="button" onClick={() => step(-1)} title="Previous frame">◀</button>
          <button type="button" className={playing ? 'is-active' : ''} onClick={() => onPlaying(!playing)}>{playing ? 'PAUSE' : 'PLAY'}</button>
          <button type="button" onClick={() => step(1)} title="Next frame">▶</button>
          <button type="button" onClick={() => onTime(playbackRange.end)} title="Work-area last frame">▶|</button>
          <output>{time.toFixed(2)}S · {frameLabel(time, fps)}</output>
        </div>
      </div>

      <div className="studio-timeline-scrub" style={rangeStyle}>
        <div className="studio-work-range" aria-hidden="true" />
        <input aria-label="Timeline playhead" type="range" min="0" max={duration} step={1 / fps} value={Math.min(time, duration)} onChange={(event) => onTime(Number(event.currentTarget.value))} />
        <small>WORK AREA {playbackRange.start.toFixed(2)}–{playbackRange.end.toFixed(2)}S · I/O SET IN/OUT</small>
      </div>

      {selectedNode && timeline ? (
        <div className="studio-timeline-body">
          <div className="studio-timeline-settings">
            <label><span>DURATION</span><input type="number" min="0.25" max="120" step="0.25" value={timeline.duration} onChange={(event) => onAnimationPatch({ duration: Number(event.currentTarget.value) || 5 })} /></label>
            <label><span>FPS</span><select value={timeline.fps} onChange={(event) => onAnimationPatch({ fps: Number(event.currentTarget.value) })}>{FPS_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            <label><span>IN</span><input aria-label="Playback range in" type="number" min="0" max={timeline.duration} step={1 / timeline.fps} value={Number(playbackRange.start.toFixed(4))} onChange={(event) => onAnimationPatch({ rangeStart: Number(event.currentTarget.value) })} /></label>
            <label><span>OUT</span><input aria-label="Playback range out" type="number" min="0" max={timeline.duration} step={1 / timeline.fps} value={Number(playbackRange.end.toFixed(4))} onChange={(event) => onAnimationPatch({ rangeEnd: Number(event.currentTarget.value) })} /></label>
            <label className="studio-timeline-check"><input type="checkbox" checked={timeline.loop} onChange={(event) => onAnimationPatch({ loop: event.currentTarget.checked })} /> LOOP RANGE</label>
            <label className="studio-timeline-check studio-auto-key"><input type="checkbox" checked={autoKey} onChange={(event) => onAutoKey(event.currentTarget.checked)} /> AUTO KEY</label>
            <div className="studio-range-actions">
              <button type="button" onClick={() => onAnimationPatch({ rangeStart: Math.min(time, timeline.rangeEnd) })}>SET IN</button>
              <button type="button" onClick={() => onAnimationPatch({ rangeEnd: Math.max(time, timeline.rangeStart) })}>SET OUT</button>
              <button type="button" onClick={() => onAnimationPatch({ rangeStart: 0, rangeEnd: timeline.duration })}>FULL</button>
            </div>
            <div className="studio-add-keys">{CHANNELS.map((channel) => <button key={channel} type="button" onClick={() => onAddKeyframe(channel)}>+ {channel.toUpperCase()}</button>)}</div>
          </div>

          <div className="studio-track-list">
            <div className="studio-key-toolbar">
              <button type="button" onClick={() => jumpKey(-1)}>PREV KEY</button>
              <button type="button" onClick={() => jumpKey(1)}>NEXT KEY</button>
              <button type="button" disabled={!selectedKey} onClick={copyKey}>COPY</button>
              <button type="button" disabled={!clipboard} onClick={pasteKey}>PASTE @ PLAYHEAD</button>
              <button type="button" disabled={!selectedKey} onClick={duplicateKey}>DUP +1F</button>
            </div>
            {CHANNELS.map((channel) => (
              <div className="studio-track-row" key={channel}>
                <strong>{channel.toUpperCase()}</strong>
                <div className="studio-track-rail" style={rangeStyle} onClick={(event) => {
                  if (event.target !== event.currentTarget) return
                  const rect = event.currentTarget.getBoundingClientRect()
                  onTime(((event.clientX - rect.left) / Math.max(1, rect.width)) * duration)
                  setSelectedKeyId(null)
                }}>
                  <div className="studio-track-range" aria-hidden="true" />
                  {channelKeys[channel].map((keyframe) => (
                    <button
                      key={keyframe.id}
                      type="button"
                      className={selectedKeyId === keyframe.id ? 'is-selected' : ''}
                      style={{ left: `${Math.min(100, Math.max(0, (keyframe.time / duration) * 100))}%` }}
                      aria-label={`${channel} keyframe at ${keyframe.time.toFixed(2)} seconds`}
                      title={`${frameLabel(keyframe.time, fps)} · ${keyframe.easing}`}
                      onClick={() => { setSelectedKeyId(keyframe.id); onTime(keyframe.time) }}
                    />
                  ))}
                </div>
                <small>{channelKeys[channel].length}</small>
              </div>
            ))}
          </div>

          {selectedKey ? (
            <div className="studio-key-editor">
              <strong>KEY · {selectedKey.channel.toUpperCase()} · {frameLabel(selectedKey.time, fps)}</strong>
              <label><span>TIME</span><input type="number" min="0" max={duration} step={1 / fps} value={Number(selectedKey.time.toFixed(4))} onChange={(event) => onUpdateKeyframe(selectedKey.id, { time: Number(event.currentTarget.value) })} /></label>
              <label><span>EASING</span><select value={selectedKey.easing} onChange={(event) => onUpdateKeyframe(selectedKey.id, { easing: event.currentTarget.value as StudioTimelineEasing })}>{EASINGS.map((value) => <option key={value} value={value}>{value.toUpperCase()}</option>)}</select></label>
              <div className="studio-key-vector">
                {AXES.map((axis, index) => <label key={axis}><span>{axis}</span><input aria-label={`Key value ${axis}`} type="number" step={selectedKey.channel === 'rotation' ? 0.01 : 0.05} value={Number(selectedKey.value[index].toFixed(4))} onChange={(event) => updateAxis(index, Number(event.currentTarget.value))} /></label>)}
              </div>
              <div className="studio-key-actions">
                <button type="button" onClick={() => nudgeKey(-1)}>−1F</button>
                <button type="button" onClick={() => nudgeKey(1)}>+1F</button>
                <button type="button" onClick={copyKey}>COPY</button>
                <button type="button" onClick={duplicateKey}>DUPLICATE</button>
                <button type="button" className="is-danger" onClick={() => { onRemoveKeyframe(selectedKey.id); setSelectedKeyId(null) }}>DELETE KEY</button>
              </div>
            </div>
          ) : <p className="studio-timeline-hint">SPACE PLAY · K KEY MODE · I/O WORK RANGE · [ / ] PREV/NEXT KEY · ROTATIONS USE SHORTEST-PATH QUATERNION INTERPOLATION</p>}
        </div>
      ) : (
        <p className="studio-timeline-empty">Select an object to author transform animation. Existing imported GLB clips continue to use the Inspector clip controls.</p>
      )}
    </section>
  )
}
