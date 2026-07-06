import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional leading icon or adornment. */
  startAdornment?: React.ReactNode
  /** Optional trailing icon or adornment. */
  endAdornment?: React.ReactNode
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', startAdornment, endAdornment, invalid, ...props }, ref) => {
    const field = (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-sm shadow-xs transition-colors',
          'placeholder:text-muted-foreground/70',
          'focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          'aria-[invalid=true]:border-destructive aria-[invalid=true]:focus-visible:ring-destructive/30',
          startAdornment && 'pl-9',
          endAdornment && 'pr-9',
          className,
        )}
        {...props}
      />
    )

    if (!startAdornment && !endAdornment) return field

    return (
      <div className="relative">
        {startAdornment && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
            {startAdornment}
          </span>
        )}
        {field}
        {endAdornment && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground [&_svg]:size-4">
            {endAdornment}
          </span>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
