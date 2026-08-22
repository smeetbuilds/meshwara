import { createFileRoute } from '@tanstack/react-router'
import { LibraryGrid, type LibrarySearchState } from '../../components/LibraryGrid'
import { assets, categories, categoryGroups, getAssetSubcategory } from '../../data/assets'
import { brand } from '../../data/brand'
import type { AssetCategory, AssetComplexity, AssetGroup } from '../../lib/types'

function validateLibrarySearch(search: Record<string, unknown>): LibrarySearchState {
  const world = typeof search.world === 'string' && categoryGroups.some((item) => item.name === search.world)
    ? search.world as AssetGroup
    : undefined
  const category = typeof search.category === 'string' && search.category !== 'All' && categories.includes(search.category as AssetCategory)
    ? search.category as AssetCategory
    : undefined
  const scopedCategory = category && (!world || categoryGroups.find((item) => item.name === world)?.categories.includes(category))
    ? category
    : undefined
  const type = typeof search.type === 'string' && scopedCategory && assets.some((asset) => asset.category === scopedCategory && getAssetSubcategory(asset) === search.type)
    ? search.type
    : undefined
  const profile = typeof search.profile === 'string' && ['Light', 'Balanced', 'Cinematic'].includes(search.profile)
    ? search.profile as AssetComplexity
    : undefined
  const q = typeof search.q === 'string' && search.q.length <= 160 && search.q ? search.q : undefined
  return { q, world, category: scopedCategory, type, profile }
}

export const Route = createFileRoute('/assets/')({
  validateSearch: validateLibrarySearch,
  head: () => ({
    meta: [
      { title: `Archive — ${brand.name}` },
      { name: 'description', content: `Browse ${assets.length} free production-grade Three.js assets from ${brand.name}, with live previews, source downloads and Studio handoff.` },
      { property: 'og:title', content: `Archive — ${brand.name}` },
      { property: 'og:description', content: brand.productLine },
    ],
    links: [{ rel: 'canonical', href: '/assets' }],
  }),
  component: AssetsPage,
})

function AssetsPage() {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const typeCount = new Set(assets.map(getAssetSubcategory)).size
  return (
    <div className="library-page page-pad">
      <header className="library-hero">
        <p className="eyebrow">{brand.name} / {String(assets.length).padStart(3, '0')} ASSETS / {categoryGroups.length} WORLDS / {typeCount} TYPES</p>
        <h1>The Meshvara<br />archive.</h1>
        <p>Browse by world, category or type. Hover, focus or tap a card to preview the real 3D asset, then open the details or download the source directly.</p>
      </header>
      <LibraryGrid
        search={search}
        onSearchChange={(next, replace) => void navigate({ search: next, replace })}
      />
    </div>
  )
}
