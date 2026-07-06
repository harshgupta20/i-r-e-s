import { AlertTriangle } from 'lucide-react'
import { isFirebaseConfigured } from '@/services/firebase/client'

/**
 * Shown when Firebase env vars are missing so the app degrades gracefully with a
 * clear message instead of throwing on the first data call.
 */
export function ConfigBanner() {
  if (isFirebaseConfigured) return null

  return (
    <div className="border-b border-warning/30 bg-warning/10">
      <div className="container flex items-center gap-2.5 py-2.5 text-sm text-foreground">
        <AlertTriangle className="size-4 shrink-0 text-warning" />
        <p>
          <span className="font-medium">Demo mode.</span> Firebase isn’t configured — sign-in and
          data features are disabled. Copy <code className="font-mono text-xs">.env.example</code> to{' '}
          <code className="font-mono text-xs">.env</code> to enable them.
        </p>
      </div>
    </div>
  )
}
