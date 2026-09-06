import { z } from 'zod'

import { BANK_CODES } from './seller-info.const'

const BANK_CODE_SET: ReadonlySet<string> = new Set(
  BANK_CODES.map((b) => b.code),
)

export const storeNameSchema = z.object({
  storeName: z
    .string()
    .trim()
    .min(3, '스토어명은 3~50자 이내로 입력해주세요.')
    .max(50, '스토어명은 3~50자 이내로 입력해주세요.'),
})

export type StoreNameFormValues = z.infer<typeof storeNameSchema>

// accountHolder 는 토스 인증이 채워주는 값이므로 폼 검증 대상이 아님 — GET 응답으로만 표시.
export const storeAccountInfoSchema = z.object({
  bankCode: z
    .string()
    .refine((v) => BANK_CODE_SET.has(v), '은행을 선택해주세요.'),
  accountNumber: z
    .string()
    .min(1, '계좌번호를 입력해주세요.')
    .regex(/^[0-9-]+$/, '숫자만 입력해주세요.')
    .refine((v) => /\d/.test(v), '계좌번호를 입력해주세요.'),
})

export type StoreAccountInfoFormValues = z.infer<typeof storeAccountInfoSchema>

const PHONE_NUMBER_REGEX = /^\d{9,11}$/

export const storeDetailSchema = z
  .object({
    introduce: z.string().max(100, '100자 이내로 입력해주세요.'),
    phoneNumber: z
      .string()
      .min(1, '연락처를 입력해주세요.')
      .regex(PHONE_NUMBER_REGEX, '하이픈 없이 숫자 9~11자리로 입력해주세요.'),
    subPhoneNumber: z
      .string()
      .optional()
      .refine(
        (value) => !value || PHONE_NUMBER_REGEX.test(value),
        '하이픈 없이 숫자 9~11자리로 입력해주세요.',
      ),
    emailLocal: z.string().min(1, '이메일을 입력해주세요.'),
    emailDomain: z.string().min(1, '도메인을 선택해주세요.'),
    originAddress: z.string().min(1, '주소를 입력해주세요.'),
    originAddressDetail: z
      .string()
      .min(1, '상세주소를 입력해주세요.')
      .max(50, '상세주소는 50자 이내로 입력해주세요.'),
  })
  .superRefine(({ emailLocal, emailDomain }, ctx) => {
    const combined = `${emailLocal}@${emailDomain}`
    if (!z.string().email().safeParse(combined).success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '올바른 이메일 형식이 아니에요.',
        path: ['emailLocal'],
      })
    }
  })

export type StoreDetailFormValues = z.infer<typeof storeDetailSchema>
