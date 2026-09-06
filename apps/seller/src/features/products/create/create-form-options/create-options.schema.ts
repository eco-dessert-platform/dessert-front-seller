import { z } from 'zod'

export const productOptionSchema = z
  .object({
    productId: z.number().nullable().optional(),
    mainCategory: z.enum(['bread', 'snack']).or(z.literal('')),
    subCategory: z.string(),
    optionName: z.string(),
    ingredientCategories: z.array(z.enum(['glutenFree', 'vegan'])),
    additionalPrice: z.union([
      z
        .number({ error: '올바른 가격을 입력해주세요' })
        .min(-100000, '올바른 가격을 입력해주세요')
        .max(100000, '올바른 가격을 입력해주세요'),
      z.null(),
    ]),
    stockQuantity: z.union([z.number().int().min(0), z.null()]),
    shippingDays: z.array(
      z.enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']),
    ),
    hasNutrition: z.boolean(),
    totalWeight: z.union([z.number().min(0), z.null()]),
    servingSize: z.union([z.number().min(0), z.null()]),
    carbohydrate: z.union([z.number().min(0), z.null()]),
    sugar: z.union([z.number().min(0), z.null()]),
    protein: z.union([z.number().min(0), z.null()]),
    fat: z.union([z.number().min(0), z.null()]),
    calories: z.union([z.number().min(0), z.null()]),
  })
  .refine((data) => data.mainCategory !== '', {
    message: '상품 카테고리를 선택해주세요',
    path: ['mainCategory'],
  })
  .refine(
    (data) =>
      data.optionName === '' ||
      (data.optionName.length >= 1 && data.optionName.length <= 49),
    { message: '1자 이상 50자 미만으로 입력해 주세요', path: ['optionName'] },
  )
  .refine((data) => data.additionalPrice !== null, {
    message: '',
    path: ['additionalPrice'],
  })
