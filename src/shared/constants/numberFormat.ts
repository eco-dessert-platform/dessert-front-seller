/**
 * 숫자 형식 규칙 및 상수
 *
 * @description
 * 프로젝트 전반에서 사용하는 숫자 표기 형식을 정의합니다.
 *
 * 규칙:
 * - 천 단위마다 콤마(,)로 구분하여 표기
 */

/**
 * 숫자를 천 단위 콤마 형식으로 포맷팅합니다.
 *
 * @param value - 포맷팅할 숫자 또는 문자열
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 천 단위 콤마가 포함된 문자열
 *
 * @example
 * ```ts
 * formatNumber(1000) // '1,000'
 * formatNumber(1234567) // '1,234,567'
 * formatNumber('1000') // '1,000'
 * ```
 */
export const formatNumber = (
    value: number | string,
    locale: string = 'ko-KR',
): string => {
    const numValue = typeof value === 'string' ? Number(value) : value

    if (isNaN(numValue)) {
        return String(value)
    }

    return new Intl.NumberFormat(locale).format(numValue)
}

/**
 * 숫자를 천 단위 콤마 형식으로 포맷팅합니다 (소수점 처리 포함).
 *
 * @param value - 포맷팅할 숫자 또는 문자열
 * @param options - 포맷팅 옵션
 * @param options.locale - 로케일 (기본값: 'ko-KR')
 * @param options.minimumFractionDigits - 최소 소수점 자릿수 (기본값: 0)
 * @param options.maximumFractionDigits - 최대 소수점 자릿수 (기본값: 0)
 * @returns 천 단위 콤마가 포함된 문자열
 *
 * @example
 * ```ts
 * formatNumberWithDecimal(1000.5) // '1,000.5'
 * formatNumberWithDecimal(1000.5, { maximumFractionDigits: 2 }) // '1,000.50'
 * formatNumberWithDecimal(1000, { minimumFractionDigits: 2 }) // '1,000.00'
 * ```
 */
export const formatNumberWithDecimal = (
    value: number | string,
    options: {
        locale?: string
        minimumFractionDigits?: number
        maximumFractionDigits?: number
    } = {},
): string => {
    const {
        locale = 'ko-KR',
        minimumFractionDigits = 0,
        maximumFractionDigits = 0,
    } = options

    const numValue = typeof value === 'string' ? Number(value) : value

    if (isNaN(numValue)) {
        return String(value)
    }

    return new Intl.NumberFormat(locale, {
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(numValue)
}

/**
 * 금액을 천 단위 콤마 형식으로 포맷팅합니다 (원화 단위 포함).
 *
 * @param value - 포맷팅할 숫자 또는 문자열
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 천 단위 콤마가 포함된 금액 문자열 (예: '1,000원')
 *
 * @example
 * ```ts
 * formatCurrency(1000) // '1,000원'
 * formatCurrency(1234567) // '1,234,567원'
 * ```
 */
export const formatCurrency = (
    value: number | string,
    locale: string = 'ko-KR',
): string => {
    return `${formatNumber(value, locale)}원`
}

/**
 * 금액 범위를 포맷팅합니다.
 *
 * @param minValue - 최소 금액
 * @param maxValue - 최대 금액
 * @param locale - 로케일 (기본값: 'ko-KR')
 * @returns 금액 범위 문자열 (예: '1,000원 ~ 10,000원')
 *
 * @example
 * ```ts
 * formatCurrencyRange(1000, 10000) // '1,000원 ~ 10,000원'
 * ```
 */
export const formatCurrencyRange = (
    minValue: number | string,
    maxValue: number | string,
    locale: string = 'ko-KR',
): string => {
    return `${formatCurrency(minValue, locale)} ~ ${formatCurrency(maxValue, locale)}`
}

