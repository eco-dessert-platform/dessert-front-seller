import { useCallback, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Button, Text } from '@dessert/ui'
import { format, subDays } from 'date-fns'
import type { IChargeFilter } from '@/entity/settlement/charge/entities'
import { chargeQueries } from '@/entity/settlement/charge/api/charge-queries'
import ChargeFilter from '@/features/settlement/charge/charge-filter'
import ChargeTable from '@/features/settlement/charge/charge-table'

import Layout from '../layout'
import ChargeWithdrawModal from '@/features/settlement/charge/modal/charge-withdraw-modal'
import SettlementTitles from '@/features/settlement/common/titles'

const ChargePage: React.FC = () => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
  const [filters, setFilters] = useState<IChargeFilter>(() => {
    const today = new Date()
    return {
      startDate: format(subDays(today, 7), 'yyyy-MM-dd'),
      endDate: format(today, 'yyyy-MM-dd'),
      page: 0,
    }
  })

  const { data } = useQuery(chargeQueries.getChargeBalance(filters))
  const { data: accountVerification } = useQuery(
    chargeQueries.getAccountVerification(),
  )

  const updateChargeSearch = useCallback((updates: Partial<IChargeFilter>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }))
  }, [])

  return (
    <>
      <Layout>
        <SettlementTitles title="충전금 현황" />
        <ChargeFilter
          filtersDate={{
            startDate: filters.startDate,
            endDate: filters.endDate,
          }}
          onSearch={(dateFilters) =>
            updateChargeSearch({
              ...dateFilters,
              page: 0,
            })
          }
        >
          <div className="flex items-center gap-12">
            <Text as="span" variant="title16-m">
              충전금 잔액
            </Text>
            <Text as="span" variant="title16-m" color="primary-500">
              {(data?.chargeBalance ?? 0).toLocaleString()}원
            </Text>
            <Button
              title="출금하기"
              variant="primary-outlined"
              size="sm"
              className="max-h-[31px] min-w-[61px] rounded-[4px]"
              onClick={() => setIsWithdrawModalOpen(true)}
            />
          </div>
        </ChargeFilter>
        <ChargeTable
          pageResponse={data?.pageResponse}
          onPageChange={(nextPage) =>
            updateChargeSearch({ page: nextPage - 1 })
          }
        />
      </Layout>
      <ChargeWithdrawModal
        open={isWithdrawModalOpen}
        onOpenChange={setIsWithdrawModalOpen}
        chargeBalance={data?.chargeBalance ?? 0}
        accountVerification={accountVerification}
      />
    </>
  )
}

export default ChargePage
