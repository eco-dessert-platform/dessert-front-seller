import type { RejectType } from '../type/orderModalType'

export const REJECT_TYPE_LIST: Record<RejectType, string[]> = {
    CANCEL: [
        '고객변심',
        '구매 의사 취소',
        '주문 실수',
        '상품 변경 후 재주문',
        '상품 품절',
    ],
    CANCEL_REFUSE: ['상품 발송 완료', '기타'],
    REFUND: [
        '품질 이상',
        '유통기한 초과',
        '오배송',
        '배송 사고',
        '주문 실수 (신선식품 불가)',
    ],
    REFUND_REFUSE: [
        '소비자 과실 손상',
        '반품 기한 초과',
        '주문 실수 (신선식품일 경우만)',
    ],
    REFUND_PENDING: ['반품 요청 기한 내 판단 불가', '추가 확인 필요', '기타'],
    CHANGE: [
        '품질 이상',
        '유통기한 초과',
        '오배송',
        '배송 사고',
        '주문 실수(신선식품 불가)',
    ],
    CHANGE_REFUSE: [
        '소비자 과실 손상',
        '반품 기한 초과',
        '주문 실수(신선식품일 경우만)',
        '기타',
    ],
    CHANGE_PENDING: ['교환 요청 기한 내 판단 불가', '추가 확인 필요', '기타'],
}
