import { AxiosResponse } from 'axios'
import { client } from 'src/global/api/client.tsx'
import { MOCK_ORDER_LIST, MOCK_ORDER_COMPLETED } from './data/ordersMockData'
import type { OrderSearchFilter } from './type/orderFilterType'

// 주문 목록 조회 API
export const getOrderList = (
    payload: OrderSearchFilter,
): Promise<AxiosResponse<typeof MOCK_ORDER_LIST>> => {
    // TODO: 실제 API 연동 시 아래 주석 해제
    // return client.get('/orders', { params: payload })

    // 더미데이터 반환 (실제 API 연동 전까지 사용)
    return Promise.resolve({
        data: MOCK_ORDER_LIST,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as never,
    }) as Promise<AxiosResponse<typeof MOCK_ORDER_LIST>>
}

// 완료된 주문 목록 조회 API
export const getOrderCompletedList = (
    payload: OrderSearchFilter,
): Promise<AxiosResponse<typeof MOCK_ORDER_COMPLETED>> => {
    // TODO: 실제 API 연동 시 아래 주석 해제
    // return client.get('/orders/completed', { params: payload })

    // 더미데이터 반환 (실제 API 연동 전까지 사용)
    return Promise.resolve({
        data: MOCK_ORDER_COMPLETED,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as never,
    }) as Promise<AxiosResponse<typeof MOCK_ORDER_COMPLETED>>
}

