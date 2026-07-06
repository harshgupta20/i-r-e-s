import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ConfigBanner } from '@/components/config-banner'
import { CommandMenu } from '@/components/command-menu'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Spinner } from '@/components/ui'

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <Navbar />
      <ConfigBanner />

      <main id="main" className="flex-1">
        <Suspense
          fallback={
            <div className="grid min-h-[60vh] place-items-center">
              <Spinner size="lg" />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <CommandMenu />
    </div>
  )
}
