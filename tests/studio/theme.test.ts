import assert from 'node:assert/strict'
import {
  STUDIO_THEME_STORAGE_KEY,
  normalizeStudioThemePreference,
  readStudioThemePreference,
  resolveStudioTheme,
  writeStudioThemePreference,
  type StudioThemeStorage,
} from '../../src/lib/studioTheme.ts'

assert.equal(normalizeStudioThemePreference('dark'), 'dark')
assert.equal(normalizeStudioThemePreference('light'), 'light')
assert.equal(normalizeStudioThemePreference('system'), 'system')
assert.equal(normalizeStudioThemePreference('sepia'), 'dark')
assert.equal(resolveStudioTheme('dark', true), 'dark')
assert.equal(resolveStudioTheme('light', false), 'light')
assert.equal(resolveStudioTheme('system', false), 'dark')
assert.equal(resolveStudioTheme('system', true), 'light')

const values = new Map<string, string>()
const storage: StudioThemeStorage = {
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => { values.set(key, value) },
}
assert.equal(readStudioThemePreference(storage), 'dark')
assert.equal(writeStudioThemePreference('light', storage), true)
assert.equal(values.get(STUDIO_THEME_STORAGE_KEY), 'light')
assert.equal(readStudioThemePreference(storage), 'light')
values.set(STUDIO_THEME_STORAGE_KEY, 'invalid')
assert.equal(readStudioThemePreference(storage), 'dark')

const blocked: StudioThemeStorage = {
  getItem: () => { throw new Error('blocked') },
  setItem: () => { throw new Error('blocked') },
}
assert.equal(readStudioThemePreference(blocked), 'dark')
assert.equal(writeStudioThemePreference('system', blocked), false)

console.log('Meshvara Studio appearance preference contract passed')
