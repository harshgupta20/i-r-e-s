import { Check, Copy } from 'lucide-react'
import { truncateHash } from '@/lib/hash'
import { useCopy } from '@/hooks/use-copy'
import { cn } from '@/lib/utils'

/** Monospace hash chip with copy-to-clipboard. */
export function HashBadge({ hash, className }: { hash: string; className?: string }) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => void copy(hash)}
      title={hash}
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {truncateHash(hash)}
      {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
      <span className="sr-only">Copy hash</span>
    </button>
  )
}
