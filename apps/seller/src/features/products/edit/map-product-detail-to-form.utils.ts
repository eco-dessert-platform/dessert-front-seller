import { DISCLOSURE_FIELDS } from '@/entity/products'
import type {
  ProvisionalBoardDetailProduct,
  ProvisionalSellerBoardDetail,
} from '@/entity/products'
import { toProductionStartTimeFormValue } from '@/entity/products/create/create-info/production-time.constants'
import { DEFAULT_PRODUCT_OPTION } from '@/features/products/create'
import type { CreateProductForm , ProductOptionsType } from '@/features/products/create'
import type { ExtraImageItem } from '@/features/products/create/create-form-thumbnail/create-form-thumbnail.type'

/**
 * 백엔드 Category Enum → 프론트 main/subCategory.
 * TODO(seller-board-detail-api): 카테고리 매핑 규칙 확정 시 갱신.
 */
const BACKEND_CATEGORY_TO_FORM: Record<
  string,
  { mainCategory: 'bread' | 'snack'; subCategory: string }
> = {
  BREAD: { mainCategory: 'bread', subCategory: 'bread_white' },
  BAGEL: { mainCategory: 'bread', subCategory: 'bread_bagel' },
  CAKE: { mainCategory: 'bread', subCategory: 'bread_cake' },
  COOKIE: { mainCategory: 'snack', subCategory: 'snack_cookie' },
  GRANOLA: { mainCategory: 'snack', subCategory: 'snack_granola' },
  JAM: { mainCategory: 'snack', subCategory: 'snack_jam' },
  ETC: { mainCategory: 'bread', subCategory: 'bread_etc' },
}

function mapBackendCategoryToForm(category: string): {
  mainCategory: 'bread' | 'snack' | ''
  subCategory: string
} {
  const mapped = BACKEND_CATEGORY_TO_FORM[category.trim().toUpperCase()]
  if (mapped) return mapped

  const lower = category.trim().toLowerCase()
  if (lower.startsWith('bread_') || lower.startsWith('snack_')) {
    return {
      mainCategory: lower.startsWith('bread') ? 'bread' : 'snack',
      subCategory: lower,
    }
  }

  return { mainCategory: '', subCategory: '' }
}

function mapAvailabilityToShippingDays(
  availability: ProvisionalBoardDetailProduct['availability'],
): ProductOptionsType['shippingDays'] {
  const days: ProductOptionsType['shippingDays'] = []
  if (availability.monday) days.push('mon')
  if (availability.tuesday) days.push('tue')
  if (availability.wednesday) days.push('wed')
  if (availability.thursday) days.push('thu')
  if (availability.friday) days.push('fri')
  if (availability.saturday) days.push('sat')
  if (availability.sunday) days.push('sun')
  return days
}

function mapProductOption(
  product: ProvisionalBoardDetailProduct,
): ProductOptionsType {
  const { mainCategory, subCategory } = mapBackendCategoryToForm(
    product.category,
  )
  const nutrition = product.nutritionInfo
  const hasNutrition = nutrition != null

  const ingredientCategories: ProductOptionsType['ingredientCategories'] = []
  if (product.dietaryTags.glutenFreeTag) {
    ingredientCategories.push('glutenFree')
  }
  if (product.dietaryTags.veganTag) {
    ingredientCategories.push('vegan')
  }

  return {
    ...DEFAULT_PRODUCT_OPTION,
    productId: product.productId,
    mainCategory,
    subCategory,
    optionName: product.title,
    ingredientCategories:
      ingredientCategories.length > 0 ? ingredientCategories : ['glutenFree'],
    additionalPrice: product.plusPriceWithBoardPrice,
    stockQuantity: product.stock,
    shippingDays: mapAvailabilityToShippingDays(product.availability),
    hasNutrition,
    totalWeight: nutrition?.totalWeight ?? null,
    servingSize: nutrition?.servingSize ?? null,
    carbohydrate: nutrition?.carbohydrates ?? null,
    sugar: nutrition?.sugars ?? null,
    protein: nutrition?.protein ?? null,
    fat: nutrition?.fat ?? null,
    calories: nutrition?.calories ?? null,
  }
}

function mapDisclosure(notice: Record<string, string>): Pick<
  CreateProductForm,
  'productInfoNotice' | 'productInfoNoticeMode'
> {
  const productInfoNotice = {} as CreateProductForm['productInfoNotice']
  const productInfoNoticeMode =
    {} as CreateProductForm['productInfoNoticeMode']

  DISCLOSURE_FIELDS.forEach((field) => {
    const value = notice[field.key] ?? ''
    productInfoNotice[field.key] = value
    // 값이 있으면 직접 입력으로 간주. 기본값 텍스트 스펙이 확정되면 교체 필요.
    productInfoNoticeMode[field.key] =
      value.trim().length > 0 ? 'manual' : 'default'
  })

  return { productInfoNotice, productInfoNoticeMode }
}

function generateImageId() {
  return Math.random().toString(36).substring(2, 11)
}

export type MappedBoardDetailForForm = {
  formValues: CreateProductForm
  productDetail: string
}

/**
 * provisional 단건 조회 응답 → 등록 Form values + 상세 HTML.
 * API 응답 구조가 바뀌면 이 매퍼만 수정하면 됩니다.
 */
export function mapProductDetailToFormValues(
  detail: ProvisionalSellerBoardDetail,
): MappedBoardDetailForForm {
  const disclosure = mapDisclosure(detail.productInfoNotice ?? {})

  const extraImages: ExtraImageItem[] = (detail.subImageUrls ?? []).map(
    (url) => ({
      id: generateImageId(),
      kind: 'existing' as const,
      url,
    }),
  )

  const options =
    detail.products.length > 0
      ? detail.products.map(mapProductOption)
      : [
          {
            ...DEFAULT_PRODUCT_OPTION,
          } as CreateProductForm['options'][number],
        ]

  const formValues: CreateProductForm = {
    productName: detail.title,
    isFresh: detail.isFresh,
    productionTime: toProductionStartTimeFormValue(detail.productionStartTime),
    price: detail.price,
    discountAmount: detail.discountValue,
    discountType: detail.discountType === 'RATE' ? 'percentage' : 'won',
    deliveryTerms: detail.deliveryCondition,
    deliveryCompany: detail.deliveryCompany,
    deliveryFee: detail.deliveryFee,
    deliveryMinFee: detail.freeShippingConditions,
    mainImage: detail.thumbnailUrl
      ? { kind: 'existing', url: detail.thumbnailUrl }
      : null,
    extraImages,
    options,
    ...disclosure,
  }

  return {
    formValues,
    productDetail: detail.boardDetailContent ?? '',
  }
}
