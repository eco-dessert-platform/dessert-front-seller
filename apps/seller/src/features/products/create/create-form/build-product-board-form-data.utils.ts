import { CreateProductRequest, ProductOptionRequest } from '@/entity/products'

import { ProductOptionsType } from '../create-form-options'
import { CreateProductForm } from './product-create.types'
import { mapToBackendCategory } from './map-to-backend-category.utils'

/** Spring @ModelAttribute — 중첩은 dot, 배열은 bracket index */
export function appendFormValue(
  formData: FormData,
  key: string,
  value: unknown,
) {
  if (value === null || value === undefined) return

  if (value instanceof File) {
    formData.append(key, value, value.name)
    return
  }

  if (value instanceof Blob) {
    formData.append(key, value)
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      appendFormValue(formData, `${key}[${index}]`, item)
    })
    return
  }

  if (typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(
      ([childKey, childValue]) => {
        appendFormValue(formData, `${key}.${childKey}`, childValue)
      },
    )
    return
  }

  if (typeof value === 'boolean') {
    formData.append(key, value ? 'true' : 'false')
    return
  }

  formData.append(key, String(value))
}

function emptyNutritionInfo() {
  return {
    totalWeight: 0,
    servingSize: 0,
    carbohydrates: 0,
    sugars: 0,
    protein: 0,
    fat: 0,
    calories: 0,
  }
}

export function mapOptionToRequest(
  option: ProductOptionsType,
  productId?: number | null,
): ProductOptionRequest {
  const days = new Set(option.shippingDays)
  const categorySource = option.subCategory || option.mainCategory

  return {
    ...(productId != null ? { productId } : {}),
    title: option.optionName,
    category: mapToBackendCategory(categorySource),
    plusPriceWithBoardPrice: option.additionalPrice ?? 0,
    stock: option.stockQuantity ?? 0,
    dietaryTags: {
      glutenFreeTag: option.ingredientCategories.includes('glutenFree'),
      highProteinTag: option.protein != null && option.protein >= 11,
      sugarFreeTag: option.sugar != null && option.sugar < 5,
      veganTag: option.ingredientCategories.includes('vegan'),
      ketogenicTag: false,
    },
    availability: {
      monday: days.has('mon'),
      tuesday: days.has('tue'),
      wednesday: days.has('wed'),
      thursday: days.has('thu'),
      friday: days.has('fri'),
      saturday: days.has('sat'),
      sunday: days.has('sun'),
    },
    nutritionInfo: option.hasNutrition
      ? {
          totalWeight: option.totalWeight ?? 0,
          servingSize: option.servingSize ?? 0,
          carbohydrates: option.carbohydrate ?? 0,
          sugars: option.sugar ?? 0,
          protein: option.protein ?? 0,
          fat: option.fat ?? 0,
          calories: option.calories ?? 0,
        }
      : emptyNutritionInfo(),
  }
}

export function mapCreateFormToBoardRequest(
  data: CreateProductForm,
  productDetail: string,
  storeId: number,
): CreateProductRequest {
  return {
    storeId,
    title: data.productName,
    isFresh: data.isFresh,
    productionStartTime: data.productionTime,
    price: data.price ?? 0,
    discountType: data.discountType === 'won' ? 'AMOUNT' : 'RATE',
    discountValue: data.discountAmount ?? 0,
    deliveryCondition: data.deliveryTerms,
    deliveryCompany: data.deliveryCompany,
    deliveryFee: data.deliveryFee ?? 0,
    freeShippingConditions: data.deliveryMinFee ?? 0,
    products: data.options.map((option) => mapOptionToRequest(option)),
    boardDetailRequest: {
      content: productDetail,
    },
    productInfoNoticeRequest: data.productInfoNotice,
  }
}

export interface BuildProductBoardFormDataParams {
  data: CreateProductForm
  productDetail: string
  storeId: number
  /** 에디터에 삽입된 상세 이미지 (file.name === content data-id) */
  boardDetailImages?: File[]
}

