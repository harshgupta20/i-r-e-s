import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { ErrorBoundary } from '@/components/error-boundary'
import { TooltipProvider, Toaster } from '@/components/ui'
import { AuthProvider } from '@/app/providers/auth-provider'
import { QueryProvider } from '@/app/providers/query-provider'
import { router } from '@/app/router'

export function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider delayDuration={200}>
              <RouterProvider router={router} future={{ v7_startTransition: true }} />
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
