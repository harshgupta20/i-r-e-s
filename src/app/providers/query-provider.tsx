import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/**
 * Server-state cache. Sensible defaults: retry transient failures, keep data
 * fresh for a minute, and don't refetch on every window focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