/**
 * POST /api/v1/seller/boards
 * multipart/form-data + Spring @ModelAttribute (Content-Type 수동 지정 금지)
 */
export function buildProductBoardFormData({
  data,
  productDetail,
  storeId,
  boardDetailImages = [],
}: BuildProductBoardFormDataParams): FormData {
  if (!data.mainImage) {
    throw new Error('썸네일 이미지는 필수입니다.')
  }

  const request = mapCreateFormToBoardRequest(data, productDetail, storeId)
  const formData = new FormData()

  // storeId 포함 최상위/중첩/리스트 필드를 flatten append
  Object.entries(request).forEach(([key, value]) => {
    appendFormValue(formData, key, value)
  })

  formData.append('thumbnailImgFile', data.mainImage, data.mainImage.name)

  data.extraImages?.forEach((item) => {
    formData.append('productImgs', item.file, item.file.name)
  })

  boardDetailImages.forEach((file) => {
    formData.append('boardDetailImages', file, file.name)
  })

  return formData
}

export interface BuildUpdateProductBoardFormDataParams {
  data: CreateProductForm
  productDetail: string
  /** 옵션 index → 기존 productId (신규 옵션은 없음) */
  productIdsByOptionIndex?: Array<number | null | undefined>
  boardDetailImages?: File[]
  existingThumbnailUrl?: string
  existingSubImageUrls?: string[]
  newSubImageFiles?: File[]
}

/**
 * PUT /api/v1/seller/boards/{boardId}
 * storeId 미포함. 이미지 유지/교체 필드 지원.
 */
export function buildUpdateProductBoardFormData({
  data,
  productDetail,
  productIdsByOptionIndex = [],
  boardDetailImages = [],
  existingThumbnailUrl,
  existingSubImageUrls = [],
  newSubImageFiles = [],
}: BuildUpdateProductBoardFormDataParams): FormData {
  const formData = new FormData()

  appendFormValue(formData, 'title', data.productName)
  appendFormValue(formData, 'isFresh', data.isFresh)
  appendFormValue(formData, 'productionStartTime', data.productionTime)
  appendFormValue(formData, 'price', data.price ?? 0)
  appendFormValue(
    formData,
    'discountType',
    data.discountType === 'won' ? 'AMOUNT' : 'RATE',
  )
  appendFormValue(formData, 'discountValue', data.discountAmount ?? 0)
  appendFormValue(formData, 'deliveryCondition', data.deliveryTerms)
  appendFormValue(formData, 'deliveryCompany', data.deliveryCompany)
  appendFormValue(formData, 'deliveryFee', data.deliveryFee ?? 0)
  appendFormValue(
    formData,
    'freeShippingConditions',
    data.deliveryMinFee ?? 0,
  )
  appendFormValue(formData, 'boardDetailRequest.content', productDetail)
  appendFormValue(
    formData,
    'productInfoNoticeRequest',
    data.productInfoNotice,
  )

  data.options.forEach((option, index) => {
    const productId = productIdsByOptionIndex[index]
    appendFormValue(
      formData,
      `products[${index}]`,
      mapOptionToRequest(
        option,
        productId === undefined ? null : productId,
      ),
    )
  })

  if (data.mainImage) {
    formData.append('thumbnailImgFile', data.mainImage, data.mainImage.name)
  } else if (existingThumbnailUrl) {
    formData.append('existingThumbnailUrl', existingThumbnailUrl)
  }

  existingSubImageUrls.forEach((url) => {
    formData.append('existingSubImageUrls', url)
  })

  const subImages =
    newSubImageFiles.length > 0
      ? newSubImageFiles
      : (data.extraImages?.map((item) => item.file) ?? [])

  subImages.forEach((file) => {
    formData.append('newSubImages', file, file.name)
  })

  boardDetailImages.forEach((file) => {
    formData.append('boardDetailImages', file, file.name)
  })

  return formData
}
