import { format } from 'date-fns'

/**
 * 날짜 형식 규칙 및 상수
 *
 * @description
 * 프로젝트 전반에서 사용하는 날짜 표기 형식을 정의합니다.
 *
 * 규칙:
 * - 일 단위인 경우 → 연.월.일(YYYY.MM.DD) 형식으로 표기
 * - 월 단위인 경우 → 연.월(YYYY.MM) 형식으로 표기
 * - 날짜는 직접 입력하거나, 데이터 피커를 사용하여 입력
 */

/**
 * date-fns 형식 문자열
 */
export const DATE_FORMAT = {
    /** 일 단위: 연.월.일 (YYYY.MM.DD) */
    DAY: 'yyyy.MM.dd',
    /** 월 단위: 연.월 (YYYY.MM) */
    MONTH: 'yyyy.MM',
    /** 일 단위 (공백 포함): 연. 월. 일 (YYYY. MM. DD) */
    DAY_WITH_SPACE: 'yyyy. MM. dd',
} as const

/**
 * 날짜 형식 규칙 타입
 */
export type DateFormatType = typeof DATE_FORMAT[keyof typeof DATE_FORMAT]

/**
 * 날짜 단위 타입
 */
export type DateUnit = 'day' | 'month'

/**
 * 날짜 단위에 따른 형식 매핑
 */
export const DATE_FORMAT_BY_UNIT: Record<DateUnit, DateFormatType> = {
    day: DATE_FORMAT.DAY,
    month: DATE_FORMAT.MONTH,
} as const

/**
 * 날짜 단위에 따라 적절한 형식을 반환합니다.
 *
 * @param unit - 날짜 단위 ('day' | 'month')
 * @returns date-fns 형식 문자열
 *
 * @example
 * ```ts
 * const format = getDateFormatByUnit('day') // 'yyyy.MM.dd'
 * const format = getDateFormatByUnit('month') // 'yyyy.MM'
 * ```
 */
export const getDateFormatByUnit = (unit: DateUnit): DateFormatType => {
    return DATE_FORMAT_BY_UNIT[unit]
}

/**
 * 날짜 범위를 기간 형식으로 포맷팅합니다.
 *
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @param unit - 날짜 단위 ('day' | 'month', 기본값: 'day')
 * @returns 기간 문자열 (예: '2024.01.01 ~ 2024.01.31')
 *
 * @example
 * ```ts
 * formatDateRange(new Date('2024-01-01'), new Date('2024-01-31')) 
 * // '2024.01.01 ~ 2024.01.31'
 * 
 * formatDateRange(new Date('2024-01-01'), new Date('2024-12-31'), 'month') 
 * // '2024.01 ~ 2024.12'
 * ```
 */
export const formatDateRange = (
    startDate: Date,
    endDate: Date,
    unit: DateUnit = 'day',
): string => {
    const dateFormat = getDateFormatByUnit(unit)
    const formattedStart = format(startDate, dateFormat)
    const formattedEnd = format(endDate, dateFormat)
    return `${formattedStart} ~ ${formattedEnd}`
}

