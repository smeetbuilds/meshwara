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
  expect(await page.locator('.world-grid').evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.trim().split(' ').filter(Boolean).length)).toBe(3)
  await expect(page.locator('.home-grid .asset-card')).toHaveCount(6)
  const worldHeights = await page.locator('.world-card').evaluateAll((cards) => cards.map((card) => Math.round(card.getBoundingClientRect().height)))
  expect(new Set(worldHeights).size).toBeGreaterThan(2)
})

test('mobile editorial layout and full-screen menu remain usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'One reference mobile viewport is sufficient for the design contract.')
  await page.goto('/')

  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  await expect(page.locator('.site-header')).toHaveCSS('height', '64px')
  expect(await page.locator('.world-grid').evaluate((grid) => getComputedStyle(grid).gridTemplateColumns.trim().split(' ').filter(Boolean).length)).toBe(1)
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()

  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
})

test('Inter Variable loads locally across public routes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Shared font loading needs one reference browser.')
  const failedFontRequests: string[] = []
  page.on('requestfailed', (request) => {
    if (request.url().endsWith('.woff2')) failedFontRequests.push(request.url())
  })
  for (const route of ['/', '/assets', '/assets/precision-chrono']) {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    const font = await page.evaluate(() => ({
      family: getComputedStyle(document.documentElement).fontFamily,
      loaded: Array.from(document.fonts).some((face) => face.family === 'Inter Variable' && face.status === 'loaded'),
    }))
    expect(font.family).toContain('Inter Variable')
    expect(font.loaded).toBe(true)
  }
  expect(failedFontRequests).toHaveLength(0)
})

test('responsive cards, archive inputs and asset downloads remain usable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop browser can resize to all CSS breakpoints.')
  await page.goto('/')
  for (const width of [360, 390, 767, 768, 1024, 1440, 1600]) {
    await page.setViewportSize({ width, height: 900 })
    const data = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      width: window.innerWidth,
      columns: getComputedStyle(document.querySelector('.world-grid')!).gridTemplateColumns.trim().split(/\s+/).length,
    }))
    expect(data.scrollWidth, 'Horizontal overflow at ' + width).toBeLessThanOrEqual(data.width)
    expect(data.columns, 'Grid columns at ' + width).toBe(width < 768 ? 1 : width < 1024 ? 2 : 3)
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/assets')
  await expect(page.locator('.search-field')).toHaveCSS('height', '44px')
  await expect(page.locator('.profile-filter select')).toHaveCSS('height', '44px')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
  await page.goto('/assets/precision-chrono')
  await expect(page.getByRole('link', { name: /Download from MESHVARA/ })).toHaveAttribute('href', '/downloads/precision-chrono.zip')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390)
})

test('mobile menu traps focus, blocks background and restores focus on dismissal', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile navigation and touch contract.')
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
  expect(await page.locator('main').evaluate((node) => (node as HTMLElement).inert)).toBe(true)
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused()
  await page.keyboard.press('Escape')
  expect(await page.locator('main').evaluate((node) => (node as HTMLElement).inert)).toBe(false)
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Archive/ }).click()
  await expect(page).toHaveURL(/\/assets\/?$/)
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0)
})

test('Studio dark and light palettes align with the editorial color system', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Editor theme contract is shared across viewports.')
  await page.goto('/studio')
  const select = page.getByRole('combobox', { name: 'Studio appearance' })
  await expect(select).toBeVisible()
  await select.selectOption('dark')
  await expect(page.locator('.studio-page')).toHaveAttribute('data-studio-theme', 'dark')
  const dark = await page.locator('.studio-page').evaluate((node) => ({
    accent: getComputedStyle(node).getPropertyValue('--studio-accent').trim(),
    background: getComputedStyle(node).getPropertyValue('--studio-page-bg').trim(),
    font: getComputedStyle(node).fontFamily,
  }))
  expect(dark).toMatchObject({ accent: '#a8d8c4', background: '#181d26' })
  expect(dark.font).toContain('Inter Variable')
  await select.selectOption('light')
  await expect(page.locator('.studio-page')).toHaveAttribute('data-studio-theme', 'light')
  const light = await page.locator('.studio-page').evaluate((node) => ({
    accent: getComputedStyle(node).getPropertyValue('--studio-accent').trim(),
    background: getComputedStyle(node).getPropertyValue('--studio-page-bg').trim(),
  }))
  expect(light.accent).toBe('#0a2e0e')
  expect(['#fff', '#ffffff']).toContain(light.background)
})
