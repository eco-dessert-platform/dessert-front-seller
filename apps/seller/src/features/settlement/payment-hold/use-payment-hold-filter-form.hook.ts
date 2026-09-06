import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { IPaymentHoldSearchFilter } from '@/entity/settlement/payment-hold/entities'
import {
  type PaymentHoldSearchFilterFormValues,
  paymentHoldSearchFilterSchema,
} from '@/entity/settlement/payment-hold/payment-hold-filter.schema'

export const usePaymentHoldFilterForm = (
  appliedFilters: IPaymentHoldSearchFilter,
) => {
  const methods = useForm<PaymentHoldSearchFilterFormValues>({
    resolver: zodResolver(paymentHoldSearchFilterSchema),
    defaultValues: appliedFilters,
    mode: 'onSubmit',
  })

  const { reset } = methods

  useEffect(() => {
    reset(appliedFilters)
  }, [appliedFilters, reset])

  return methods
}
