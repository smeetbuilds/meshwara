import { Component, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import type { AssetInteraction, AssetPresentation, AssetSceneKind } from '../lib/types'
import { AssetScene } from './AssetScene'

export class PreviewErrorBoundary extends Component<{ children: ReactNode; detail?: boolean }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    const report = (globalThis as typeof globalThis & { reportError?: (error: unknown) => void }).reportError
    if (typeof report === 'function') report(error)
    else console.error('Meshvara asset preview failed.', error, info.componentStack)
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="scene-error" role="status">
          <span>Preview unavailable</span>
          <small>{this.props.detail ? 'Asset details and source download remain available below.' : 'Open the asset page to view details or download the source.'}</small>
        </div>
      )
    }
    return this.props.children
  }
}

export function LazyAssetScene({
  kind,
  enabled = false,
  priority = false,
  presentation = 'Floating',
  interaction = 'Pointer',
}: {
  kind: AssetSceneKind
  enabled?: boolean
  priority?: boolean
  presentation?: AssetPresentation
  interaction?: AssetInteraction
}) {
  const host = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(priority)

  useEffect(() => {
    const node = host.current
    if (!node || priority || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.01 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [priority])

  const active = enabled && inView

  return (
    <div ref={host} className="lazy-scene-host" data-preview-state={active ? 'live' : enabled ? 'waiting' : 'idle'}>
      <div className="scene-skeleton" aria-hidden="true" />
      {active && (
        <PreviewErrorBoundary>
          <AssetScene
            kind={kind}
            compact={!priority}
            presentation={presentation}
            interaction={interaction}
          />
        </PreviewErrorBoundary>
      )}
    </div>
  )
}