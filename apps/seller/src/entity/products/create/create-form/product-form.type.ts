import { ProductInfoNoticeKey } from '../create-disclosure/product-disclosure.constant'
import type { ProductionStartTimeType } from '../create-info/production-time.constants'

export type ProductFormInput = {
  productName: string
  isFresh: boolean
  /** 백엔드 Enum 키 (예: T_03_04). 미선택 시 빈 문자열 */
  productionTime: ProductionStartTimeType | ''
  price: number | null
  discountAmount: number | null
  discountType: 'won' | 'percentage'
}

export type DeliveryFormInput = {
  deliveryTerms: string
  deliveryCompany: string
  deliveryFee: number | null
  deliveryMinFee: number | null
}

export type ProductOptionFormInput = {
  mainCategory: 'bread' | 'snack' | ''
  subCategory: string
  optionName: string
  ingredientCategories: ('glutenFree' | 'vegan')[]
  additionalPrice: number | null
  stockQuantity: number | null
  shippingDays: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[]
  hasNutrition: boolean
  totalWeight: number | null
  calories: number | null
  carbohydrate: number | null
  sugar: number | null
  protein: number | null
  fat: number | null
  sodium: number | null
}

export type ProductDisclosureFormInput = {
  productInfoNotice: Record<ProductInfoNoticeKey, string>
  productInfoNoticeMode: Record<ProductInfoNoticeKey, 'default' | 'manual'>
}
