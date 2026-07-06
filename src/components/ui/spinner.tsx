import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const sizeMap = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
} as const

export interface SpinnerProps {
  size?: keyof typeof sizeMap
  className?: string
  label?: string
}

export function Spinner({ size = 'md', className, label = 'Loading' }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite">
      <Loader2 className={cn('animate-spin text-muted-foreground', sizeMap[size], className)} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}
