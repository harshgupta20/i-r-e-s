import { useEffect } from 'react'
import { useTheme } from '@/hooks/use-theme'

/**
 * Applies the resolved theme as a class on <html>. Mount once near the root.
 * An inline script in index.html sets the initial class to prevent FOUC.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  return <>{children}</>
}
