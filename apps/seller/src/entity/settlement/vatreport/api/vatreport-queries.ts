import { queryOptions } from '@tanstack/react-query'

import type { IVatReportFilter } from '@/entity/settlement/vatreport/entities'
import { vatService } from '@/entity/settlement/vatreport/api/vatreport-service'

import { vatKeys } from './vatreport-keys'

export const vatQueries = {
  getVatReport: (filters: IVatReportFilter) =>
    queryOptions({
      queryKey: vatKeys.list(filters),
      queryFn: () => vatService.getVatReport(filters),
    }),
}
