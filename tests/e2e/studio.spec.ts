import { readFile } from 'node:fs/promises'
import { expect, test, type Page } from '@playwright/test'
import { readZipEntries, stripSingleRoot } from '../../scripts/distribution/core.mjs'
import { createStudioTriangleGlb, STUDIO_RED_PIXEL_PNG } from './fixtures/studio-fixtures'

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
  expect(browserErrors.get(page) ?? [], 'Studio browser run emitted page/console errors').toEqual([])
})

async function importGlb(page: Page, name = 'fixture.glb', requiredExtensions: string[] = []) {
  await page.locator('.studio-import-button input[type="file"]').setInputFiles({
    name,
    mimeType: 'model/gltf-binary',
    buffer: createStudioTriangleGlb({ requiredExtensions }),
  })
}

async function waitForFixtureInspection(page: Page) {
  await expect(page.locator('.studio-object-main strong', { hasText: 'fixture' })).toBeVisible()
  await expect(page.locator('.studio-model-report')).toBeVisible({ timeout: 15_000 })
  await expect(page.locator('.studio-stat-grid')).toContainText('1')
}

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


test('desktop asset detail hands off into Studio through the real UI link', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Asset-detail WebGL handoff runs once on desktop Chromium.')
  await page.goto('/assets/mercury-fold')
  await page.getByRole('link', { name: /Compose in Meshvara Studio/i }).click()
  await expect(page).toHaveURL(/\/studio\?asset=mercury-fold/)
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

test('desktop Studio imports a real GLB, replaces a texture and round-trips a portable project', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Heavy binary workflow runs once on desktop Chromium.')
  await page.goto('/studio')
  await importGlb(page)
  await waitForFixtureInspection(page)

  const material = page.locator('.studio-material-card').first()
  await material.locator('summary').click()
  const mapRow = material.locator('.studio-texture-row').filter({ has: page.getByText('map', { exact: true }) })
  await mapRow.locator('input[type="file"]').setInputFiles({ name: 'red.png', mimeType: 'image/png', buffer: STUDIO_RED_PIXEL_PNG })
  await expect(page.getByRole('status')).toContainText('MAP REPLACED')
  await expect(mapRow).toContainText('LOCAL')
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur())

  await page.keyboard.press('ControlOrMeta+D')
  await expect(page.locator('.studio-object-row')).toHaveCount(2)
  await page.keyboard.press('ControlOrMeta+Z')
  await expect(page.locator('.studio-object-row')).toHaveCount(1)
  await page.locator('.studio-object-main').first().click()

  const exportEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'EXPORT PROJECT' }).click()
  const projectDownload = await exportEvent
  expect(projectDownload.suggestedFilename()).toMatch(/\.meshvara-project$/)
  const projectPath = await projectDownload.path()
  expect(projectPath).toBeTruthy()
  const portable = JSON.parse(await readFile(projectPath!, 'utf8'))
  expect(portable.format).toBe('meshvara-project')
  expect(portable.files.some((file: { kind?: string }) => file.kind === 'glb')).toBeTruthy()
  expect(portable.files.some((file: { kind?: string }) => file.kind === 'texture')).toBeTruthy()

  await page.getByRole('button', { name: 'NEW' }).click()
  await expect(page.locator('.studio-object-row')).toHaveCount(0)
  await page.locator('.studio-top-actions label input[type="file"]').setInputFiles(projectPath!)
  await expect(page.locator('.studio-object-main strong', { hasText: 'fixture' })).toBeVisible()
  await waitForFixtureInspection(page)
})

test('desktop Studio exports a validated R3F component ZIP from an imported GLB', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Heavy binary workflow runs once on desktop Chromium.')
  await page.goto('/studio')
  await importGlb(page)
  await waitForFixtureInspection(page)

  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'R3F COMPONENT ZIP' }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toMatch(/\.zip$/)
  const path = await download.path()
  expect(path).toBeTruthy()
  const zip = await readFile(path!)
  expect(zip.byteLength).toBeGreaterThan(100)
  const entries = stripSingleRoot(readZipEntries(zip), 'fixture')
  const names = entries.map((entry) => entry.relative)
  expect(names).toContain('package.json')
  expect(names.some((name) => name.endsWith('.glb'))).toBeTruthy()
  expect(names.some((name) => name.endsWith('.tsx'))).toBeTruthy()
})

test('desktop Studio rejects malformed GLB bytes through the real import control', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Malformed binary rejection only needs one browser target.')
  await page.goto('/studio')
  await page.locator('.studio-import-button input[type="file"]').setInputFiles({
    name: 'broken.glb',
    mimeType: 'model/gltf-binary',
    buffer: Buffer.from('not a glb'),
  })
  await expect(page.getByRole('status')).toContainText('GLB REJECTED')
  await expect(page.locator('.studio-object-main strong', { hasText: 'broken' })).toHaveCount(0)
})

test('mobile Studio can add an archive object and edit it through the stacked inspector', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile interaction contract runs on the mobile project.')
  await page.goto('/studio')
  await page.locator('.studio-asset-list button').first().click()
  await expect(page.locator('.studio-object-row')).toHaveCount(1)
  const name = page.locator('.studio-inspector .studio-field input').first()
  await name.fill('Mobile Edited Asset')
  await expect(page.locator('.studio-object-main strong')).toHaveText('Mobile Edited Asset')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(2)
})

test('desktop Studio rejects unsupported required codec GLBs before local storage', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Codec rejection only needs one browser target.')
  await page.goto('/studio')
  await importGlb(page, 'draco-required.glb', ['KHR_draco_mesh_compression'])
  await expect(page.getByRole('status')).toContainText('DRACO GEOMETRY COMPRESSION')
  await expect(page.locator('.studio-object-main strong', { hasText: 'draco-required' })).toHaveCount(0)
})
