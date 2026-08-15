import { readFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'
import { createSkinnedStudioGlb } from './fixtures/studio-rig-fixtures'

test('Studio inventories a local skeleton, maps roles and persists a saved rest pose', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-chromium', 'Rig authoring contract runs once on desktop Chromium.')
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/studio')
  await page.locator('.studio-import-button input[type="file"]').setInputFiles({ name: 'rig-fixture.glb', mimeType: 'model/gltf-binary', buffer: createSkinnedStudioGlb() })

  const rig = page.getByRole('region', { name: 'Skeletal animation and pose tools' })
  await expect(rig).toContainText('2 BONES', { timeout: 15_000 })
  await rig.getByRole('button', { name: /AUTO MAP/ }).click()
  await expect(rig).toContainText('2/22 MAPPED')
  await rig.getByRole('button', { name: 'SAVE REST' }).click()
  await expect(rig).toContainText('1 SAVED')
  await rig.getByRole('button', { name: 'APPLY' }).click()

  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'EXPORT PROJECT' }).click()
  const download = await downloadEvent
  const path = await download.path()
  expect(path).toBeTruthy()
  const portable = JSON.parse(await readFile(path!, 'utf8'))
  const imported = portable.project.nodes.find((node: { kind?: string }) => node.kind === 'imported')
  expect(imported.rig.mapping.hips).toBeTruthy()
  expect(imported.rig.mapping.spine).toBeTruthy()
  expect(imported.rig.poses).toHaveLength(1)
  expect(imported.rig.activePoseId).toBe(imported.rig.poses[0].id)
  expect(errors).toEqual([])
})
