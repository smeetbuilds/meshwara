import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'

const browserErrors = new WeakMap<Page, string[]>()

test.beforeEach(async ({ page }) => {
  const errors: string[] = []
  browserErrors.set(page, errors)
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`)
  })
})

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page) ?? [], 'Animation Studio browser run emitted page/console errors').toEqual([])
})

test('desktop Animation Studio authors, plays and exports transform keys', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Animation authoring contract runs once on desktop Chromium.')
  await page.goto('/studio?asset=mercury-fold')
  await expect(page.getByText('ANIMATION TIMELINE')).toBeVisible()
  await expect(page.locator('.studio-object-main strong', { hasText: 'Mercury Fold' })).toBeVisible()

  const playhead = page.getByLabel('Timeline playhead')
  await playhead.evaluate((element) => {
    const input = element as HTMLInputElement
    input.value = '1'
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  })

  await page.locator('.studio-auto-key input').check()
  const position = page.locator('.studio-vector').filter({ hasText: 'POSITION' })
  await position.locator('input').first().fill('2')
  await expect(page.getByRole('status')).toContainText('AUTO KEY · POSITION')
  await expect(page.locator('.studio-track-row').filter({ hasText: 'POSITION' }).locator('button')).toHaveCount(1)

  const timeBefore = Number(await playhead.inputValue())
  await page.getByRole('button', { name: 'PLAY' }).click()
  await page.waitForTimeout(250)
  await page.getByRole('button', { name: 'PAUSE' }).click()
  expect(Number(await playhead.inputValue())).toBeGreaterThan(timeBefore)

  const exportEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'EXPORT PROJECT' }).click()
  const download = await exportEvent
  const path = await download.path()
  expect(path).toBeTruthy()
  const portable = JSON.parse(await readFile(path!, 'utf8'))
  const node = portable.project.nodes.find((item: { assetSlug?: string }) => item.assetSlug === 'mercury-fold')
  expect(node.timeline.duration).toBe(5)
  expect(node.timeline.fps).toBe(30)
  expect(node.timeline.keyframes).toHaveLength(1)
  expect(node.timeline.keyframes[0].channel).toBe('position')
  expect(node.timeline.keyframes[0].value[0]).toBe(2)
})
