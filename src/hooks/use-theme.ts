import { useCallback, useEffect, useState } from 'react'
import { useThemeStore, type ThemePreference } from '@/stores/theme-store'

const QUERY = '(prefers-color-scheme: dark)'

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(QUERY).matches
}

export interface UseThemeResult {
  theme: ThemePreference
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: ThemePreference) => void
  toggleTheme: () => void
}

/** Reads the theme preference and resolves it against the OS setting reactively. */
export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useThemeStore()
  const [systemDark, setSystemDark] = useState(getSystemPrefersDark)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const resolvedTheme: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return { theme, resolvedTheme, setTheme, toggleTheme }
}
