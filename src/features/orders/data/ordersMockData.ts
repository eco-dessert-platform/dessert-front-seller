export const MOCK_ORDER_LIST = {
    content: [
        {
            deliveryStatus: 'PREPARING',
            courierCompany: 'CJ 대한통운',
            trackingNumber: '1234567890',
            orderNumber: 'ORDER-20240921-00001',
            paymentAt: '2025-11-08T11:54:18.375192088',
            totalPaid: 200000,
            recipientName: '홍길동',
            orderItems: [
                {
                    boardTitle: '예제 1',
                    itemName: '예제 2',
                    quantity: 2,
                    unitPrice: 50000,
                    totalPrice: 100000,
                    orderStatus: 'PAYMENT_COMPLETED',
                },
                {
                    boardTitle: '쿠키 1',
                    itemName: '쿠키 2',
                    quantity: 1,
                    unitPrice: 50000,
                    totalPrice: 100000,
                    orderStatus: 'PAYMENT_COMPLETED',
                },
            ],
        },
        {
            deliveryStatus: 'DELIVERING',
            courierCompany: '우체국 택배',
            trackingNumber: '0987654321',
            totalPaid: 100000,
            orderNumber: 'ORDER-20240921-00002',
            paymentAt: '2025-11-08T10:54:18.377200473',
            recipientName: '김철수',
            orderItems: [
                {
                    boardTitle: '식빵',
                    itemName: '식빵',
                    quantity: 2,
                    unitPrice: 50000,
                    totalPrice: 100000,
                    orderStatus: 'PAYMENT_COMPLETED',
                },
            ],
        },
        {
            deliveryStatus: 'PREPARING',
            courierCompany: null,
            trackingNumber: null,
            totalPaid: 150000,
            orderNumber: 'ORDER-20240921-00003',
            paymentAt: '2025-11-09T14:30:22.123456789',
            recipientName: '이영희',
            orderItems: [
                {
                    boardTitle: '케이크',
                    itemName: '초코케이크',
                    quantity: 1,
                    unitPrice: 150000,
                    totalPrice: 150000,
                    orderStatus: 'PAYMENT_COMPLETED',
                },
            ],
        },
    ],
    page: 0,
    size: 10,
    totalPages: 48,
    totalElements: 480,
}

export const MOCK_ORDER_DETAIL_LIST = [
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

// TODO :: 데이터 구조 미확정
export const MOCK_ORDER_COMPLETED = {
    content: [
        {
            deliveryStatus: 'DELIVERED',
            orderId: 1,
            orderNumber: '000-123',
            paymentAt: '2024-01-01',
            paidDayOfWeek: 'MONDAY',
            recipientName: '홍길동',
            courierCompany: 'CJ대한통운',
            trackingNumber: '123-123',
            totalPaid: 200000,
            orderItems: [
                {
                    orderItemId: 1,
                    orderStatus: 'PAYMENT_COMPLETED',
                    courierCompany: 'CJ대한통운',
                    trackingNumber: '123-123',
                    boardTitle: '베이글',
                    itemName: '저칼로리 베이글',
                    quantity: 5,
                    totalPrice: 10000,
                },
                {
                    orderItemId: 2,
                    orderStatus: 'CANCEL_APPROVED',
                    courierCompany: '롯데택배',
                    trackingNumber: '123-456',
                    boardTitle: '초콜릿',
                    itemName: '저당 초콜릿',
                    quantity: 10,
                    totalPrice: 10000,
                },
            ],
        },
    ],
    page: 0,
    size: 10,
    totalPages: 1,
    totalElements: 10,
}
