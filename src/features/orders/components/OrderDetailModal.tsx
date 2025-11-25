import { useState } from 'react'
import { format } from 'date-fns'

import { Dialog } from 'src/shared/components/dialog/Dialog'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from 'src/shared/lib/shadcn/components/ui/accordion'

// TODO :: API 연동 후, 삭제
const MOCK_DATA = [
    {
        orderNumber: 'ORDER-2025-04-05-test',
        orderInfo: {
            orderDate: '2025-04-05',
            orderStatusLabel: '반품-상품발송',
        },
        buyer: {
            recipientName: '홍길동',
            buyerName: '홍길동',
            buyerPhone1: '010-1234-5678',
            buyerPhone2: '010-9876-5432',
        },
        shipping: {
            statusLabel: '수거중',
            courierCompany: 'CJ대한통운',
            trackingNumber: '1234-5678-910',
            shippingFee: 3000,
            address: '서울시 강남구 예제로 123',
            memo: '문 앞에 두세요.',
        },
        orderItem: [
            {
                boardTitle: '예제 상품',
                itemName: '예제 상품',
                quantity: 2,
                unitPrice: 50000,
                totalPrice: 100000,
            },
            {
                boardTitle: '예제 상품2',
                itemName: '예제 상품2',
                quantity: 3,
                unitPrice: 50000,
                totalPrice: 150000,
            },
        ],
    },
    {
        orderNumber: 'ORDER-2025-04-06-test',
        orderInfo: {
            orderDate: '2025-04-05',
            orderStatusLabel: '반품-상품발송',
        },
        buyer: {
            recipientName: '홍길동',
            buyerName: '홍길동',
            buyerPhone1: '010-1234-5678',
            buyerPhone2: '010-9876-5432',
        },
        shipping: {
            statusLabel: '수거중',
            courierCompany: 'CJ대한통운',
            trackingNumber: '1234-5678-910',
            shippingFee: 3000,
            address: '서울시 강남구 예제로 123',
            memo: '문 앞에 두세요.',
        },
        orderItem: [
            {
                boardTitle: '예제 상품',
                itemName: '예제 상품',
                quantity: 2,
                unitPrice: 50000,
                totalPrice: 100000,
            },
        ],
    },
    {
        orderNumber: 'ORDER-2025-04-07-test',
        orderInfo: {
            orderDate: '2025-04-05',
            orderStatusLabel: '반품-상품발송',
        },
        buyer: {
            recipientName: '홍길동',
            buyerName: '홍길동',
            buyerPhone1: '010-1234-5678',
            buyerPhone2: '010-9876-5432',
        },
        shipping: {
            statusLabel: '수거중',
            courierCompany: 'CJ대한통운',
            trackingNumber: '1234-5678-910',
            shippingFee: 3000,
            address: '서울시 강남구 예제로 123',
            memo: '문 앞에 두세요.',
        },
        orderItem: [
            {
                boardTitle: '예제 상품',
                itemName: '예제 상품',
                quantity: 2,
                unitPrice: 50000,
                totalPrice: 100000,
            },
        ],
    },
]

interface OrderDetailModalProps {
    // TODO :: orderNum 배열 형태로 받은 뒤, 노출 처리
    orderList: string[]
    onClose: () => void
}

