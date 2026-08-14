import { useEffect, useMemo, useRef, useState } from 'react'
import type { AssetRecord } from '../lib/types'
import {
  assetCustomizationRanges,
  defaultAssetCustomization,
  getAssetCustomizationDefinition,
  getAssetCustomizationPreset,
  identifyAssetCustomizationPreset,
  resolveAssetCustomization,
  type AssetCustomization,
} from '../lib/assetCustomization'
import { decodePlaygroundState, encodePlaygroundState, playgroundRanges } from '../lib/playgroundState'
import { AssetPreviewControls, defaultPreviewSettings, type PreviewSettings } from './AssetDeveloperWorkbench'
import { defaultAssetSceneTuning, type AssetSceneTuning } from './AssetScene'
import '../styles/asset-playground.css'
import '../styles/asset-customization.css'

export interface AssetPlaygroundSettings {
  tuning: AssetSceneTuning
  background: string
  customization: AssetCustomization
}

export const defaultAssetPlaygroundSettings: AssetPlaygroundSettings = {
  tuning: { ...defaultAssetSceneTuning },
  background: '',
  customization: { ...defaultAssetCustomization },
}

export function createDefaultAssetPlaygroundSettings(scene: AssetRecord['scene']): AssetPlaygroundSettings {
  return {
    tuning: { ...defaultAssetSceneTuning },
    background: '',
    customization: resolveAssetCustomization(scene),
  }
}

type CodeView = 'preset' | 'recipe'

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

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  unit,
  disabled = false,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  disabled?: boolean
  onChange: (value: number) => void
}) {
  return (
    <label className={`playground-range${disabled ? ' is-disabled' : ''}`}>
      <span>
        <b>{label}</b>
        <output>{Number.isInteger(step) ? value.toFixed(0) : value.toFixed(2)}{unit ?? ''}</output>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
    </label>
  )
}

