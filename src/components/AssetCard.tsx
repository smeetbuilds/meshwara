import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import type { AssetRecord } from '../lib/types'
import { getAssetSubcategory } from '../data/assets'
import { ArrowDown, ArrowUpRight } from './Icons'
import { LazyAssetScene } from './LazyAssetScene'

export function AssetCard({
  asset,
  priority = false,
  previewActive,
  onPreviewActivate,
}: {
  asset: AssetRecord
  priority?: boolean
  previewActive?: boolean
  onPreviewActivate?: () => void
}) {
  const controlledPreview = typeof previewActive === 'boolean'
  const isPreviewActive = controlledPreview ? previewActive : priority
  const requestPreview = () => onPreviewActivate?.()

  return (
    <article
      className={`asset-card${isPreviewActive ? ' is-previewing' : ''}`}
      style={{ '--asset-accent': asset.accent } as CSSProperties}
      onPointerEnter={controlledPreview ? requestPreview : undefined}
      onFocusCapture={controlledPreview ? requestPreview : undefined}
    >
      <div className="asset-preview" aria-label={`${asset.name} 3D preview`}>
        <div className="asset-gridlines" />
        <LazyAssetScene
          kind={asset.scene}
          enabled={isPreviewActive}
          priority={priority}
          presentation={asset.presentation}
          interaction={asset.interaction}
        />
        <div className="asset-index">{asset.index}</div>
        {asset.new && <span className="new-pill">NEW</span>}
        <span className="preview-state-pill"><i /> 3D PREVIEW</span>
        {!isPreviewActive && controlledPreview && (
          <button type="button" className="preview-activate" onClick={requestPreview}>
            Preview in 3D
          </button>
        )}
        <Link to="/assets/$slug" params={{ slug: asset.slug }} className="preview-open" aria-label={`Open ${asset.name}`}>
          OPEN <ArrowUpRight />
        </Link>
        <div className="preview-spec" aria-hidden="true">
          <span>{asset.interaction === 'Pointer' ? 'MOVE POINTER' : 'ANIMATED'}</span>
          <span>{asset.formats.join(' + ')}</span>
        </div>
      </div>
      <div className="asset-card-meta">
        <div>
          <p>{asset.category} · {getAssetSubcategory(asset)}</p>
          <h3><Link to="/assets/$slug" params={{ slug: asset.slug }}>{asset.name}</Link></h3>
        </div>
        <div className="asset-card-actions">
          <a href={asset.download} download className="round-arrow download-arrow" aria-label={`Download ${asset.name}`}><ArrowDown /></a>
          <Link to="/assets/$slug" params={{ slug: asset.slug }} className="round-arrow" aria-label={`View ${asset.name}`}><ArrowUpRight /></Link>
        </div>
      </div>
      <p className="asset-card-blurb">{asset.blurb}</p>
      <div className="asset-card-tags" aria-label="Asset tags">
        {asset.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </article>
  )
}
