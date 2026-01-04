import { client } from 'src/global/api/client.tsx'

// 판매분석 조회 API
export const getSalesAnalysis = ({
    startDate,
    endDate,
    period,
}: {
    startDate?: string
    endDate?: string
    period?: 'day' | 'week' | 'month' | 'year'
}) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    if (period) params.append('period', period)

    return client.get(`/statistics/sales?${params.toString()}`)
}

// 판매 통계 요약 조회 API
export const getSalesSummary = ({
    startDate,
    endDate,
}: {
    startDate?: string
    endDate?: string
}) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)

    return client.get(`/statistics/sales/summary?${params.toString()}`)
}

