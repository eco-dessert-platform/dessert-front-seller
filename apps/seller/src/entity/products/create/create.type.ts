// API 요청 타입
export interface CreateProductRequest {
  storeId: number
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
  products: ProductOptionRequest[]
  boardDetailRequest: {
    content: string
  }
  productInfoNoticeRequest: Record<string, string>
}

/** 수정 요청 — storeId 없음, 기존 옵션은 productId 포함 */
export interface UpdateProductRequest {
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
  products: ProductOptionRequest[]
  boardDetailRequest: {
    content: string
  }
  productInfoNoticeRequest: Record<string, string>
}

export interface ProductOptionRequest {
  /** 기존 옵션 수정 시 필수, 신규 옵션은 omit/null */
  productId?: number | null
  title: string
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

export interface DeleteProductBoardsRequest {
  storeId: number
  boardIds: number[]
}

// API 응답 타입
export interface StoreInfo {
  storeId: number
  name: string
  introduce: string
  profile: string
  phoneNumber: string
  email: string
}

export interface CreateProductBoardResult {
  boardId?: number
  [key: string]: unknown
}

export interface ApiResponse<T> {
  success: boolean
  code: number
  message: string
  result: T
}
