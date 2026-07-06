import { useId } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from './label'

export interface FieldProps {
  label?: string
  description?: string
  error?: string
  required?: boolean
  className?: string
  /** Render prop receives the id + a11y props to spread on the control. */
  children: (props: {
    id: string
    'aria-invalid': boolean
    'aria-describedby': string | undefined
  }) => React.ReactNode
}

/**
 * A labelled form field with description and error slots.
 * Wires up `htmlFor`, `aria-invalid`, and `aria-describedby` automatically.
 */
export function Field({ label, description, error, required, className, children }: FieldProps) {
  const id = useId()
  const descId = description ? `${id}-desc` : undefined
  const errId = error ? `${id}-err` : undefined

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </Label>
      )}
      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': cn(descId, errId) || undefined,
      })}
      {description && !error && (
        <p id={descId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p id={errId} className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}
