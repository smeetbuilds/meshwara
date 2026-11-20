import { expect, test } from '@playwright/test'

test('desktop editorial tokens, CTA geometry and live showcase remain coherent', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'One reference desktop viewport is sufficient for the design token contract.')
  await page.goto('/')

  await expect(page.locator('.site-header')).toHaveCSS('height', '64px')
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await expect(page.locator('.hero h1')).toHaveCSS('font-size', '40px')
  await expect(page.locator('.hero-feature')).toHaveCSS('background-color', 'rgb(170, 45, 0)')
  await expect(page.locator('.manifesto-card')).toHaveCSS('background-color', 'rgb(10, 46, 14)')
  await expect(page.locator('.hero-actions .primary-link')).toHaveCSS('background-color', 'rgb(24, 29, 38)')
  await expect(page.locator('.hero-actions .secondary-link')).toHaveCSS('background-color', 'rgb(255, 255, 255)')

  const actions = await page.locator('.hero-actions a').evaluateAll((links) => links.map((link) => link.getBoundingClientRect().top))
  expect(actions.length).toBe(2)
  expect(Math.abs(actions[0] - actions[1])).toBeLessThan(2)

  const previewHeight = await page.locator('.hero-feature .preview-open').evaluate((link) => link.getBoundingClientRect().height)
  expect(previewHeight).toBeLessThan(60)
  expect(await page.locator('.world-grid').evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.trim().split(/\\s+/).length)).toBe(3)
  await expect(page.locator('.home-grid .asset-card')).toHaveCount(6)
})

test('mobile editorial layout and full-screen menu remain usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'One reference mobile viewport is sufficient for the design contract.')
  await page.goto('/')

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  await expect(page.locator('.site-header')).toHaveCSS('height', '64px')
  expect(await page.locator('.world-grid').evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.trim().split(/\\s+/).length)).toBe(1)
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()

  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
})
