import { AxiosResponse } from 'axios'

/**
 * 더미데이터를 AxiosResponse 형태로 반환하는 유틸리티 함수
 * 실제 API 연동 전까지 사용
 */
export const createMockResponse = <T>(
    data: T,
): Promise<AxiosResponse<T>> => {
    return Promise.resolve({
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as never,
    }) as Promise<AxiosResponse<T>>
}

