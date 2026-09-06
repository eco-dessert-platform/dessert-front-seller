import { Button } from '@dessert/ui'
import { format, parse } from 'date-fns'
import { DateRange } from 'react-day-picker'

import {
  DailySettlementFilters,
  SettlementSummaryInfo,
} from '@/entity/settlement/settlement.type'
import { DatePicker } from '@/shared/block/date-picker/date-picker'

interface SettlementOverviewProps {
  filters: DailySettlementFilters
  onChange: (filters: DailySettlementFilters) => void
  onSearch: () => void
  summary?: SettlementSummaryInfo
}

export const SettlementOverview = ({
  filters,
  onChange,
  onSearch,
  summary,
}: SettlementOverviewProps) => {
  const dateValue: DateRange | undefined =
    filters.startDate || filters.endDate
      ? {
          from: filters.startDate
            ? parse(filters.startDate, 'yyyy-MM-dd', new Date())
            : undefined,
          to: filters.endDate
            ? parse(filters.endDate, 'yyyy-MM-dd', new Date())
            : undefined,
        }
      : undefined

  return (
    <div className="rounded-12 border border-gray-100 bg-white p-24">
      <div className="mb-10 flex items-end gap-8">
        <div className="w-[228px]">
          <DatePicker
            label="조회기간"
            value={dateValue}
            onChange={(range) => {
              onChange({
                ...filters,
                startDate: range?.from
                  ? format(range.from, 'yyyy-MM-dd')
                  : null,
                endDate: range?.to ? format(range.to, 'yyyy-MM-dd') : null,
              })
            }}
          />
        </div>
        <Button
          title="조회"
          variant="primary-filled"
          size="md"
          className="h-[38px] min-w-[60px]"
          onClick={onSearch}
        />
      </div>

      <div
        className={
          'flex items-center gap-40 rounded-10 bg-primary-50 px-16 py-4'
        }
      >
        <div className="flex items-center gap-16 py-4">
          <span className="typo-title-16-m text-gray-800">정산예정일</span>
          <span className="typo-title-16-m text-primary-500">
            {summary?.scheduledDateMin && summary?.scheduledDateMax
              ? `${summary.scheduledDateMin} ~ ${summary.scheduledDateMax}`
              : '-'}
          </span>
        </div>
        <div className="flex items-center gap-16 py-4">
          <span className="typo-title-16-m text-gray-800">총 정산 금액</span>
          <div className="flex items-baseline gap-2">
            <span className="typo-heading-20-sb text-primary-500">
              {(summary?.totalSettlementAmount ?? 0).toLocaleString()}
            </span>
            <span className="typo-title-16-r text-primary-500">원</span>
          </div>
        </div>
      </div>
    </div>
  )
}
