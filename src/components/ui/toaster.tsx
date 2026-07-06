import { Toaster as SonnerToaster } from 'sonner'
import { useTheme } from '@/hooks/use-theme'

/**
 * App-wide toast host. Wraps sonner with our design tokens so toasts match
 * the surface/border/shadow language of everything else.
 */
export function Toaster() {
  const { resolvedTheme } = useTheme()

  return (
    <SonnerToaster
      theme={resolvedTheme}
      position="bottom-right"
      closeButton
      richColors
      toastOptions={{
        classNames: {
          toast:
            'group rounded-lg border border-border bg-popover text-popover-foreground shadow-lg',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
        },
      }}
    />
  )
}

export { toast } from 'sonner'
