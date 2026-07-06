import { useCallback, useRef, useState } from 'react'
import { FileText, UploadCloud, X } from 'lucide-react'
import { UPLOAD } from '@/constants'
import { formatBytes } from '@/lib/format'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'

export interface FileDropzoneProps {
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
  maxSizeBytes?: number
  disabled?: boolean
  onError?: (message: string) => void
}

export function FileDropzone({
  file,
  onFileChange,
  accept = UPLOAD.accept,
  maxSizeBytes = UPLOAD.maxSizeBytes,
  disabled,
  onError,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)

  const validateAndSet = useCallback(
    (candidate: File | undefined) => {
      if (!candidate) return
      if (candidate.size > maxSizeBytes) {
        onError?.(`File is too large. Maximum size is ${formatBytes(maxSizeBytes)}.`)
        return
      }
      onFileChange(candidate)
    },
    [maxSizeBytes, onError, onFileChange],
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    validateAndSet(e.dataTransfer.files[0])
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onFileChange(null)}
          disabled={disabled}
          aria-label="Remove file"
        >
          <X />
        </Button>
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      aria-disabled={disabled}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-muted/40 px-6 py-10 text-center transition-colors',
        'hover:border-primary/50 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        dragging && 'border-primary bg-primary/5',
        disabled && 'pointer-events-none opacity-60',
      )}
    >
      <div className="mb-3 grid size-11 place-items-center rounded-xl border border-border bg-surface text-muted-foreground shadow-sm">
        <UploadCloud className="size-5" />
      </div>
      <p className="text-sm font-medium">
        <span className="text-primary">Click to upload</span> or drag and drop
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Up to {formatBytes(maxSizeBytes)} · hashed locally in your browser
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => validateAndSet(e.target.files?.[0])}
      />
    </div>
  )
}
