import { format, parseISO } from 'date-fns'
import type { DateRange } from 'react-day-picker'

const toValidDate = (value?: string) => {
  if (!value) {
    return undefined
  }

  try {
    const parsed = parseISO(value)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed
  } catch {
    return undefined
  }
}

export const stringToDateRange = (start?: string, end?: string): DateRange => ({
  from: toValidDate(start),
  to: toValidDate(end),
})

export const dateToString = (date?: Date) =>
  date ? format(date, 'yyyy-MM-dd') : undefined

export const dateRangeToFilterDates = (range?: DateRange) => ({
  startDate: dateToString(range?.from),
  endDate: dateToString(range?.to),
})
