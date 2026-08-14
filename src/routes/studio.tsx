import { createFileRoute } from '@tanstack/react-router'
import { StudioShell } from '../components/studio/StudioShell'

export const Route = createFileRoute('/studio')({
  validateSearch: (search: Record<string, unknown>) => ({
    asset: typeof search.asset === 'string' && search.asset.length <= 160 ? search.asset : undefined,
  }),
  component: StudioRoute,
})

function StudioRoute() {
  const { asset } = Route.useSearch()
  return <StudioShell initialAssetSlug={asset} />
}
