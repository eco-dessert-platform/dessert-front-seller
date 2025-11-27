import clsx from "clsx";

// TODO :: READY_PRODUCT, WITHDRAW, CONFIRMED, DECIDE -> 임의 값
type OrderStatus = "PAID" | "CHECKED" | "READY_PRODUCT" | "WITHDRAW" | "CONFIRMED" | "DECIDE";

// TODO :: 타입 확정 후, index의 타입 OrderStatus로 변경
const STYLE_BY_TYPE: Record<string, string> = {
    // 결제완료
    PAID: 'text-gray-600 border-gray-600 text-gray-200',
    // 발주확인
    CHECKED: 'text-yellow-800 bg-yellow-50 border-yello-800',
    // 상품준비
    READY_PRODUCT: 'text-yellow-800 bg-yellow-50 border-yello-800',
    // 상품회수
    WITHDRAW: 'bg-green-50 border-green-800 text-green-800',
    // 상품확인
    CONFIRMED: 'bg-green-50 border-green-800 text-green-800',
    // 구매확정
    DECIDE: 'text-gray-800 bg-gray-300 border-gray-600',
    // 취소요청
    CANCEL_REQUEST: 'text-[#DE4525] bg-red-50 border-[#DE4525]',
    // 반품 요청
    REFUND_REQUEST: 'text-gray-600 bg-gray-600 text-white'
};

const OrderStatusLabel = ({ type, text }: { type: string, text: string }) => {
    return (
        <div className={clsx('inline-block py-0.5 px-1 border text-center text-[10px] rounded-[4px]', type in STYLE_BY_TYPE && STYLE_BY_TYPE[type])}>
            {text}
        </div>
    );
};

export default OrderStatusLabel;