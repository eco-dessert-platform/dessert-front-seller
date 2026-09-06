export type ProductOptionsType = {
  /** 기존 옵션 수정 시 유지. 신규 옵션은 undefined/null */
  productId?: number | null
  mainCategory: 'bread' | 'snack' | ''
  subCategory: string
  optionName: string
  ingredientCategories: ('glutenFree' | 'vegan')[]
  additionalPrice: number | null
  stockQuantity: number | null
  shippingDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  hasNutrition: boolean
  totalWeight: number | null
  servingSize: number | null
  carbohydrate: number | null
  sugar: number | null
  protein: number | null
  fat: number | null
  calories: number | null
}
