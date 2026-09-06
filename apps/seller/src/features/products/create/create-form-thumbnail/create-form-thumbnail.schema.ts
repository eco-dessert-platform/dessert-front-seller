import { z } from 'zod'

const existingImageRefSchema = z.object({
  kind: z.literal('existing'),
  url: z.string().min(1),
})

const extraImageItemSchema = z.union([
  z.object({
    id: z.string(),
    kind: z.literal('file'),
    file: z.instanceof(File),
  }),
  z.object({
    id: z.string(),
    kind: z.literal('existing'),
    url: z.string().min(1),
  }),
])

export const thumbnailSchema = z.object({
  mainImage: z
    .union([z.instanceof(File), existingImageRefSchema])
    .nullable()
    .refine((v) => v !== null, {
      error: '대표 이미지는 필수 입력사항입니다.',
    }),
  extraImages: z
    .array(extraImageItemSchema)
    .max(9, { error: '추가 이미지는 최대 9개까지 등록 가능합니다.' })
    .default([]),
})