export function AssetPlayground({
  asset,
  preview,
  onPreviewChange,
  value,
  onChange,
}: {
  asset: AssetRecord
  preview: PreviewSettings
  onPreviewChange: (next: PreviewSettings) => void
  value: AssetPlaygroundSettings
  onChange: (next: AssetPlaygroundSettings) => void
}) {
  const [codeView, setCodeView] = useState<CodeView>('preset')
  const [status, setStatus] = useState('Live changes are applied to the preview above.')
  const appliedShareSlug = useRef<string | null>(null)
  const supportsPointer = asset.interaction === 'Pointer'
  const supportsFloat = (asset.presentation ?? 'Floating') === 'Floating'
  const customizationDefinition = useMemo(() => getAssetCustomizationDefinition(asset.scene), [asset.scene])
  const activeCustomizationPreset = useMemo(
    () => identifyAssetCustomizationPreset(asset.scene, value.customization),
    [asset.scene, value.customization],
  )

  useEffect(() => {
    if (typeof window === 'undefined' || appliedShareSlug.current === asset.slug) return
    appliedShareSlug.current = asset.slug
    const encoded = new URL(window.location.href).searchParams.get('play')
    if (!encoded) {
      onPreviewChange({ ...defaultPreviewSettings, pointer: supportsPointer })
      onChange(createDefaultAssetPlaygroundSettings(asset.scene))
      setStatus('Live changes are applied to the preview above.')
      return
    }

    const sharedState = decodePlaygroundState(encoded, asset.slug, supportsPointer, asset.scene)
    const shared = sharedState ? {
      preview: {
        motion: sharedState.motion,
        pointer: sharedState.pointer,
        quality: sharedState.quality,
        stage: sharedState.stage,
      } satisfies PreviewSettings,
      playground: {
        tuning: {
          cameraFov: sharedState.cameraFov,
          cameraZoom: sharedState.cameraZoom,
          exposure: sharedState.exposure,
          pointerStrength: sharedState.pointerStrength,
          floatSpeed: sharedState.floatSpeed,
          floatIntensity: sharedState.floatIntensity,
          rotationY: sharedState.rotationY,
        },
        background: sharedState.background,
        customization: sharedState.customization,
      } satisfies AssetPlaygroundSettings,
    } : null
    if (!shared) {
      onPreviewChange({ ...defaultPreviewSettings, pointer: supportsPointer })
      onChange(createDefaultAssetPlaygroundSettings(asset.scene))
      setStatus('The URL preset belongs to a different asset, so authored defaults were restored.')
      return
    }
    onPreviewChange(shared.preview)
    onChange(shared.playground)
    setStatus('Shared playground preset loaded from this URL.')
  }, [asset.scene, asset.slug, onChange, onPreviewChange, supportsPointer])

  const preset = useMemo(() => ({
    version: 2,
    asset: asset.slug,
    scene: asset.scene,
    presentation: asset.presentation ?? 'Floating',
    interaction: asset.interaction,
    preview,
    tuning: value.tuning,
    customization: value.customization,
    background: value.background || null,
  }), [asset, preview, value])

  const presetJson = useMemo(() => JSON.stringify(preset, null, 2), [preset])
  const recipeCode = useMemo(() => {
    const tuning = JSON.stringify(value.tuning, null, 2)
    const customization = JSON.stringify(value.customization, null, 2)
    const background = value.background || (preview.stage === 'dark' ? '#101112' : '#dedbd4')
    return `import { AssetScene } from './components/AssetScene'\n\nconst tuning = ${tuning} as const\nconst customization = ${customization} as const\n\nexport function ${asset.name.replace(/[^a-zA-Z0-9]+/g, '')}Playground() {\n  return (\n    <div style={{ position: 'relative', minHeight: 560, background: '${background}' }}>\n      <AssetScene\n        kind="${asset.scene}"\n        presentation="${asset.presentation ?? 'Floating'}"\n        interaction="${asset.interaction}"\n        motion="${preview.motion}"\n        pointerEnabled={${preview.pointer}}\n        quality="${preview.quality}"\n        tuning={tuning}\n        customization={customization}\n      />\n    </div>\n  )\n}`
  }, [asset, preview, value])

  const updateTuning = <K extends keyof AssetSceneTuning>(key: K, next: AssetSceneTuning[K]) => {
    onChange({ ...value, tuning: { ...value.tuning, [key]: next } })
  }

  const updateCustomization = <K extends keyof AssetCustomization>(key: K, next: AssetCustomization[K]) => {
    onChange({ ...value, customization: resolveAssetCustomization(asset.scene, { ...value.customization, [key]: next }) })
  }

  const applyCustomizationPreset = (presetId: string) => {
    const next = getAssetCustomizationPreset(asset.scene, presetId)
    if (!next) return
    onChange({ ...value, customization: next })
    setStatus(`${customizationDefinition?.presets.find((item) => item.id === presetId)?.label ?? 'Material'} preset applied.`)
  }

  const reset = () => {
    onPreviewChange({ ...defaultPreviewSettings, pointer: supportsPointer })
    onChange(createDefaultAssetPlaygroundSettings(asset.scene))
    setStatus('Playground reset to the authored MESHVARA presentation.')
  }

  const copy = async (text: string, success: string) => {
    try {
      await copyText(text)
      setStatus(success)
    } catch {
      setStatus('Clipboard access failed. The preset and code remain selectable below.')
    }
  }

  const copyShareLink = async () => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set('play', encodePlaygroundState({
      assetSlug: asset.slug,
      motion: preview.motion,
      pointer: preview.pointer,
      quality: preview.quality,
      stage: preview.stage,
      ...value.tuning,
      background: value.background,
      customization: value.customization,
    }))
    url.hash = 'playground'
    await copy(url.toString(), 'Share link copied. It restores scene, material and presentation state.')
  }

  const exportPreset = () => {
    if (typeof document === 'undefined') return
    const blob = new Blob([presetJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${asset.slug}.meshvara-preset.json`
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
    setStatus('Preset JSON exported locally. No server upload was used.')
  }

  const activeCode = codeView === 'preset' ? presetJson : recipeCode

  return (
    <section className="asset-playground page-pad" id="playground">
      <div className="playground-intro">
        <div>
          <p className="section-label">PLAYGROUND / LIVE RECIPE</p>
          <h2>Tune the scene. Keep the source.</h2>
        </div>
        <p>
          These controls drive the same WebGL preview above. Nothing is uploaded and no second canvas is created; presets can be copied, exported, or encoded into a shareable URL.
        </p>
      </div>

      <AssetPreviewControls value={preview} onChange={onPreviewChange} supportsPointer={supportsPointer} />

      <div className="playground-shell">
        <div className="playground-controls">
          <div className="playground-control-section">
            <div className="playground-section-head"><span>01 / CAMERA + LIGHT</span><small>Presentation-level tuning</small></div>
            <RangeControl label="Field of view" value={value.tuning.cameraFov} min={playgroundRanges.cameraFov[0]} max={playgroundRanges.cameraFov[1]} step={1} unit="°" onChange={(next) => updateTuning('cameraFov', next)} />
            <RangeControl label="Camera zoom" value={value.tuning.cameraZoom} min={playgroundRanges.cameraZoom[0]} max={playgroundRanges.cameraZoom[1]} step={0.01} onChange={(next) => updateTuning('cameraZoom', next)} />
            <RangeControl label="Exposure" value={value.tuning.exposure} min={playgroundRanges.exposure[0]} max={playgroundRanges.exposure[1]} step={0.01} onChange={(next) => updateTuning('exposure', next)} />
          </div>

          <div className="playground-control-section">
            <div className="playground-section-head"><span>02 / MOTION + ORIENTATION</span><small>{supportsFloat ? 'Floating presentation' : 'Float controls not used by this asset'}</small></div>
            <RangeControl label="Pointer response" value={value.tuning.pointerStrength} min={playgroundRanges.pointerStrength[0]} max={playgroundRanges.pointerStrength[1]} step={0.05} disabled={!supportsPointer} onChange={(next) => updateTuning('pointerStrength', next)} />
            <RangeControl label="Float speed" value={value.tuning.floatSpeed} min={playgroundRanges.floatSpeed[0]} max={playgroundRanges.floatSpeed[1]} step={0.02} disabled={!supportsFloat} onChange={(next) => updateTuning('floatSpeed', next)} />
            <RangeControl label="Float amount" value={value.tuning.floatIntensity} min={playgroundRanges.floatIntensity[0]} max={playgroundRanges.floatIntensity[1]} step={0.01} disabled={!supportsFloat} onChange={(next) => updateTuning('floatIntensity', next)} />
            <RangeControl label="Y orientation" value={value.tuning.rotationY} min={playgroundRanges.rotationY[0]} max={playgroundRanges.rotationY[1]} step={1} unit="°" onChange={(next) => updateTuning('rotationY', next)} />
          </div>

          <div className="playground-control-section playground-customization">
            <div className="playground-section-head"><span>03 / MATERIAL + FORM</span><small>{customizationDefinition ? 'Typed / pack-compatible' : 'Authored source only'}</small></div>
            {customizationDefinition ? (
              <>
                <label className="playground-select-field"><span>Preset</span><select value={activeCustomizationPreset ?? 'custom'} onChange={(event) => applyCustomizationPreset(event.currentTarget.value)}><option value="custom" disabled>Custom</option>{customizationDefinition.presets.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
                <label className="playground-select-field"><span>Palette</span><select value={value.customization.palette} onChange={(event) => updateCustomization('palette', event.currentTarget.value as AssetCustomization['palette'])}><option value="authored">Authored materials</option><option value="mono">Monochrome</option><option value="duotone">Duotone</option></select></label>
                <div className="playground-material-colors" aria-label="Material palette colors">
                  <label><span>Primary</span><input type="color" value={value.customization.primaryColor} disabled={value.customization.palette === 'authored'} onChange={(event) => updateCustomization('primaryColor', event.currentTarget.value)} /><code>{value.customization.primaryColor}</code></label>
                  <label><span>Secondary</span><input type="color" value={value.customization.secondaryColor} disabled={value.customization.palette !== 'duotone'} onChange={(event) => updateCustomization('secondaryColor', event.currentTarget.value)} /><code>{value.customization.secondaryColor}</code></label>
                </div>
                <RangeControl label="Roughness" value={value.customization.roughnessScale} min={assetCustomizationRanges.roughnessScale[0]} max={assetCustomizationRanges.roughnessScale[1]} step={assetCustomizationRanges.roughnessScale[2]} unit="×" onChange={(next) => updateCustomization('roughnessScale', next)} />
                <RangeControl label="Metalness" value={value.customization.metalnessScale} min={assetCustomizationRanges.metalnessScale[0]} max={assetCustomizationRanges.metalnessScale[1]} step={assetCustomizationRanges.metalnessScale[2]} unit="×" onChange={(next) => updateCustomization('metalnessScale', next)} />
                <RangeControl label="Emissive" value={value.customization.emissiveScale} min={assetCustomizationRanges.emissiveScale[0]} max={assetCustomizationRanges.emissiveScale[1]} step={assetCustomizationRanges.emissiveScale[2]} unit="×" onChange={(next) => updateCustomization('emissiveScale', next)} />
                <RangeControl label="Opacity" value={value.customization.opacity} min={assetCustomizationRanges.opacity[0]} max={assetCustomizationRanges.opacity[1]} step={assetCustomizationRanges.opacity[2]} onChange={(next) => updateCustomization('opacity', next)} />
                <RangeControl label="Object scale" value={value.customization.geometryScale} min={assetCustomizationRanges.geometryScale[0]} max={assetCustomizationRanges.geometryScale[1]} step={assetCustomizationRanges.geometryScale[2]} unit="×" onChange={(next) => updateCustomization('geometryScale', next)} />
                <label className="playground-check"><input type="checkbox" checked={value.customization.wireframe} onChange={(event) => updateCustomization('wireframe', event.currentTarget.checked)} /> Wireframe materials</label>
              </>
            ) : <p className="playground-customization-note">This asset keeps its authored material system unchanged. Typed deep controls are being rolled out scene-by-scene rather than exposing fake knobs that do not map to source.</p>}
          </div>

          <div className="playground-control-section playground-backdrop">
            <div className="playground-section-head"><span>04 / BACKDROP</span><small>{value.background ? 'Custom stage color' : `${preview.stage} stage preset`}</small></div>
            <div className="playground-color-row">
              <input type="color" aria-label="Custom stage color" value={value.background || (preview.stage === 'dark' ? '#101112' : '#dedbd4')} onChange={(event) => onChange({ ...value, background: event.currentTarget.value })} />
              <code>{value.background || 'THEME PRESET'}</code>
              <button type="button" disabled={!value.background} onClick={() => onChange({ ...value, background: '' })}>Use theme</button>
            </div>
          </div>

          <div className="playground-actions">
            <button type="button" onClick={reset}>Reset authored view</button>
            <button type="button" onClick={() => copy(presetJson, 'Preset JSON copied.')}>Copy preset</button>
            <button type="button" onClick={copyShareLink}>Copy share link</button>
            <button type="button" onClick={exportPreset}>Export JSON</button>
          </div>
          <p className="playground-status" aria-live="polite">{status}</p>
        </div>

        <div className="playground-code">
          <div className="playground-code-tabs" role="tablist" aria-label="Playground code view">
            <button type="button" role="tab" aria-selected={codeView === 'preset'} onClick={() => setCodeView('preset')}>Preset JSON</button>
            <button type="button" role="tab" aria-selected={codeView === 'recipe'} onClick={() => setCodeView('recipe')}>R3F recipe</button>
          </div>
          <div className="code-panel playground-code-panel">
            <div className="code-top"><span>{codeView === 'preset' ? 'meshvara-preset.json' : 'repository preview recipe'}</span><button type="button" onClick={() => copy(activeCode, codeView === 'preset' ? 'Preset JSON copied.' : 'R3F recipe copied.')}>Copy</button></div>
            <pre><code>{activeCode}</code></pre>
          </div>
          <p className="playground-code-note">
            Curated material controls use the same typed customization contract as Studio and generated component packs. Non-curated assets remain source-authored until an explicit contract is available.
          </p>
        </div>
      </div>
    </section>
  )
}
