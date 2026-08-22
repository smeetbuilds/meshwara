import { expect, test } from '@playwright/test'

test('Studio reports degraded persistence instead of false autosave success', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.addInitScript(() => {
    const fakeIndexedDb = {
      open() {
        const request: {
          error: DOMException
          onerror?: (event: Event) => void
          onblocked?: (event: Event) => void
        } = { error: new DOMException('Storage unavailable', 'InvalidStateError') }
        queueMicrotask(() => request.onerror?.(new Event('error')))
        return request
      },
    }
    Object.defineProperty(window, 'indexedDB', { configurable: true, value: fakeIndexedDb })
  })

  await page.goto('/studio')
  const status = page.locator('.studio-statusbar [role="status"]')
  await expect(status).toContainText('LOCAL AUTOSAVE DEGRADED · SESSION STILL ACTIVE')
  await expect(page.locator('.studio-project-name input')).toBeVisible()

  await page.getByRole('button', { name: 'NEW' }).click()
  await expect(status).toContainText('NEW SCENE READY · SESSION ONLY · LOCAL STORAGE UNAVAILABLE')
  await expect(page.locator('.studio-project-name input')).toHaveValue('Untitled Scene')

  await page.waitForTimeout(450)
  await expect(status).toContainText('LOCAL AUTOSAVE DEGRADED · SESSION STILL ACTIVE')
  expect(pageErrors).toEqual([])
})
