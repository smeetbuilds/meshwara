import { useEffect, useMemo, useState } from 'react'
import { resolveStudioTimeline } from '../../lib/studioProject'
import type {
  StudioTimelineState,
  StudioNode,
  StudioTimelineChannel,
  StudioTimelineEasing,
  StudioTransformKeyframe,
} from '../../lib/studioProject'
import { studioTimelineKeyframes, studioProjectTimelineDuration } from '../../lib/studioTimeline'

const CHANNELS: StudioTimelineChannel[] = ['position', 'rotation', 'scale']
const EASINGS: StudioTimelineEasing[] = ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'step']
const FPS_OPTIONS = [12, 24, 25, 30, 48, 60]

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
  onAddKeyframe: (channel: StudioTimelineChannel) => void
  onUpdateKeyframe: (id: string, patch: Partial<Pick<StudioTransformKeyframe, 'time' | 'easing' | 'value' | 'channel'>>) => void
  onRemoveKeyframe: (id: string) => void
}) {
  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null)
  const timeline = selectedNode ? resolveStudioTimeline(selectedNode.timeline) : null
  const duration = timeline?.duration ?? studioProjectTimelineDuration(nodes, 5)
  const fps = timeline?.fps ?? 30
  const selectedKey = timeline?.keyframes.find((keyframe) => keyframe.id === selectedKeyId) ?? null

  useEffect(() => setSelectedKeyId(null), [selectedNode?.id])

  const channelKeys = useMemo(() => Object.fromEntries(CHANNELS.map((channel) => [channel, timeline ? studioTimelineKeyframes(timeline, channel) : []])) as Record<StudioTimelineChannel, StudioTransformKeyframe[]>, [timeline])

  const step = (direction: -1 | 1) => onTime(Math.min(duration, Math.max(0, time + direction / fps)))

  return (
    <section className="studio-timeline" aria-label="Animation timeline">
      <div className="studio-timeline-head">
        <div className="studio-section-title">
          <span>ANIMATION TIMELINE</span>
          <small>{selectedNode ? `${selectedNode.name} · ${timeline?.keyframes.length ?? 0} KEYS` : `${nodes.length} OBJECT SCENE`}</small>
        </div>
        <div className="studio-transport" aria-label="Timeline transport">
          <button type="button" onClick={() => onTime(0)} title="First frame">|◀</button>
          <button type="button" onClick={() => step(-1)} title="Previous frame">◀</button>
          <button type="button" className={playing ? 'is-active' : ''} onClick={() => onPlaying(!playing)}>{playing ? 'PAUSE' : 'PLAY'}</button>
          <button type="button" onClick={() => step(1)} title="Next frame">▶</button>
          <button type="button" onClick={() => onTime(duration)} title="Last frame">▶|</button>
          <output>{time.toFixed(2)}S · {frameLabel(time, fps)}</output>
        </div>
      </div>

      <div className="studio-timeline-scrub">
        <input aria-label="Timeline playhead" type="range" min="0" max={duration} step={1 / fps} value={Math.min(time, duration)} onChange={(event) => onTime(Number(event.currentTarget.value))} />
      </div>

      {selectedNode && timeline ? (
        <div className="studio-timeline-body">
          <div className="studio-timeline-settings">
            <label><span>DURATION</span><input type="number" min="0.25" max="120" step="0.25" value={timeline.duration} onChange={(event) => onAnimationPatch({ duration: Number(event.currentTarget.value) || 5 })} /></label>
            <label><span>FPS</span><select value={timeline.fps} onChange={(event) => onAnimationPatch({ fps: Number(event.currentTarget.value) })}>{FPS_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            <label className="studio-timeline-check"><input type="checkbox" checked={timeline.loop} onChange={(event) => onAnimationPatch({ loop: event.currentTarget.checked })} /> LOOP</label>
            <label className="studio-timeline-check studio-auto-key"><input type="checkbox" checked={autoKey} onChange={(event) => onAutoKey(event.currentTarget.checked)} /> AUTO KEY</label>
            <div className="studio-add-keys">{CHANNELS.map((channel) => <button key={channel} type="button" onClick={() => onAddKeyframe(channel)}>+ {channel.toUpperCase()}</button>)}</div>
          </div>

          <div className="studio-track-list">
            {CHANNELS.map((channel) => (
              <div className="studio-track-row" key={channel}>
                <strong>{channel.toUpperCase()}</strong>
                <div className="studio-track-rail" onClick={(event) => {
                  if (event.target !== event.currentTarget) return
                  const rect = event.currentTarget.getBoundingClientRect()
                  onTime(((event.clientX - rect.left) / Math.max(1, rect.width)) * duration)
                }}>
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
              <strong>KEY · {selectedKey.channel.toUpperCase()}</strong>
              <label><span>TIME</span><input type="number" min="0" max={duration} step={1 / fps} value={Number(selectedKey.time.toFixed(4))} onChange={(event) => onUpdateKeyframe(selectedKey.id, { time: Number(event.currentTarget.value) })} /></label>
              <label><span>EASING</span><select value={selectedKey.easing} onChange={(event) => onUpdateKeyframe(selectedKey.id, { easing: event.currentTarget.value as StudioTimelineEasing })}>{EASINGS.map((value) => <option key={value} value={value}>{value.toUpperCase()}</option>)}</select></label>
              <button type="button" onClick={() => { onRemoveKeyframe(selectedKey.id); setSelectedKeyId(null) }}>DELETE KEY</button>
            </div>
          ) : <p className="studio-timeline-hint">SPACE · PLAY/PAUSE &nbsp; K · KEY CURRENT TRANSFORM MODE &nbsp; CLICK A DIAMOND TO EDIT</p>}
        </div>
      ) : (
        <p className="studio-timeline-empty">Select an object to author transform animation. Existing imported GLB clips continue to use the Inspector clip controls.</p>
      )}
    </section>
  )
}
