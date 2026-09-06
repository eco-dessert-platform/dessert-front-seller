import { useCallback, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { toast } from '@dessert/ui'
import { format, subDays } from 'date-fns'

import { buildPaymentHoldRequest } from '@/entity/settlement/payment-hold/api/build-payment-hold-request'
import { paymentHoldQueries } from '@/entity/settlement/payment-hold/api/payment-hold-queries'
import { paymentHoldService } from '@/entity/settlement/payment-hold/api/payment-hold-service'
import { DEFAULT_PAYMENT_HOLD_PAGE_SIZE } from '@/entity/settlement/payment-hold/constants'
import type { IPaymentHoldFilter } from '@/entity/settlement/payment-hold/entities'
import SettlementTitles from '@/features/settlement/common/titles'
import PaymentHoldFilter from '@/features/settlement/payment-hold/payment-hold-filter'
import PaymentHoldTable from '@/features/settlement/payment-hold/payment-hold-table'
import { triggerFileDownload } from '@/shared/utils/file-download'

import Layout from '../layout'

const PaymentHoldPage = () => {
  const [filters, setFilters] = useState<IPaymentHoldFilter>(() => {
    const today = new Date()

    return {
      dateType: 'BASE_DATE',
      startDate: format(subDays(today, 7), 'yyyy-MM-dd'),
      endDate: format(today, 'yyyy-MM-dd'),
      status: 'ALL',
      keyword: '',
      page: 0,
      size: DEFAULT_PAYMENT_HOLD_PAGE_SIZE,
    }
  })

  const { data: pageResponse } = useQuery(
    paymentHoldQueries.getPaymentHoldList(filters),
  )

  const updatePaymentHoldSearch = useCallback(
    (updates: Partial<IPaymentHoldFilter>) => {
      setFilters((prev) => ({
        ...prev,
        ...updates,
      }))
    },
    [],
  )

  const handleExcelDownload = useCallback(async () => {
    try {
      const { data, fileName } = await paymentHoldService.getExcelBlob(
        buildPaymentHoldRequest(filters),
      )
      triggerFileDownload(data, fileName)
      toast.info('지급 보류 내역 엑셀 파일이 다운로드 되었어요.', undefined, {
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
  }, [filters])

  return (
    <Layout>
      <SettlementTitles title="지급 보류 내역" />
      <PaymentHoldFilter
        appliedFilters={{
          dateType: filters.dateType,
          startDate: filters.startDate,
          endDate: filters.endDate,
          status: filters.status,
          searchType: filters.searchType,
          keyword: filters.keyword,
        }}
        onSearch={(searchFilters) =>
          updatePaymentHoldSearch({
            ...searchFilters,
            page: 0,
          })
        }
      />
      <PaymentHoldTable
        pageResponse={pageResponse}
        onPageChange={(nextPage) =>
          updatePaymentHoldSearch({ page: nextPage - 1 })
        }
        onExcelDownload={handleExcelDownload}
      />
    </Layout>
  )
}

export default PaymentHoldPage
