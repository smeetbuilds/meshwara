import { useEffect, useState } from 'react'
import type { AssetRecord } from '../lib/types'
import type { AssetPreviewMotion, AssetPreviewQuality } from './AssetScene'
import { ArrowDown, ArrowUpRight } from './Icons'
import '../styles/developer-workbench.css'

export type PreviewStageTheme = 'light' | 'dark'

export interface PreviewSettings {
  motion: AssetPreviewMotion
  pointer: boolean
  quality: AssetPreviewQuality
  stage: PreviewStageTheme
}

export const defaultPreviewSettings: PreviewSettings = {
  motion: 'live',
  pointer: true,
  quality: 'crisp',
  stage: 'light',
}

type IntegrityEntry = {
  slug: string
  file: string
  bytes: number
  sha256: string
}

type DownloadManifest = {
  assets: IntegrityEntry[]
}

function toComponentName(name: string) {
  return name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '—'
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} KB`
  return `${(kb / 1024).toFixed(2)} MB`
}

async function copyText(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)
  if (!copied) throw new Error('Clipboard copy failed')
}

function Segment<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: Array<{ value: T; label: string; disabled?: boolean }>
  onChange: (value: T) => void
}) {
  return (
    <div className="preview-segment">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          disabled={option.disabled}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export function AssetPreviewControls({
  value,
  onChange,
  supportsPointer,
}: {
  value: PreviewSettings
  onChange: (next: PreviewSettings) => void
  supportsPointer: boolean
}) {
  const update = <K extends keyof PreviewSettings>(key: K, nextValue: PreviewSettings[K]) => {
    onChange({ ...value, [key]: nextValue })
  }

  return (
    <div className="preview-controlbar" aria-label="Live preview controls">
      <div className="preview-controlgroup">
        <span className="preview-control-label">Motion</span>
        <Segment
          value={value.motion}
          options={[
            { value: 'live', label: 'Live' },
            { value: 'paused', label: 'Pause' },
          ]}
          onChange={(next) => update('motion', next)}
        />
      </div>

      <div className="preview-controlgroup">
        <span className="preview-control-label">Input</span>
        <Segment
          value={value.pointer ? 'pointer' : 'locked'}
          options={[
            { value: 'pointer', label: supportsPointer ? 'Pointer' : 'Idle', disabled: !supportsPointer },
            { value: 'locked', label: 'Locked' },
          ]}
          onChange={(next) => update('pointer', next === 'pointer')}
        />
      </div>

      <div className="preview-controlgroup">
        <span className="preview-control-label">Render</span>
        <Segment
          value={value.quality}
          options={[
            { value: 'efficient', label: 'Efficient' },
            { value: 'balanced', label: 'Balanced' },
            { value: 'crisp', label: 'Crisp' },
          ]}
          onChange={(next) => update('quality', next)}
        />
      </div>

      <div className="preview-controlgroup">
        <span className="preview-control-label">Stage</span>
        <Segment
          value={value.stage}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ]}
          onChange={(next) => update('stage', next)}
        />
      </div>
    </div>
  )
}

export function AssetDeveloperPanel({ asset }: { asset: AssetRecord }) {
  const [framework, setFramework] = useState<'react' | 'next'>('react')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [integrity, setIntegrity] = useState<IntegrityEntry | null>(null)
  const [integrityState, setIntegrityState] = useState<'loading' | 'ready' | 'error'>('loading')

  const componentName = toComponentName(asset.name)
  const installCommand = 'bun add three@0.185.1 @react-three/fiber@9.7.0 @react-three/drei@10.7.7 react@19.2.8'
  const sourceHref = asset.sourceType === 'Model'
    ? `https://github.com/smeetbuilds/meshwara/tree/main/public/models/${asset.slug}`
    : `https://github.com/smeetbuilds/meshwara/blob/main/src/components/scenes/${asset.scene}.tsx`

  const usageCode = framework === 'next'
    ? `'use client'\n\nimport { ${componentName} } from '@/components/three/${asset.slug}'\n\nexport function HeroVisual() {\n  return (\n    <div style={{ width: '100%', height: 'min(72vh, 760px)' }}>\n      <${componentName} />\n    </div>\n  )\n}`
    : `import { ${componentName} } from './three/${asset.slug}'\n\nexport function HeroVisual() {\n  return (\n    <div style={{ width: '100%', height: 'min(72vh, 760px)' }}>\n      <${componentName} />\n    </div>\n  )\n}`

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10_000)
    setIntegrityState('loading')

    fetch('/downloads/manifest.json', { cache: 'force-cache', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Manifest request failed with ${response.status}`)
        return response.json() as Promise<DownloadManifest>
      })
      .then((manifest) => {
        if (!active) return
        const entry = manifest.assets.find((item) => item.slug === asset.slug)
        if (!entry) throw new Error(`No manifest entry for ${asset.slug}`)
        setIntegrity(entry)
        setIntegrityState('ready')
      })
      .catch(() => {
        if (!active) return
        setIntegrity(null)
        setIntegrityState('error')
      })
      .finally(() => window.clearTimeout(timeout))

    return () => {
      active = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [asset.slug])

  const handleCopy = async (key: string, text: string) => {
    try {
      await copyText(text)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((current) => current === key ? null : current), 1600)
    } catch {
      setCopiedKey('error')
      window.setTimeout(() => setCopiedKey((current) => current === 'error' ? null : current), 1800)
    }
  }

  const checksum = integrity?.sha256 ?? ''
  const archiveMeta = integrityState === 'ready' && integrity
    ? `${formatBytes(integrity.bytes)} / SHA-256 verified`
    : integrityState === 'loading'
      ? 'Checking manifest…'
      : 'Manifest unavailable'

  return (
    <section className="developer-workbench page-pad" id="developer-workbench">
      <div className="workbench-intro">
        <div>
          <p className="section-label">DEVELOPER HANDOFF</p>
          <h2>Preview. Copy. Ship.</h2>
        </div>
        <p>
          Download the self-contained source pack, copy the exact runtime dependencies, and verify the archive against the published checksum before you ship it.
        </p>
      </div>

      <div className="workbench-grid">
        <div className="workbench-main">
          <div className="workbench-tabs" role="group" aria-label="Integration framework">
            <button
              type="button"
              aria-pressed={framework === 'react'}
              onClick={() => setFramework('react')}
            >
              React / Vite
            </button>
            <button
              type="button"
              aria-pressed={framework === 'next'}
              onClick={() => setFramework('next')}
            >
              Next.js
            </button>
          </div>

          <div className="code-panel workbench-code">
            <div className="code-top">
              <span>{framework === 'next' ? 'Next.js client component' : 'React component'}</span>
              <button type="button" onClick={() => handleCopy('usage', usageCode)}>
                {copiedKey === 'usage' ? 'Copied' : 'Copy code'}
              </button>
            </div>
            <pre><code>{usageCode}</code></pre>
          </div>

          <div className="install-strip">
            <div>
              <span>INSTALL EXACT RUNTIME</span>
              <code>{installCommand}</code>
            </div>
            <button type="button" onClick={() => handleCopy('install', installCommand)}>
              {copiedKey === 'install' ? 'Copied' : 'Copy install'}
            </button>
          </div>
        </div>

        <aside className="delivery-panel">
          <div className="delivery-panel-head">
            <span>DELIVERY / {asset.index}</span>
            <strong>{asset.name}</strong>
          </div>

          <div className="delivery-row">
            <span>Archive</span>
            <strong>{archiveMeta}</strong>
          </div>
          <div className="delivery-row">
            <span>Source</span>
            <strong>{asset.sourceType.toUpperCase()}</strong>
          </div>
          <div className="delivery-row">
            <span>Formats</span>
            <strong>{asset.formats.join(' / ').toUpperCase()}</strong>
          </div>
          <div className="delivery-row">
            <span>License</span>
            <strong>MIT / COMMERCIAL OK</strong>
          </div>

          <div className="integrity-card" aria-live="polite">
            <span>SHA-256</span>
            <code>
              {integrityState === 'ready' && checksum
                ? checksum
                : integrityState === 'loading'
                  ? 'Reading public download manifest…'
                  : 'Checksum could not be loaded in this session.'}
            </code>
            <button
              type="button"
              disabled={!checksum}
              onClick={() => checksum && handleCopy('checksum', checksum)}
            >
              {copiedKey === 'checksum' ? 'Checksum copied' : 'Copy checksum'}
            </button>
          </div>

          <div className="delivery-actions">
            <a className="delivery-primary" href={asset.download} download>
              <span>Download source ZIP</span>
              <ArrowDown />
            </a>
            <a className="delivery-secondary" href={sourceHref} target="_blank" rel="noreferrer">
              <span>Inspect source</span>
              <ArrowUpRight />
            </a>
          </div>

          <p className="copy-status" aria-live="polite">
            {copiedKey === 'error' ? 'Clipboard access failed. Select and copy the visible code manually.' : 'No account, token, payment, or email gate.'}
          </p>
        </aside>
      </div>
    </section>
  )
}