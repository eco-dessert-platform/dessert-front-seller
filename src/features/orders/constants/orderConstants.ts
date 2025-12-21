// 페이지네이션 상수
export const PAGINATION = {
    PAGE_SIZE: 100,
    DEFAULT_PAGE: 0,
} as const

// 입력 제한 상수
export const INPUT_LIMITS = {
    KEYWORD_MIN_LENGTH: 1,
    KEYWORD_MAX_LENGTH: 50,
    REASON_MIN_LENGTH: 10,
    REASON_MAX_LENGTH: 2000,
} as const

// 날짜 범위 상수
export const DATE_RANGE = {
    DEFAULT_WEEKS: 1,
    DEFAULT_MONTHS: 1,
} as const

// 모달 타입 상수
export const MODAL_TYPE = {
    NO_SELECT: 'noSelect',
    NO_KEYWORD: 'noKeyword',
    ORDER_DETAIL: 'orderDetail',
    REGIST_TRACKING_NUMBER: 'registTrackingNumber',
    MODIFY_TRACKING_NUMBER: 'modifyTrackingNumber',
    REFUND: 'refund',
    CANCEL_REFUSE: 'cancelRefuse',
} as const

// 탭 카테고리 상수
export const TAB_CATEGORY = {
    ALL: 'ALL',
    PAID: 'PAID',
    CHECKED: 'CHECKED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    PAYMENT_COMPLETED: 'PAYMENT_COMPLETED',
    REFUND: 'REFUND',
    CHANGE: 'CHANGE',
    PURCHASED: 'PURCHASED',
    CANCELED: 'CANCELED',
    RETURNED: 'RETURNED',
    EXCHANGED: 'EXCHANGED',
} as const

// 필터 기본값 상수
export const FILTER_DEFAULTS = {
    ORDER_STATUS: 'ALL',
    SEARCH_TYPE_ORDER: 'ORDER_NUMBER',
    SEARCH_TYPE_RECEIVER: 'RECEIVER_NAME',
    SEARCH_TYPE_PRODUCT: 'PRODUCT_NAME',
    SEARCH_TYPE_TRACKING: 'TRACKING_NUMBER',
} as const

// UI 텍스트 상수
export const UI_TEXT = {
    PLACEHOLDER: {
        KEYWORD: '1~50자로 입력해주세요.',
        REASON: '내용을 자세하게 입력해주세요.',
        TRACKING_NUMBER: '운송장 번호를 입력해주세요.',
    },
    VALIDATION: {
        REASON_MIN_LENGTH: '10자 이상 사유를 작성해주세요',
        NO_KEYWORD: '상세 검색 내용을 입력해주세요.',
        NO_SELECT: '주문을 선택해주세요.',
        NO_SELECT_DESCRIPTION:
            '상세 주문정보를 확인하려면 주문 체크박스를 선택해주세요.',
    },
} as const

// 이미지 업로드 상수
export const IMAGE_UPLOAD = {
    MAX_COUNT_REJECT: 1,
} as const

// 날짜 포맷 상수
export const DATE_FORMAT = {
    STANDARD: 'yyyy.MM.dd',
    WITH_SPACE: 'yyyy. MM. dd',
} as const
