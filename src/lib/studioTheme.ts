export const STUDIO_THEME_STORAGE_KEY = 'meshvara.studio.appearance.v1' as const

export type StudioThemePreference = 'dark' | 'light' | 'system'
export type StudioResolvedTheme = 'dark' | 'light'

export interface StudioThemeStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export function normalizeStudioThemePreference(value: unknown): StudioThemePreference {
  return value === 'light' || value === 'system' || value === 'dark' ? value : 'dark'
}

export function resolveStudioTheme(preference: StudioThemePreference, systemPrefersLight = false): StudioResolvedTheme {
  if (preference === 'system') return systemPrefersLight ? 'light' : 'dark'
  return preference
}

export function readStudioThemePreference(storage?: StudioThemeStorage | null): StudioThemePreference {
  if (!storage) return 'dark'
  try {
    return normalizeStudioThemePreference(storage.getItem(STUDIO_THEME_STORAGE_KEY))
  } catch {
    return 'dark'
  }
}

export function writeStudioThemePreference(preference: StudioThemePreference, storage?: StudioThemeStorage | null) {
  if (!storage) return false
  try {
    storage.setItem(STUDIO_THEME_STORAGE_KEY, preference)
    return true
  } catch {
    return false
  }
}
