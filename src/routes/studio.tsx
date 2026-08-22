import { createFileRoute } from '@tanstack/react-router'
import { StudioShell } from '../components/studio/StudioShell'
import { brand } from '../data/brand'

export const Route = createFileRoute('/studio')({
  validateSearch: (search: Record<string, unknown>) => ({
    asset: typeof search.asset === 'string' && search.asset.length <= 160 ? search.asset : undefined,
  }),
  head: () => ({
    meta: [
      { title: `Studio — ${brand.name}` },
      { name: 'description', content: `Compose, inspect and export ${brand.name} assets in a local-first browser Studio with no uploads or account required.` },
      { property: 'og:title', content: `Studio — ${brand.name}` },
      { property: 'og:description', content: `${brand.name} local-first 3D scene and model workbench.` },
    ],
    links: [{ rel: 'canonical', href: '/studio' }],
  }),
  component: StudioRoute,
})

function StudioRoute() {
  const { asset } = Route.useSearch()
  return <StudioShell initialAssetSlug={asset} />
}