const OrderDetailModal = ({ orderList, onClose }: OrderDetailModalProps) => {
    const [orderDetailList, setOrderDetailList] = useState(MOCK_DATA)

    return (
        <Dialog open type="popup" title="주문 상세" onOpenChange={onClose}>
            <Accordion type="single" className="flex flex-col gap-3">
                {orderDetailList.map(
                    ({
                        orderNumber,
                        orderInfo,
                        orderItem,
                        buyer,
                        shipping,
                    }) => (
                        <AccordionItem value={orderNumber}>
                            <AccordionTrigger className="flex items-center justify-between rounded-none border border-gray-200 bg-gray-50 px-4 py-5 data-[state='closed']:rounded-sm data-[state='open']:rounded-t-sm">
                                <div className="flex items-center">
                                    {/* TODO :: orderStatusLabel을 그대로 사용하는게 맞는지 확실하지 않음 */}
                                    <p className="text-14 rounded-[4px] border border-gray-300 bg-white px-2 py-0.5 font-medium text-gray-800">
                                        주문일
                                    </p>
                                    <p className="text-16 pr-[30px] pl-2.5 text-gray-800">
                                        {format(
                                            orderInfo.orderDate,
                                            'yyyy.MM.dd',
                                        )}
                                    </p>
                                    <p className="text-14 rounded-[4px] border border-gray-300 bg-white px-2 py-0.5 font-medium text-gray-800">
                                        주문번호
                                    </p>
                                    <p className="text-16 pr-1.5 pl-2.5 text-gray-800">
                                        {orderNumber}
                                    </p>
                                    <div className="rounded-[4px] border border-gray-600 bg-gray-200 px-1 py-0.5 text-[10px] text-gray-600">
                                        {orderInfo.orderStatusLabel}
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-wrap gap-3 rounded-b-lg bg-gray-100 p-3">
                                <div className="rounde-xl flex basis-full flex-col gap-6 rounded-lg border border-gray-200 bg-white px-5 py-6">
                                    <h2 className="text-18 font-bold text-gray-900">
                                        주문 정보
                                    </h2>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-1">
                                            {orderItem.map(
                                                ({
                                                    boardTitle,
                                                    itemName,
                                                    quantity,
                                                    totalPrice,
                                                }) => (
                                                    <div className="flex items-center justify-between gap-2.5">
                                                        <p className="text-14 text-gray-900">
                                                            {boardTitle}
                                                            <span className="text-12 pl-2.5 text-gray-500">{`${itemName} / ${quantity}개`}</span>
                                                        </p>
                                                        <p className="text-12 font-bold text-gray-800">
                                                            {totalPrice.toLocaleString()}
                                                            원
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        <hr className="bg-gray-300" />
                                        <div className="flex items-center justify-between">
                                            <p className="text-14 font-semibold text-gray-600">
                                                총 구매금액
                                            </p>
                                            {/* TODO :: API 응답 필드 수정 후, 반영 필요 */}
                                            <p className="text-16 text-primary-500 font-semibold">
                                                {100000}원
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex basis-full items-start gap-3">
                                    <div className="flex w-1/2 flex-col gap-6 rounded-lg border border-gray-200 bg-white px-5 py-6">
                                        <h2 className="text-18 font-bold text-gray-900">
                                            구매자 정보
                                        </h2>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-start justify-between">
                                                <p className="text-14 font-medium text-gray-600">
                                                    수취인명
                                                </p>
                                                <p className="text-14 text-gray-800">
                                                    {buyer.recipientName}
                                                </p>
                                            </div>
                                            <div className="flex items-start justify-between">
                                                <p className="text-14 font-medium text-gray-600">
                                                    연락처
                                                </p>
                                                <div>
                                                    <p className="text-14 text-gray-800">
                                                        {buyer.buyerPhone1}
                                                    </p>
                                                    <p className="text-14 text-gray-800">
                                                        {buyer.buyerPhone2}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-1/2 grow flex-col gap-6 rounded-lg border border-gray-200 bg-white px-5 py-6">
                                        <h2 className="text-18 font-bold text-gray-900">
                                            배송 정보
                                        </h2>
                                        <div className="flex flex-col gap-3 [&>div]:flex [&>div]:items-start [&>div]:justify-between">
                                            <div>
                                                <p className="text-14 font-medium text-gray-600">
                                                    배송상태
                                                </p>
                                                <p className="text-14 text-gray-800">
                                                    {shipping.statusLabel}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-14 font-medium text-gray-600">
                                                    택배사/운송장 번호
                                                </p>
                                                <p className="text-14 text-gray-800">{`${shipping.courierCompany} / ${shipping.trackingNumber}`}</p>
                                            </div>
                                            <div>
                                                <p className="text-14 font-medium text-gray-600">
                                                    배송비
                                                </p>
                                                <p className="text-14 text-gray-800">
                                                    {shipping.shippingFee.toLocaleString()}
                                                    원
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-14 font-medium text-gray-600">
                                                    배송주소
                                                </p>
                                                <p className="text-14 text-gray-800">
                                                    {shipping.address}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-14 font-medium text-gray-600">
                                                    배송요청사항
                                                </p>
                                                <p className="text-14 text-gray-800">
                                                    {shipping.memo}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ),
                )}
            </Accordion>
        </Dialog>
    )
}

export default OrderDetailModal
