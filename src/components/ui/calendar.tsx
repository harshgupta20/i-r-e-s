import { useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

export interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date) => void
  /** Dates outside [min, max] are disabled. */
  minDate?: Date
  maxDate?: Date
  className?: string
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export function Calendar({ selected, onSelect, minDate, maxDate, className }: CalendarProps) {
  const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(selected ?? new Date()))

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewMonth)),
    end: endOfWeek(endOfMonth(viewMonth)),
  })

  const isDisabled = (day: Date) =>
    (minDate && day < minDate) || (maxDate && day > maxDate) || false

  return (
    <div className={cn('w-64 select-none p-3', className)}>
      <div className="mb-2 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setViewMonth((m) => subMonths(m, 1))}
          aria-label="Previous month"
        >
          <ChevronLeft />
        </Button>
        <span className="text-sm font-medium">{format(viewMonth, 'MMMM yyyy')}</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
        >
          <ChevronRight />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((d) => (
          <div key={d} className="grid h-8 place-items-center text-2xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}
        {days.map((day) => {
          const outside = !isSameMonth(day, viewMonth)
          const isSelected = selected && isSameDay(day, selected)
          const disabled = isDisabled(day)
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect?.(day)}
              className={cn(
                'grid h-8 place-items-center rounded-md text-sm transition-colors',
                'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                outside && 'text-muted-foreground/40',
                isToday(day) && !isSelected && 'font-semibold text-primary',
                isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
                disabled && 'pointer-events-none opacity-30',
              )}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
