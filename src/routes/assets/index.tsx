import { createFileRoute } from '@tanstack/react-router'
import { LibraryGrid } from '../../components/LibraryGrid'
import { assets, categoryGroups, getAssetSubcategory } from '../../data/assets'
import { brand } from '../../data/brand'

export const Route = createFileRoute('/assets/')({ component: AssetsPage })

function AssetsPage() {
  const typeCount = new Set(assets.map(getAssetSubcategory)).size
  return (
    <div className="library-page page-pad">
      <header className="library-hero">
        <p className="eyebrow">{brand.name} / {String(assets.length).padStart(3, '0')} ASSETS / {categoryGroups.length} WORLDS / {typeCount} TYPES</p>
        <h1>The Meshvara<br />archive.</h1>
        <p>Browse by world, category or type. Hover, focus or tap a card to preview the real 3D asset, then open the details or download the source directly.</p>
      </header>
      <LibraryGrid />
    </div>
  )
}
