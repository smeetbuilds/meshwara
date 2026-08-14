import { useState, type CSSProperties } from 'react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { AssetDeveloperPanel, AssetPreviewControls, defaultPreviewSettings } from '../../components/AssetDeveloperWorkbench'
import { AssetPlayground, defaultAssetPlaygroundSettings } from '../../components/AssetPlayground'
import { AssetScene } from '../../components/AssetScene'
import { ArrowDown, ArrowUpRight } from '../../components/Icons'
import { assets, getAsset, getAssetSubcategory } from '../../data/assets'
import { brand } from '../../data/brand'

export const Route = createFileRoute('/assets/$slug')({
  loader: ({ params }) => {
    const asset = getAsset(params.slug)
    if (!asset) throw notFound()
    return asset
  },
  component: AssetDetail,
})

function AssetDetail() {
  const asset = Route.useLoaderData()
  const [preview, setPreview] = useState(() => ({ ...defaultPreviewSettings, pointer: asset.interaction === 'Pointer' }))
  const [playground, setPlayground] = useState(() => ({ ...defaultAssetPlaygroundSettings, tuning: { ...defaultAssetPlaygroundSettings.tuning } }))
  const assetSubcategory = getAssetSubcategory(asset)
  const sameType = assets.filter((item) => item.slug !== asset.slug && item.category === asset.category && getAssetSubcategory(item) === assetSubcategory)
  const sameCategory = assets.filter((item) => item.slug !== asset.slug && item.category === asset.category && getAssetSubcategory(item) !== assetSubcategory)
  const related = [...sameType, ...sameCategory].slice(0, 3)
  const interactionLabel = asset.interaction === 'Pointer' ? 'INTERACTIVE' : 'ANIMATED'
  const detailLabel = asset.complexity === 'Light' ? 'LIGHTWEIGHT' : asset.complexity === 'Cinematic' ? 'HIGH DETAIL' : 'BALANCED'
  const sourceLabel = asset.sourceType === 'Procedural' ? 'CODE' : asset.sourceType === 'Hybrid' ? 'CODE + MATERIALS' : asset.sourceType === 'Shader' ? 'SHADER' : 'MODEL'
  const previewStateLabel = preview.motion === 'paused' ? 'PAUSED' : asset.interaction !== 'Pointer' ? 'IDLE' : preview.pointer ? 'MOVE POINTER' : 'LOCKED'
  const stageStyle = playground.background ? ({ '--playground-stage': playground.background } as CSSProperties) : undefined

  return (
    <article className="detail-page" style={{ '--asset-accent': asset.accent } as CSSProperties}>
      <section className="detail-hero page-pad">
        <div className="detail-topline"><span>{brand.name} / {asset.index} / {asset.category.toUpperCase()} / {assetSubcategory.toUpperCase()}</span><span>{detailLabel}</span></div>
        <div className="detail-title"><h1>{asset.name}</h1><p>{asset.blurb}</p></div>
        <div>
          <div className="detail-stage" data-stage-theme={preview.stage} data-custom-stage={playground.background ? 'true' : 'false'} style={stageStyle}>
            <div className="asset-gridlines" />
            <AssetScene kind={asset.scene} presentation={asset.presentation} interaction={asset.interaction} motion={preview.motion} pointerEnabled={preview.pointer} quality={preview.quality} tuning={playground.tuning} />
            <div className="viewer-hud"><span>{brand.name} / 3D PREVIEW / {sourceLabel}</span><span>{previewStateLabel} / {preview.quality.toUpperCase()} / {playground.tuning.exposure.toFixed(2)} EXP</span></div>
          </div>
          <AssetPreviewControls value={preview} onChange={setPreview} supportsPointer={asset.interaction === 'Pointer'} />
          <div className="asset-workflow-links">
            <a className="playground-jump" href="#playground"><span>Open advanced playground</span><span>Camera / light / motion / share ↓</span></a>
            <Link className="playground-jump" to="/studio" search={{ asset: asset.slug }}><span>Compose in Meshvara Studio</span><span>Scene / transforms / local project ↗</span></Link>
          </div>
        </div>
        <a className="scroll-cue" href="#asset-info"><ArrowDown /> OBJECT DETAILS</a>
      </section>

      <section className="asset-info page-pad" id="asset-info">
        <div className="info-main"><p className="section-label">OBJECT / {asset.index}</p><h2>{asset.description}</h2><div className="tag-row">{asset.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        <aside className="spec-panel">
          <div><span>PRICE</span><strong>FREE</strong></div><div><span>TYPE</span><strong>{assetSubcategory.toUpperCase()}</strong></div><div><span>SOURCE</span><strong>{sourceLabel}</strong></div><div><span>FORMAT</span><strong>{asset.formats.join(' / ').toUpperCase()}</strong></div><div><span>INTERACTION</span><strong>{interactionLabel}</strong></div><div><span>DETAIL</span><strong>{detailLabel}</strong></div><div><span>DOWNLOAD</span><strong>ZIP + SOURCE</strong></div>
          <a className="download-button" href={asset.download} download><span>Download from {brand.name}</span><ArrowDown /></a>
          <p>Direct download with source included. No account required.</p>
        </aside>
      </section>

      <AssetPlayground asset={asset} preview={preview} onPreviewChange={setPreview} value={playground} onChange={setPlayground} />
      <AssetDeveloperPanel asset={asset} />

      <section className="related page-pad">
        <div className="section-head"><div><p className="section-label">RELATED</p><h2>Keep exploring.</h2></div><Link to="/assets" className="text-link">Full library ↗</Link></div>
        <div className="related-links">
          {related.length ? related.map((item) => <Link key={item.slug} to="/assets/$slug" params={{ slug: item.slug }}><span>{item.index}</span><strong>{item.name}</strong><ArrowUpRight /></Link>) : <Link to="/assets"><span>ALL</span><strong>Browse the full library</strong><ArrowUpRight /></Link>}
        </div>
      </section>
    </article>
  )
}
