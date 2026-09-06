import { useCallback, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from '@dessert/ui'
import { format, subDays } from 'date-fns'

import { vatQueries } from '@/entity/settlement/vatreport/api/vatreport-queries'
import { vatService } from '@/entity/settlement/vatreport/api/vatreport-service'
import {
  DEFAULT_VAT_REPORT_PAGE_SIZE,
  vatDescriptions,
} from '@/entity/settlement/vatreport/constants'
import type { IVatReportFilter } from '@/entity/settlement/vatreport/entities'
import SettlementTitles from '@/features/settlement/common/titles'
import VatReportFilter from '@/features/settlement/vatreport/vatreport-filter'
import VatReportTable from '@/features/settlement/vatreport/vatreport-table'
import { triggerFileDownload } from '@/shared/utils/file-download'

import Layout from '../layout'

const Vatreport = () => {
  const [filters, setFilters] = useState<IVatReportFilter>(() => {
    const today = new Date()
    return {
      startDate: format(subDays(today, 7), 'yyyy-MM-dd'),
      endDate: format(today, 'yyyy-MM-dd'),
      page: 0,
      size: DEFAULT_VAT_REPORT_PAGE_SIZE,
    }
  })

  const { data, error, isError } = useQuery(vatQueries.getVatReport(filters))

  useEffect(() => {
    if (!isError) {
      return
    }

    toast.error(
      error instanceof Error
        ? error.message
        : '부가세 신고 내역 조회에 실패했습니다.',
      undefined,
      { position: 'bottom-right' },
    )
  }, [isError, error])

  const updateVatReportSearch = useCallback(
    (updates: Partial<IVatReportFilter>) => {
      setFilters((prev) => ({
        ...prev,
        ...updates,
      }))
    },
    [],
  )

  const handleExcelDownload = useCallback(async () => {
    try {
      const { data, fileName } = await vatService.getExcelBlob({
        startDate: filters.startDate,
        endDate: filters.endDate,
      })
      triggerFileDownload(data, fileName)
      toast.info('부가세 신고 내역 엑셀 파일이 다운로드 되었어요.', undefined, {
        position: 'bottom-right',
      })
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : '엑셀 다운로드에 실패했습니다.',
        undefined,
        { position: 'bottom-right' },
      )
    }
  }, [filters.startDate, filters.endDate])

  return (
    <Layout>
      <SettlementTitles
        title="부가세 신고 내역"
        descriptions={vatDescriptions}
      />
      <VatReportFilter
        filtersDate={{
          startDate: filters.startDate,
          endDate: filters.endDate,
        }}
        onSearch={(dateFilters) =>
          updateVatReportSearch({
            ...dateFilters,
            page: 0,
          })
        }
      />
      <VatReportTable
        items={data?.items}
        page={filters.page}
        size={filters.size}
        onPageChange={(nextPage) =>
          updateVatReportSearch({ page: nextPage - 1 })
        }
        onExcelDownload={handleExcelDownload}
      />
    </Layout>
  )
}

export default Vatreport
