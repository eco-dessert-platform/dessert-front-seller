import { queryOptions } from '@tanstack/react-query'

import type { IPaymentHoldFilter } from '@/entity/settlement/payment-hold/entities'

import { buildPaymentHoldRequest } from './build-payment-hold-request'
import { paymentHoldKeys } from './payment-hold-keys'
import { paymentHoldService } from './payment-hold-service'

export const paymentHoldQueries = {
  getPaymentHoldList: (filters: IPaymentHoldFilter) =>
    queryOptions({
      queryKey: paymentHoldKeys.list(filters),
      queryFn: () =>
        paymentHoldService.getPaymentHoldList(buildPaymentHoldRequest(filters)),
    }),
}
