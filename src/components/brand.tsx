import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm',
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" fill="none" className="size-5">
        <path
          d="M16 5.5 24 8.5V15c0 5-3.4 8.7-8 11.5C11.4 23.7 8 20 8 15V8.5L16 5.5Z"
          fill="currentColor"
          fillOpacity="0.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="m12.5 15.5 2.6 2.6 4.6-5.2"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to={ROUTES.home}
      className={cn(
        'flex items-center gap-2.5 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <Logo />
      <span className="text-base">
        I<span className="text-muted-foreground">-</span>R
        <span className="text-muted-foreground">-</span>E
        <span className="text-muted-foreground">-</span>S
      </span>
    </Link>
  )
}
