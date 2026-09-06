import type { IPaymentHoldFilter } from '@/entity/settlement/payment-hold/entities'

export const paymentHoldKeys = {
  all: () => ['payment-hold'] as const,
  list: (filters: IPaymentHoldFilter) =>
    [...paymentHoldKeys.all(), filters] as const,
}
