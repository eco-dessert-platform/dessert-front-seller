import type { IVatReportFilter } from '@/entity/settlement/vatreport/entities'

export const vatKeys = {
  all: () => ['vat'] as const,
  list: ({ startDate, endDate }: IVatReportFilter) =>
    [...vatKeys.all(), { startDate, endDate }] as const,
}
