import { client } from 'src/global/api/client.tsx'

// 정산내역 조회 API
export const getSettlements = ({
    limit,
    skip,
    startDate,
    endDate,
}: {
    limit: number
    skip: number
    startDate?: string
    endDate?: string
}) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
    })
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)

    return client.get(`/settlements?${params.toString()}`)
}

// 충전금 현황 조회 API
export const getChargeStatus = () => {
    return client.get('/settlements/charge')
}

// 지급 보류 내역 조회 API
export const getPendingPayments = ({
    limit,
    skip,
}: {
    limit: number
    skip: number
}) => {
    return client.get(
        `/settlements/pending?limit=${limit}&skip=${skip}`,
    )
}

// 부가세 신고내역 조회 API
export const getVatReports = ({
    limit,
    skip,
    year,
    month,
}: {
    limit: number
    skip: number
    year?: number
    month?: number
}) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
    })
    if (year) params.append('year', year.toString())
    if (month) params.append('month', month.toString())

    return client.get(`/settlements/vat-report?${params.toString()}`)
}

// 세금계산서 조회 API
export const getTaxInvoices = ({
    limit,
    skip,
    startDate,
    endDate,
}: {
    limit: number
    skip: number
    startDate?: string
    endDate?: string
}) => {
    const params = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString(),
    })
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)

    return client.get(`/settlements/tax-invoice?${params.toString()}`)
}

