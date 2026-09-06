import { useEffect, useState } from 'react'

import { Button } from '@dessert/ui'
import { DateRange } from 'react-day-picker'

import { IChargeFilter } from '@/entity/settlement/charge/entities'
import {
  dateRangeToFilterDates,
  stringToDateRange,
} from '@/shared/utils/formatter'
import { DatePicker } from '@/widgets/date-picker'

interface IChargeFilterProps {
  filtersDate?: {
    startDate?: string
    endDate?: string
  }
  onSearch: (filters: Pick<IChargeFilter, 'startDate' | 'endDate'>) => void
  children: React.ReactNode
}

const ChargeFilter = ({
  filtersDate,

  onSearch,
  children,
}: IChargeFilterProps) => {
  // 직접 선언
  const startDate = filtersDate?.startDate
  const endDate = filtersDate?.endDate

  const [dateValue, setDateValue] = useState<DateRange | undefined>(() =>
    stringToDateRange(startDate, endDate),
  )

  // 외부(Props)에서 날짜가 변경되었을 때 상태 동기화
  useEffect(() => {
    setDateValue(stringToDateRange(startDate, endDate))
  }, [startDate, endDate])

  return (
    <div className="flex items-center justify-between rounded-12 border border-gray-100 bg-white py-16 px-24">
      <div className="flex items-end gap-8 w-[306px]">
        <DatePicker
          label="조회기간"
          value={dateValue}
          onChange={setDateValue}
        />

        {/* h-[42px] w-[70px] 에 맞는 버튼 사이즈가 없어서 임시 처리
         * 디자인팀에게게 버튼 사이즈 추가 요청 or 버튼 사이즈 통일화 요청이 필요
         */}
        <Button
          title="조회"
          variant="primary-filled"
          size="md"
          className="max-h-[42px] min-w-[70px]"
          onClick={() => onSearch(dateRangeToFilterDates(dateValue))}
        />
      </div>
      {children}
    </div>
  )
}

export default ChargeFilter
