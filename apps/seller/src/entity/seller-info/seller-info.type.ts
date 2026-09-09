export interface Store {
  storeId: number
  name: string
  introduce: string
  profile: string
  phoneNumber: string
  subPhoneNumber: string
  email: string
  originAddress: string
  originAddressDetail: string
}

export interface StoreNameCheckResult {
  available: boolean
  store: Store | null
}

export interface MyStoreSummary {
  // 변경 신청 가능 여부: 이미 변경했거나 PENDING 이면 false
  available: boolean
  store: Store
}

export type StoreNameRequestStatus = 'PENDING' | 'REJECT' | 'APPROVE'

export type StoreNameRejectCategory =
  | 'ADMIN_INAPPROPRIATE'
  | 'BRAND_NAME_MISUSE'
  | 'OFFICIAL_STORE_CONFUSION'
  | 'INAPPROPRIATE_LANGUAGE'
  | 'PRODUCT_CATEGORY_NAME'
  | 'CONTACT_INFO_INCLUDED'
  | 'ADVERTISING_PHRASE'
  | 'SIMILAR_TO_EXISTING_STORE'
  | 'ETC'

export interface UpdateStoreNameRequest {
  newName: string
}

export interface UpdateStoreNameResult {
  sellerId: number
  storeId: number
  storeNameRequestId: number
  currentName: string
  newName: string
  status: StoreNameRequestStatus
  rejectCategory: StoreNameRejectCategory | null
  rejectDetail: string | null
}

export interface UpdateStoreDetailRequest {
  // 스토어명은 이 화면에서 수정 불가(별도 변경 신청 플로우)지만 PUT 명세상 필수라 현재 값을 그대로 전송.
  storeName: string
  introduce: string
  phoneNumber: string
  subPhoneNumber: string
  email: string
  originAddress: string
  originAddressDetail: string
}

export interface UpdateStoreDetailInput {
  request: UpdateStoreDetailRequest
  profileImage?: File | null
}

export type UpdateStoreDetailResult = Store

export interface AccountVerificationDetail {
  id: number
  sellerId: number
  bankCode: string
  accountNumber: string
  accountHolder: string
  verified: boolean
  createdAt: string
}

export interface AccountVerificationRequest {
  bankCode: string
  accountNumber: string
}

export interface AccountVerificationResult {
  id: number
  sellerId: number
  verified: boolean
  createdAt: string
}

export interface SellerAccountUpdateRequest {
  bankCode: string
  accountNumber: string
}
