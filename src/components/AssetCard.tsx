import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import type { AssetRecord } from '../lib/types'
import { getAssetSubcategory } from '../data/assets'
import { ArrowDown, ArrowUpRight } from './Icons'
import { LazyAssetScene } from './LazyAssetScene'

export function AssetCard({ asset, priority = false }: { asset: AssetRecord; priority?: boolean }) {
  return (
    <article className="asset-card" style={{ '--asset-accent': asset.accent } as CSSProperties}>
      <div className="asset-preview" aria-label={`${asset.name} live 3D preview`}>
        <div className="asset-gridlines" />
        <LazyAssetScene kind={asset.scene} priority={priority} presentation={asset.presentation} interaction={asset.interaction} />
        <div className="asset-index">{asset.index}</div>
        {asset.new && <span className="new-pill">NEW</span>}
        <span className="live-preview-pill"><i /> LIVE 3D PREVIEW</span>
        <Link to="/assets/$slug" params={{ slug: asset.slug }} className="preview-open" aria-label={`Open full ${asset.name} preview`}>FULL VIEW <ArrowUpRight /></Link>
        <div className="preview-spec" aria-hidden="true">
          <span>{asset.sourceType} · {asset.interaction === 'Pointer' ? 'MOVE POINTER' : 'LIVE MOTION'}</span>
          <span>QA AUDITED · ZIP VERIFIED · {asset.complexity}</span>
        </div>
      </div>
      <div className="asset-card-meta">
        <div>
          <p>{asset.category} · {getAssetSubcategory(asset)} / {asset.formats.join(' + ')}</p>
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
