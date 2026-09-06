import { z } from 'zod'

export const paymentHoldSearchFilterSchema = z
  .object({
    dateType: z.enum(['BASE_DATE', 'COMPLETED_DATE']),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.enum(['ALL', 'ON_HOLD', 'RELEASED']),
    searchType: z.enum(['PAYMENT_HOLD_ID', 'SETTLEMENT_ID']).optional(),
    keyword: z.string(),
  })
  .superRefine(({ searchType, keyword }, ctx) => {
    if (!searchType) return

    const trimmedKeyword = keyword.trim()
    if (!trimmedKeyword) {
      ctx.addIssue({
        code: 'custom',
        message: '검색어를 입력해주세요.',
        path: ['keyword'],
      })
      return
    }

    if (searchType === 'PAYMENT_HOLD_ID' && !/^\d+$/.test(trimmedKeyword)) {
      ctx.addIssue({
        code: 'custom',
        message: '지급보류ID는 숫자만 입력할 수 있어요.',
        path: ['keyword'],
      })
    }
  })

export type PaymentHoldSearchFilterFormValues = z.infer<
  typeof paymentHoldSearchFilterSchema
>
