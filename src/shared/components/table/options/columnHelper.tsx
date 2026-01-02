import React from 'react'
import { createColumnHelper, ColumnDef } from '@tanstack/react-table'
import { createCellFormatter } from './cellFormatter.tsx'
import { createHeaderFormatter } from './headerFormatter.tsx'
import {
    CellAlign,
    CellFormatType,
    Region,
    CellFormatOptions,
} from './types.ts'

/**
 * 컬럼 생성을 위한 통합 옵션 인터페이스
 * @template T - 데이터 타입
 * @template K - accessorKey의 타입 (자동 추론됨)
 */
export interface ColumnOptions<T extends object, K extends keyof T = keyof T> {
    /**
     * 컬럼 헤더에 표시될 라벨
     */
    header: string
    /**
     * 데이터 객체에서 값을 가져올 키
     */
    accessorKey: K
    /**
     * 헤더 정렬 방향 (기본값: 'left')
     */
    headerAlign?: CellAlign
    /**
     * 헤더에 정렬 기능 활성화 여부 (기본값: false)
     */
    enableSorting?: boolean
    /**
     * 셀 정렬 방향 (기본값: 'left')
     */
    cellAlign?: CellAlign
    /**
     * 셀 값의 포맷 유형 (기본값: 'text')
     */
    format?: CellFormatType
    /**
     * 통화 및 날짜 형식에 사용할 지역 (기본값: 'kr')
     */
    region?: Region
    /**
     * 값 앞에 추가할 접두사
     */
    prefix?: string
    /**
     * 값 뒤에 추가할 접미사
     */
    suffix?: string
    /**
     * 셀 병합 활성화 여부 (기본값: false)
     */
    merge?: boolean
    /**
     * 커스텀 셀 렌더링 함수
     * value의 타입은 accessorKey에 해당하는 값의 타입으로 자동 추론됩니다.
     */
    customCell?: (value: T[K], row: T) => React.ReactNode
    /**
     * 커스텀 헤더 렌더링 함수
     */
    customHeader?: (label: string) => React.ReactNode
    /**
     * 컬럼 너비 (px)
     */
    size?: number
}

/**
 * 컬럼을 쉽게 생성할 수 있는 헬퍼 함수
 * @template T - 데이터 타입
 * @template K - accessorKey의 타입 (자동 추론됨)
 * @param options - 컬럼 옵션
 * @returns ColumnDef 객체 (타입이 자동으로 추론됨)
 */
export function createColumn<
    T extends object,
    K extends keyof T = keyof T,
>(options: ColumnOptions<T, K>): ColumnDef<T, T[K]> {
    const {
        header,
        accessorKey,
        headerAlign = 'left',
        enableSorting = false,
        cellAlign = 'left',
        format = 'text',
        region = 'kr',
        prefix = '',
        suffix = '',
        merge = false,
        customCell,
        customHeader,
        size,
    } = options

    const columnHelper = createColumnHelper<T>()

    // 헤더 포맷터 생성
    const headerFormatter = createHeaderFormatter<T>({
        label: header,
        align: headerAlign,
        sort: enableSorting,
        customHeader,
    })

    // 셀 포맷터 생성
    const cellFormatterOptions = {
        key: accessorKey,
        align: cellAlign,
        format,
        region,
        prefix,
        suffix,
        customCell: customCell as ((value: T[K], row: T) => React.ReactNode) | undefined,
    } as unknown as Parameters<typeof createCellFormatter>[0]
    const cellFormatter = createCellFormatter(cellFormatterOptions)

    // 컬럼 정의 생성 - TanStack Table이 타입을 자동으로 추론함
    const column = (
        columnHelper.accessor as (
            accessor: string,
            options?: Record<string, unknown>,
        ) => ColumnDef<T, T[K]>
    )(
        String(accessorKey),
        {
            ...headerFormatter,
            ...cellFormatter,
            enableSorting,
            size,
            meta: {
                merge,
            },
        },
    )

    // 타입을 정확하게 추론하여 반환
    return column as ColumnDef<T, T[K]>
}

/**
 * 여러 컬럼을 한 번에 생성하는 헬퍼 함수
 * 각 컬럼의 타입이 자동으로 추론됩니다.
 * @template T - 데이터 타입
 * @param columns - 컬럼 옵션 배열
 * @returns ColumnDef 배열 (각 컬럼의 타입이 정확하게 추론됨)
 */
export function createColumns<T extends object>(
    columns: Array<ColumnOptions<T, keyof T>>,
): Array<ColumnDef<T, unknown>> {
    return columns.map((options) => {
        // 각 컬럼의 accessorKey 타입을 추론하여 createColumn 호출
        return createColumn<T, typeof options.accessorKey>(options) as ColumnDef<T, unknown>
    })
}

/**
 * 기본 컬럼을 빠르게 생성하는 헬퍼 함수
 * @template T - 데이터 타입
 * @template K - accessorKey의 타입 (자동 추론됨)
 * @param accessorKey - 데이터 키
 * @param header - 헤더 라벨
 * @param options - 추가 옵션
 * @returns ColumnDef 객체 (타입이 자동으로 추론됨)
 */
export function createSimpleColumn<
    T extends object,
    K extends keyof T = keyof T,
>(
    accessorKey: K,
    header: string,
    options?: Partial<ColumnOptions<T, K>>,
): ColumnDef<T, T[K]> {
    return createColumn<T, K>({
        header,
        accessorKey,
        ...options,
    } as ColumnOptions<T, K>)
}

