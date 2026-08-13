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
        <p className="eyebrow">{brand.name} / {String(assets.length).padStart(3, '0')} VERIFIED ASSETS / {categoryGroups.length} WORLDS / {typeCount} TYPES</p>
        <h1>The Meshvara<br />archive.</h1>
        <p>Explore every published Meshvara asset. Every card includes a real live WebGL preview before download, then resolves to a SHA-256-manifested direct ZIP with responsive source organized by world, category and precise subcategory.</p>
      </header>
      <LibraryGrid />
    </div>
  )
}
