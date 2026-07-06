import { format, isValid, parseISO } from 'date-fns'

/** Format a stored `yyyy-MM-dd` string as a friendly date, e.g. "Jul 5, 2026". */
export function formatDate(value: string, pattern = 'MMM d, yyyy'): string {
  if (!value) return '—'
  const parsed = parseISO(value)
  return isValid(parsed) ? format(parsed, pattern) : value
}

/** Human-readable file size, e.g. "1.4 MB". */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}
