import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { APP } from '@/constants'

export type ThemePreference = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: ThemePreference
  setTheme: (theme: ThemePreference) => void
}

/** Persisted theme *preference* (may be "system"). Resolution happens in `useTheme`. */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: APP.themeStorageKey },
  ),
)
