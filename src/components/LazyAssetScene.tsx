import { Component, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import type { AssetInteraction, AssetPresentation, AssetSceneKind } from '../lib/types'
import { AssetScene } from './AssetScene'

class PreviewErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(_error: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.failed) return <div className="scene-error" role="status"><span>PREVIEW RECOVERY</span><small>Open the asset page or download the verified ZIP.</small></div>
    return this.props.children
  }
}

export function LazyAssetScene({ kind, priority = false, presentation = 'Floating', interaction = 'Pointer' }: { kind: AssetSceneKind; priority?: boolean; presentation?: AssetPresentation; interaction?: AssetInteraction }) {
  const host = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(priority)

  useEffect(() => {
    const node = host.current
    if (!node || priority || typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '760px 0px', threshold: 0.01 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [priority])

  return (
    <div ref={host} className="lazy-scene-host" data-preview-state={active ? 'live' : 'queued'}>
      <div className="scene-skeleton" aria-hidden="true" />
      {active && <PreviewErrorBoundary><AssetScene kind={kind} compact={!priority} presentation={presentation} interaction={interaction} /></PreviewErrorBoundary>}
    </div>
  )
}
