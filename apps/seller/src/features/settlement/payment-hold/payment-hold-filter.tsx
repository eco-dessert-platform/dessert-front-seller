import { Button, Input, Select } from '@dessert/ui'
import { Controller, FormProvider } from 'react-hook-form'
import type { DateRange } from 'react-day-picker'

import {
  PAYMENT_HOLD_DATE_TYPE_OPTIONS,
  PAYMENT_HOLD_SEARCH_TYPE_OPTIONS,
  PAYMENT_HOLD_STATUS_OPTIONS,
} from '@/entity/settlement/payment-hold/constants'
import type {
  IPaymentHoldSearchFilter,
  TPaymentHoldDateType,
  TPaymentHoldSearchType,
  TPaymentHoldStatus,
} from '@/entity/settlement/payment-hold/entities'
import type { PaymentHoldSearchFilterFormValues } from '@/entity/settlement/payment-hold/payment-hold-filter.schema'
import { dateToString, stringToDateRange } from '@/shared/utils/formatter'
import { DatePicker } from '@/widgets/date-picker'

import { usePaymentHoldFilterForm } from './use-payment-hold-filter-form.hook'

interface IPaymentHoldFilterProps {
  appliedFilters: IPaymentHoldSearchFilter
  onSearch: (filters: IPaymentHoldSearchFilter) => void
}

const PaymentHoldFilter = ({
  appliedFilters,
  onSearch,
}: IPaymentHoldFilterProps) => {
  const methods = usePaymentHoldFilterForm(appliedFilters)
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = methods

  const searchType = watch('searchType')
  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const handleDateChange = (range: DateRange | undefined) => {
    setValue('startDate', dateToString(range?.from))
    setValue('endDate', dateToString(range?.to))
  }

  const onSubmit = (values: PaymentHoldSearchFilterFormValues) => {
    onSearch({
      ...values,
      keyword: values.keyword.trim(),
    })
  }

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-16 rounded-12 border border-gray-100 bg-white p-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-end gap-16">
          <div className="flex items-end gap-8">
            <div className="w-[150px]">
              <Controller
                name="dateType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="조회기간"
                    options={PAYMENT_HOLD_DATE_TYPE_OPTIONS}
                    value={field.value}
                    onValueChange={(value) =>
                      field.onChange(value as TPaymentHoldDateType)
                    }
                  />
                )}
              />
            </div>
            <div className="w-[228px]">
              <DatePicker
                label=""
                value={stringToDateRange(startDate, endDate)}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="w-[150px]">
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  label="정산상태"
                  options={PAYMENT_HOLD_STATUS_OPTIONS}
                  value={field.value}
                  onValueChange={(value) =>
                    field.onChange(value as TPaymentHoldStatus)
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-end gap-8">
            <div className="w-[150px]">
              <Controller
                name="searchType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="검색구분"
                    options={PAYMENT_HOLD_SEARCH_TYPE_OPTIONS}
                    value={field.value}
                    placeholder="선택"
                    onValueChange={(value) => {
                      field.onChange(value as TPaymentHoldSearchType)
                      setValue('keyword', '')
                      clearErrors('keyword')
                    }}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name="keyword"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="검색어를 입력해주세요"
                    value={field.value ?? ''}
                    disabled={!searchType}
                    inputMode={
                      searchType === 'PAYMENT_HOLD_ID' ? 'numeric' : 'text'
                    }
                    error={!!errors.keyword}
                    onChange={(event) => {
                      const value =
                        searchType === 'PAYMENT_HOLD_ID'
                          ? event.target.value.replace(/\D/g, '')
                          : event.target.value
                      field.onChange(value)
                    }}
                  />
                )}
              />
            </div>
            <Button
              type="submit"
              title="조회"
              variant="primary-filled"
              size="md"
              className="ml-auto h-[38px] min-w-[60px]"
            />
          </div>
          {/* 에러 문구는 행 밖(아래)에 렌더해 items-end 정렬이 깨지지 않게 함 */}
          {errors.keyword?.message && (
            <span className="pl-[158px] typo-body-12-r text-error-500">
              {errors.keyword.message}
            </span>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export default PaymentHoldFilter
