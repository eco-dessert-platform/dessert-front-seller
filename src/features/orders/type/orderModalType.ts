import type { OrderSearchFilter } from './orderFilterType'

// OrderDetailModal 관련 타입
export interface OrderDetailModalProps {
    // TODO :: orderNum 배열 형태로 받은 뒤, 노출 처리
    orderList: string[]
    onClose: () => void
}

export interface SelectOption {
    value: string | number
    label: string
}

// OrderFilter 관련 타입
export interface OrderFilterProps {
    initialFilterValue: {
        orderStatus: string // TODO :: enum type
        startDate: Date
        endDate: Date
        searchType: string // TODO :: enum type
        keyword: string
    }
    orderStatusOptions: SelectOption[]
    searchOptions: SelectOption[]
    onSearch: (searchCondition: OrderSearchFilter) => void
}

// RejectImageUploader 관련 타입
export interface RejectImageUploaderProps {
    images: Array<{
        id: string
        previewSrc: string
    }>
    maxUploadCount: number
    onUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void
    onDeleteImage: (imageId: string) => void
}

// RejectModal 관련 타입
export type RejectType =
    | 'CANCEL'
    | 'CANCEL_REFUSE'
    | 'REFUND'
    | 'REFUND_REFUSE'
    | 'REFUND_PENDING'
    | 'CHANGE'
    | 'CHANGE_REFUSE'
    | 'CHANGE_PENDING'

export interface RejectModalProps {
    rejectType: RejectType
    title: string
    onConfirm: () => void
    onCancel?: () => void
}

export interface RejectInputValue {
    type: null | string
    reason: string
    images: string[]
}

// TrackingNumberModal 관련 타입
export interface TrackingNumberModalProps {
    type: 'register' | 'modify'
    courierCompany?: string
    trackingNumber?: string
    onConfirm: () => void
    onCancel: () => void
}

// OrderControlButtons 관련 타입
import type { TabCategory } from './orderStatusType'
import type { ActionType } from './orderActionType'

export interface OrderControlButtonsProps {
    activeTab: TabCategory
    onClick: (actionType: ActionType) => void
}
