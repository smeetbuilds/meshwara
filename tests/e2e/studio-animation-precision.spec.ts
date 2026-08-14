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
  expect(browserErrors.get(page) ?? [], 'Animation precision browser run emitted page/console errors').toEqual([])
})

async function openFixture(page: Page) {
  await page.goto('/studio?asset=mercury-fold')
  await expect(page.getByText('ANIMATION TIMELINE')).toBeVisible()
}

async function seek(page: Page, seconds: number) {
  const playhead = page.getByLabel('Timeline playhead')
  await playhead.evaluate((element, value) => {
    const input = element as HTMLInputElement
    input.value = String(value)
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
  }, seconds)
}

test('desktop Animation Studio sets a persistent work area and exports it', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Precision timeline contract runs once on desktop Chromium.')
  await openFixture(page)
  await seek(page, 1)
  await page.getByRole('button', { name: 'SET IN' }).click()
  await seek(page, 3)
  await page.getByRole('button', { name: 'SET OUT' }).click()
  await expect(page.getByLabel('Playback range in')).toHaveValue('1')
  await expect(page.getByLabel('Playback range out')).toHaveValue('3')

  const exportEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'EXPORT PROJECT' }).click()
  const download = await exportEvent
  const path = await download.path()
  expect(path).toBeTruthy()
  const portable = JSON.parse(await readFile(path!, 'utf8'))
  const node = portable.project.nodes.find((item: { assetSlug?: string }) => item.assetSlug === 'mercury-fold')
  expect(node.timeline.rangeStart).toBe(1)
  expect(node.timeline.rangeEnd).toBe(3)
})

test('desktop Animation Studio edits XYZ key values directly', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Precision key editing runs once on desktop Chromium.')
  await openFixture(page)
  await seek(page, 1)
  await page.getByRole('button', { name: '+ POSITION' }).click()
  await expect(page.getByLabel('Key value X')).toBeVisible()
  await page.getByLabel('Key value X').fill('2.5')
  await page.getByLabel('Key value Y').fill('-1.25')
  await page.getByLabel('Key value Z').fill('4')
  await expect(page.getByRole('status')).toContainText('KEYFRAME UPDATED')

  const exportEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'EXPORT PROJECT' }).click()
  const download = await exportEvent
  const path = await download.path()
  const portable = JSON.parse(await readFile(path!, 'utf8'))
  const node = portable.project.nodes.find((item: { assetSlug?: string }) => item.assetSlug === 'mercury-fold')
  expect(node.timeline.keyframes[0].value).toEqual([2.5, -1.25, 4])
})

test('desktop Animation Studio copies pastes duplicates and nudges a key', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Precision key command workflow runs once on desktop Chromium.')
  await openFixture(page)
  await seek(page, 1)
  await page.getByRole('button', { name: '+ POSITION' }).click()
  const editor = page.locator('.studio-key-editor')
  await editor.getByRole('button', { name: 'COPY' }).click()
  await seek(page, 2)
  await page.getByRole('button', { name: 'PASTE @ PLAYHEAD' }).click()
  await expect(page.locator('.studio-track-row').filter({ hasText: 'POSITION' }).locator('button')).toHaveCount(2)
  const positionTrack = page.locator('.studio-track-row').filter({ hasText: 'POSITION' })
  await positionTrack.locator('.studio-track-rail button').last().click()
  await editor.getByRole('button', { name: 'DUPLICATE' }).click()
  await expect(positionTrack.locator('.studio-track-rail button')).toHaveCount(3)
  await positionTrack.locator('.studio-track-rail button').last().click()
  await editor.getByRole('button', { name: '+1F' }).click()
  await expect(page.getByRole('status')).toContainText('KEYFRAME UPDATED')
  await expect(editor.locator('input[type=number]').first()).toHaveValue('2.0833')
  await page.keyboard.press('[')
  await expect(page.getByRole('status')).toContainText('KEY NAVIGATION')
})
