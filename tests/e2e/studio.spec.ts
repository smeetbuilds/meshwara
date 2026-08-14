import { expect, test } from '@playwright/test'

test('Studio appearance supports dark, light and live system preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/studio')
  const studio = page.locator('.studio-page')
  const appearance = page.getByLabel('Studio appearance')

  await expect(studio).toHaveAttribute('data-studio-theme', 'dark')
  await appearance.selectOption('light')
  await expect(studio).toHaveAttribute('data-studio-theme', 'light')
  await expect(studio).toHaveAttribute('data-studio-theme-preference', 'light')

  await page.reload()
  await expect(page.locator('.studio-page')).toHaveAttribute('data-studio-theme', 'light')

  await page.getByLabel('Studio appearance').selectOption('system')
  await expect(page.locator('.studio-page')).toHaveAttribute('data-studio-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('.studio-page')).toHaveAttribute('data-studio-theme', 'light')
})


test('local project autosave survives a real browser reload', async ({ page }) => {
  await page.goto('/studio')
  const name = page.locator('.studio-project-name input')
  await name.fill('Browser Persistence Check')
  await page.waitForTimeout(700)
  await page.reload()
  await expect(page.locator('.studio-project-name input')).toHaveValue('Browser Persistence Check')
})

test('asset deep link opens an isolated Studio study', async ({ page }) => {
  await page.goto('/studio?asset=mercury-fold')
  await expect(page.locator('.studio-project-name input')).toHaveValue('Mercury Fold Study')
  await expect(page.locator('.studio-object-main strong', { hasText: 'Mercury Fold' })).toBeVisible()
})

test('keyboard transform modes expose accessible pressed state', async ({ page }) => {
  await page.goto('/studio')
  const translate = page.getByRole('button', { name: '1 · TRANSLATE' })
  const rotate = page.getByRole('button', { name: '2 · ROTATE' })
  const scale = page.getByRole('button', { name: '3 · SCALE' })

  await expect(translate).toHaveAttribute('aria-pressed', 'true')
  await page.keyboard.press('2')
  await expect(rotate).toHaveAttribute('aria-pressed', 'true')
  await page.keyboard.press('3')
  await expect(scale).toHaveAttribute('aria-pressed', 'true')
})

test('Studio shell remains viewport-contained across configured breakpoints', async ({ page }) => {
  await page.goto('/studio')
  await expect(page.locator('.studio-topbar')).toBeVisible()
  await expect(page.locator('.studio-stage-column')).toBeVisible()
  await expect(page.locator('.studio-left-panel')).toBeVisible()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(2)
})
