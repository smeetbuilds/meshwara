import { useEffect, useMemo, useRef, useState } from 'react'
import { assets, categories, categoryGroups, getAssetSubcategory } from '../data/assets'
import type { AssetCategory, AssetComplexity, AssetGroup } from '../lib/types'
import { brand } from '../data/brand'
import { AssetCard } from './AssetCard'
import { CloseIcon, SearchIcon } from './Icons'

type ProfileFilter = 'All profiles' | AssetComplexity
type GroupFilter = 'All worlds' | AssetGroup
export type LibrarySearchState = {
  q?: string
  world?: AssetGroup
  category?: AssetCategory
  type?: string
  profile?: AssetComplexity
}
const PAGE_SIZE = 16

export function LibraryGrid({
  limit,
  search,
  onSearchChange,
}: {
  limit?: number
  search?: LibrarySearchState
  onSearchChange?: (next: LibrarySearchState, replace?: boolean) => void
}) {
  const [localSearch, setLocalSearch] = useState<LibrarySearchState>({})
  const currentSearch = search ?? localSearch
  const query = currentSearch.q ?? ''
  const group: GroupFilter = currentSearch.world ?? 'All worlds'
  const category: 'All' | AssetCategory = currentSearch.category ?? 'All'
  const subcategory = currentSearch.type ?? 'All types'
  const profile: ProfileFilter = currentSearch.profile ?? 'All profiles'
  const [visibleCount, setVisibleCount] = useState(limit ?? PAGE_SIZE)
  const [activePreview, setActivePreview] = useState<string | null>(null)
  const loadMore = useRef<HTMLDivElement>(null)

  const updateSearch = (patch: Partial<LibrarySearchState>, replace = false) => {
    const next = { ...currentSearch, ...patch }
    if (search !== undefined && onSearchChange) onSearchChange(next, replace)
    else setLocalSearch(next)
  }

  const groupCounts = useMemo(() => Object.fromEntries(
    categoryGroups.map((item) => [item.name, assets.filter((asset) => item.categories.includes(asset.category)).length]),
  ) as Record<AssetGroup, number>, [])

  const categoryCounts = useMemo(() => Object.fromEntries(
    categories.filter((item) => item !== 'All').map((item) => [item, assets.filter((asset) => asset.category === item).length]),
  ) as Record<AssetCategory, number>, [])

  const activeCategories = useMemo(() => {
    if (group === 'All worlds') return categories
    const selected = categoryGroups.find((item) => item.name === group)
    return ['All', ...(selected?.categories ?? [])] as const
  }, [group])

  const activeSubcategories = useMemo(() => {
    if (category === 'All') return []
    return Array.from(new Set(
      assets.filter((asset) => asset.category === category).map(getAssetSubcategory),
    )).sort((a, b) => a.localeCompare(b))
  }, [category])

  const subcategoryCounts = useMemo(() => {
    if (category === 'All') return {} as Record<string, number>
    return Object.fromEntries(
      activeSubcategories.map((item) => [item, assets.filter((asset) => asset.category === category && getAssetSubcategory(asset) === item).length]),
    ) as Record<string, number>
  }, [category, activeSubcategories])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const groupCategories = group === 'All worlds'
      ? null
      : new Set(categoryGroups.find((item) => item.name === group)?.categories ?? [])
    return assets.filter((asset) => {
      const assetSubcategory = getAssetSubcategory(asset)
      const matchesGroup = !groupCategories || groupCategories.has(asset.category)
      const matchesCategory = category === 'All' || asset.category === category
      const matchesSubcategory = subcategory === 'All types' || assetSubcategory === subcategory
      const matchesProfile = profile === 'All profiles' || asset.complexity === profile
      const haystack = `${asset.name} ${asset.category} ${assetSubcategory} ${asset.blurb} ${asset.tags.join(' ')} ${asset.sourceType} ${asset.formats.join(' ')}`.toLowerCase()
      return matchesGroup && matchesCategory && matchesSubcategory && matchesProfile && (!q || haystack.includes(q))
    })
  }, [query, group, category, subcategory, profile])

  useEffect(() => {
    setVisibleCount(limit ?? PAGE_SIZE)
  }, [query, group, category, subcategory, profile, limit])

  const shown = useMemo(
    () => filtered.slice(0, limit ?? visibleCount),
    [filtered, limit, visibleCount],
  )
  const canLoadMore = !limit && shown.length < filtered.length

  useEffect(() => {
    setActivePreview((current) => {
      if (current && shown.some((asset) => asset.slug === current)) return current
      return shown[0]?.slug ?? null
    })
  }, [shown])

  useEffect(() => {
    const node = loadMore.current
    if (!node || !canLoadMore || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))
      },
      { rootMargin: '280px 0px', threshold: 0.01 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [canLoadMore, filtered.length])

  const reset = () => {
    const next: LibrarySearchState = {}
    if (search !== undefined && onSearchChange) onSearchChange(next)
    else setLocalSearch(next)
  }

  return (
    <section className="library-shell">
      <div className="world-tabs" aria-label="Filter by asset world">
        {(['All worlds', ...categoryGroups.map((item) => item.name)] as GroupFilter[]).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={group === item}
            className={group === item ? 'is-active' : ''}
            onClick={() => updateSearch({
              world: item === 'All worlds' ? undefined : item,
              category: undefined,
              type: undefined,
            })}
          >
            <span>{item}</span><small>{item === 'All worlds' ? assets.length : groupCounts[item as AssetGroup]}</small>
          </button>
        ))}
      </div>

      <div className="library-toolbar">
        <div className="category-stack">
          <div className="category-tabs" aria-label="Filter by asset category">
            {activeCategories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                className={category === item ? 'is-active' : ''}
                onClick={() => updateSearch({ category: item === 'All' ? undefined : item as AssetCategory, type: undefined })}
              >
                <span>{item}</span><small>{item === 'All' ? (group === 'All worlds' ? assets.length : groupCounts[group]) : categoryCounts[item as AssetCategory]}</small>
              </button>
            ))}
          </div>
          {activeSubcategories.length > 1 && (
            <div className="subcategory-tabs" aria-label="Filter by asset type">
              {['All types', ...activeSubcategories].map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={subcategory === item}
                  className={subcategory === item ? 'is-active' : ''}
                  onClick={() => updateSearch({ type: item === 'All types' ? undefined : item })}
                >
                  <span>{item}</span><small>{item === 'All types' ? assets.filter((asset) => asset.category === category).length : subcategoryCounts[item] ?? 0}</small>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="library-tools">
          <label className="profile-filter">
            <span className="sr-only">Detail level</span>
            <select
              value={profile}
              onChange={(event) => {
                const next = event.target.value as ProfileFilter
                updateSearch({ profile: next === 'All profiles' ? undefined : next })
              }}
              aria-label="Filter by detail level"
            >
              <option value="All profiles">All detail levels</option>
              <option value="Light">Lightweight</option>
              <option value="Balanced">Balanced</option>
              <option value="Cinematic">High detail</option>
            </select>
          </label>
          <label className="search-field">
            <SearchIcon />
            <input value={query} onChange={(event) => updateSearch({ q: event.target.value || undefined }, true)} placeholder="Search asset, type, technique…" aria-label="Search assets" />
            {query && <button type="button" onClick={() => updateSearch({ q: undefined }, true)} aria-label="Clear search"><CloseIcon /></button>}
          </label>
        </div>
      </div>

      <div className="result-line" aria-live="polite">
        <span>{brand.name} / {String(filtered.length).padStart(3, '0')} ASSETS</span>
        <span>{shown.length < filtered.length ? `SHOWING ${shown.length} / ${filtered.length}` : 'INTERACTIVE PREVIEWS · FREE DOWNLOADS'}</span>
      </div>

      {shown.length ? (
        <>
          <div className="asset-grid">
            {shown.map((asset) => (
              <AssetCard
                key={asset.slug}
                asset={asset}
                previewActive={activePreview === asset.slug}
                onPreviewActivate={() => setActivePreview(asset.slug)}
              />
            ))}
          </div>
          {canLoadMore && (
            <div ref={loadMore} className="catalog-sentinel" aria-label="Load more assets">
              <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))}>
                Load next {Math.min(PAGE_SIZE, filtered.length - shown.length)} assets
              </button>
              <span>{shown.length} / {filtered.length}</span>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <p>{category === 'People' ? 'PEOPLE / COMING WHEN READY' : 'NO MATCHING OBJECTS'}</p>
          {category === 'People' && <span>Character assets will be added when movement, facial detail and deformation are polished enough for the library.</span>}
          <button type="button" onClick={reset}>Reset filters</button>
        </div>
      )}
    </section>
  )
}
