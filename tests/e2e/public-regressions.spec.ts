import { expect, test } from '@playwright/test'

test('archive filters survive refresh/back navigation and world counts stay scoped', async ({ page }) => {
  await page.goto('/assets')

  const worldButtons = page.locator('.world-tabs button')
  const selectedWorld = worldButtons.nth(1)
  await selectedWorld.click()
  await expect(selectedWorld).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveURL(/world=/)

  const worldCount = (await selectedWorld.locator('small').textContent())?.trim()
  expect(worldCount).toBeTruthy()
  await expect(page.locator('.category-tabs button').first().locator('small')).toHaveText(worldCount!)

  const search = page.getByLabel('Search assets')
  await search.fill('orb')
  await expect(page).toHaveURL(/q=orb/)

  const profile = page.getByLabel('Filter by detail level')
  await profile.selectOption('Light')
  await expect(page).toHaveURL(/profile=Light/)

  await page.reload()
  await expect(search).toHaveValue('orb')
  await expect(profile).toHaveValue('Light')
  await expect(selectedWorld).toHaveAttribute('aria-pressed', 'true')

  await page.goBack()
  await expect(profile).toHaveValue('All profiles')
  await expect(search).toHaveValue('orb')
  await expect(selectedWorld).toHaveAttribute('aria-pressed', 'true')
})

test('production preview exposes crawl metadata and route-specific head metadata', async ({ page, request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.ok()).toBeTruthy()
  expect(await robots.text()).toContain('User-agent: *')

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.ok()).toBeTruthy()
  const sitemapText = await sitemap.text()
  expect(sitemapText).toContain('/assets/precision-chrono')
  expect(sitemapText).toContain('/studio')

  await page.goto('/assets')
  await expect(page).toHaveTitle(/Archive — MESHVARA/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', '/assets')

  await page.goto('/assets/precision-chrono')
  await expect(page).toHaveTitle(/Precision Chrono — MESHVARA/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', '/assets/precision-chrono')
  await expect(page.getByRole('link', { name: /Download from MESHVARA/i })).toBeVisible()

  const framework = page.getByRole('group', { name: 'Integration framework' })
  await expect(framework.getByRole('button', { name: 'React / Vite' })).toHaveAttribute('aria-pressed', 'true')
  await framework.getByRole('button', { name: 'Next.js' }).click()
  await expect(framework.getByRole('button', { name: 'Next.js' })).toHaveAttribute('aria-pressed', 'true')
})
