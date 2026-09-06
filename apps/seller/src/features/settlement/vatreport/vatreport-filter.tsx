import { useEffect, useState } from 'react'

import { Button, Text, Tooltip } from '@dessert/ui'
import { format, parseISO } from 'date-fns'
import { Info } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { VAT_SALES_PERIOD_TOOLTIP } from '@/entity/settlement/vatreport/constants'
import { IVatReportFilter } from '@/entity/settlement/vatreport/entities'
import { DatePicker } from '@/widgets/date-picker'

const stringToDateRange = (start?: string, end?: string): DateRange => ({
  from: start ? parseISO(start) : undefined,
  to: end ? parseISO(end) : undefined,
})

interface IVatReportFilterProps {
  filtersDate?: {
    startDate?: string
    endDate?: string
  }
  onSearch: (filters: Pick<IVatReportFilter, 'startDate' | 'endDate'>) => void
}

const VatReportFilter = ({ filtersDate, onSearch }: IVatReportFilterProps) => {
  const startDate = filtersDate?.startDate
  const endDate = filtersDate?.endDate

  const [dateValue, setDateValue] = useState<DateRange | undefined>(() =>
    stringToDateRange(startDate, endDate),
  )

  useEffect(() => {
    setDateValue(stringToDateRange(startDate, endDate))
  }, [startDate, endDate])

  return (
    <div className="flex items-center rounded-12 border border-gray-100 bg-white py-16 px-24">
      <div className="flex w-[306px] items-end gap-8">
        <DatePicker
          label="매출기간"
          labelSuffix={
            <Tooltip position="right" align="center">
              <Tooltip.Trigger>
                <Info size={18} aria-label="매출기간" />
              </Tooltip.Trigger>
              <Tooltip.Content className="px-8 py-6">
                <Text variant="body10-r" color="white">
                  {VAT_SALES_PERIOD_TOOLTIP}
                </Text>
              </Tooltip.Content>
            </Tooltip>
          }
          value={dateValue}
          onChange={setDateValue}
        />

        <Button
          title="조회"
          variant="primary-filled"
          size="md"
          className="max-h-[42px] min-w-[70px]"
          onClick={() =>
            onSearch({
              startDate: dateValue?.from
                ? format(dateValue.from, 'yyyy-MM-dd')
                : undefined,
              endDate: dateValue?.to
                ? format(dateValue.to, 'yyyy-MM-dd')
                : undefined,
            })
          }
        />
      </div>
    </div>
  )
}

export default VatReportFilter
