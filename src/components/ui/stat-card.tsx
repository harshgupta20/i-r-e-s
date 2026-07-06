import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './card'
import { Skeleton } from './skeleton'

export interface StatCardProps {
  label: string
  value: React.ReactNode
  icon?: LucideIcon
  hint?: string
  loading?: boolean
  className?: string
}

export function StatCard({ label, value, icon: Icon, hint, loading, className }: StatCardProps) {
  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">{label}</p>
          {loading ? (
            <Skeleton className="mt-2 h-8 w-20" />
          ) : (
            <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
          )}
          {hint && !loading && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        {Icon && (
          <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden />
          </div>
        )}
      </div>
    </Card>
  )
}
