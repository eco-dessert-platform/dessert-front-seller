import { format, parseISO, subMonths } from 'date-fns'

import type {
  IVatReportFilter,
  IVatReportResponse,
  IVatReportRow,
} from './entities'

export const vatReportRowMock: IVatReportRow = {
  month: '2025-04',
  taxableSalesAmount: 1875000,
  taxFreeSalesAmount: 320000,
  creditCardAmount: 1250000,
  cashReceiptIncomeDeductionAmount: 430000,
  cashReceiptExpenseProofAmount: 260000,
  etcAmount: 255000,
}

export const vatReportResultMock: IVatReportResponse = {
  startMonth: '2024-09',
  endMonth: '2025-04',
  items: [vatReportRowMock],
}

const MOCK_ITEMS: IVatReportRow[] = Array.from({ length: 12 }, (_, index) => {
  const month = format(subMonths(new Date(), 11 - index), 'yyyy-MM')

  return {
    month,
    taxableSalesAmount: 1875000 + index * 12000,
    taxFreeSalesAmount: 320000 + index * 5000,
    creditCardAmount: 1250000 + index * 8000,
    cashReceiptIncomeDeductionAmount: 430000 + index * 3000,
    cashReceiptExpenseProofAmount: 260000 + index * 2000,
    etcAmount: 255000 + index * 4000,
  }
})

const toMonthParam = (date?: string) => {
  if (!date) {
    return undefined
  }

  return format(parseISO(date), 'yyyy-MM')
}

export const getVatReportMock = (
  filters: IVatReportFilter = {},
): IVatReportResponse => {
  const startMonth = toMonthParam(filters.startDate) ?? '2024-09'
  const endMonth = toMonthParam(filters.endDate) ?? '2025-04'

  const items = MOCK_ITEMS.filter(
    (item) => item.month >= startMonth && item.month <= endMonth,
  )

  return {
    startMonth,
    endMonth,
    items,
  }
}
