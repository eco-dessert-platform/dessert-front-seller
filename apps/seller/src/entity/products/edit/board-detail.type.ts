import type { ApiResponse } from '../create/create.type'

/**
 * TODO(seller-board-detail-api):
 * 백엔드 seller 상품 단건 조회 API 스펙이 확정되면 이 타입을 실제 응답 DTO로 교체하세요.
 * 공용 Create/Update 요청 타입에 섞지 않기 위해 edit 전용 provisional 타입으로 분리합니다.
 */
export type ProvisionalBoardDetailProduct = {
  productId: number
  title: string
  /** 백엔드 Category Enum (예: BREAD, BAGEL) */
  category: string
  plusPriceWithBoardPrice: number
  stock: number
  dietaryTags: {
    glutenFreeTag: boolean
    highProteinTag: boolean
    sugarFreeTag: boolean
    veganTag: boolean
    ketogenicTag: boolean
  }
  availability: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  nutritionInfo: {
    totalWeight: number
    servingSize: number
    carbohydrates: number
    sugars: number
    protein: number
    fat: number
    calories: number
  } | null
}

export type ProvisionalSellerBoardDetail = {
  boardId: number
  title: string
  isFresh: boolean
  /** 백엔드 Enum 상수명 (예: T_03_04) */
  productionStartTime: string
  price: number
  discountType: 'AMOUNT' | 'RATE'
  discountValue: number
  deliveryCondition: string
  deliveryCompany: string
  deliveryFee: number
  freeShippingConditions: number
  thumbnailUrl: string
  subImageUrls: string[]
  boardDetailContent: string
  productInfoNotice: Record<string, string>
  products: ProvisionalBoardDetailProduct[]
}

export type GetSellerBoardDetailResponse =
  ApiResponse<ProvisionalSellerBoardDetail>
