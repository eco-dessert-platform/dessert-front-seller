import { useMemo, useEffect, useCallback } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { SSdataTable } from 'src/shared/components/table/SSdataTable'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { adminProductsAction } from '../adminProductsReducer'
import { AdminProductSearchFilter } from '../type/adminProductFilterType'
import type { AdminProductItem } from '../type/adminProductType'

const getInitialFilterValue = (): AdminProductSearchFilter => ({
    page: 0,
    size: 10,
    keyword: '',
})

type RowT = {
    storeName: string
    productId: string
    productName: string
    link: string
    productPrice: number
    optionId: string
    optionName: string
    tags: string[]
    optionPrice: number
    stock: number
}

const columnHelper = createColumnHelper<RowT>()

export default function AdminProductTable() {
    const dispatch = useAppDispatch()
    const { adminProductList, selectedProductIds, selectedOptionIds } =
        useAppSelector(
            ({ adminProductsReducer }) => ({
                adminProductList:
                    adminProductsReducer.adminProductList?.data?.result,
                selectedProductIds:
                    adminProductsReducer.selectedProductIds as string[],
                selectedOptionIds:
                    adminProductsReducer.selectedOptionIds as string[],
            }),
            shallowEqual,
        )

    // 초기 데이터 로드
    useEffect(() => {
        const filterValue = getInitialFilterValue()
        dispatch(adminProductsAction.getAdminProductList(filterValue))
    }, [dispatch])

    const rows: RowT[] = useMemo(() => {
        if (!adminProductList?.contents) return []

        return adminProductList.contents.flatMap((p: AdminProductItem) => {
            if (!p.productOptions || p.productOptions.length === 0) {
                return [
                    {
                        storeName: p.storeName,
                        productId: String(p.productId),
                        productName: p.productName,
                        link: `/products/${p.productId}`,
                        productPrice: p.productPrice,
                        optionId: '',
                        optionName: '',
                        tags: [],
                        optionPrice: 0,
                        stock: 0,
                    },
                ]
            }

            return p.productOptions.map((o) => ({
                storeName: p.storeName,
                productId: String(p.productId),
                productName: p.productName,
                link: `/products/${p.productId}`,
                productPrice: p.productPrice,
                optionId: String(o.optionId),
                optionName: o.optionName,
                tags: o.tags || [],
                optionPrice: o.price,
                stock: o.stock,
            }))
        })
    }, [adminProductList])

    const allProductIds = useMemo(
        () => Array.from(new Set(rows.map((row) => row.productId))),
        [rows],
    )

    // 상품 선택 시 해당 상품의 모든 옵션도 같이 선택/해제
    const handleSelectProduct = useCallback(
        (targetProductId: string) => {
            const isSelecting = !selectedProductIds.includes(targetProductId)

            // 1. 상품 ID 업데이트
            const nextProducts = isSelecting
                ? [...selectedProductIds, targetProductId]
                : selectedProductIds.filter((id) => id !== targetProductId)

            // 2. 해당 상품에 속한 모든 옵션 키들 (pid:oid)
            const productOptionKeys = rows
                .filter(
                    (row) => row.productId === targetProductId && row.optionId,
                )
                .map((row) => `${row.productId}:${row.optionId}`)

            // 3. 옵션 ID 업데이트
            let nextOptions = [...selectedOptionIds]
            if (isSelecting) {
                // 중복 제거하며 추가
                nextOptions = Array.from(
                    new Set([...nextOptions, ...productOptionKeys]),
                )
            } else {
                // 해당 상품의 옵션들 모두 제거
                nextOptions = nextOptions.filter(
                    (key) => !productOptionKeys.includes(key),
                )
            }

            dispatch(adminProductsAction.setSelectedProductIds(nextProducts))
            dispatch(adminProductsAction.setSelectedOptionIds(nextOptions))
        },
        [selectedProductIds, selectedOptionIds, rows, dispatch],
    )

    const handleSelectOption = useCallback(
        (productId: string, optionId: string) => {
            const selectionKey = `${productId}:${optionId}`
            const isSelecting = !selectedOptionIds.includes(selectionKey)

            // 1. 옵션 상태 업데이트
            const nextOptions = isSelecting
                ? [...selectedOptionIds, selectionKey]
                : selectedOptionIds.filter((key) => key !== selectionKey)

            // 2. 해당 상품의 모든 옵션이 체크되었는지 확인하여 상품 체크박스 상태 동기화
            const allOptionsOfProduct = rows
                .filter((row) => row.productId === productId && row.optionId)
                .map((row) => `${row.productId}:${row.optionId}`)

            const selectedOptionsOfProduct = nextOptions.filter((key) =>
                key.startsWith(`${productId}:`),
            )

            let nextProducts = [...selectedProductIds]
            if (
                isSelecting &&
                allOptionsOfProduct.length === selectedOptionsOfProduct.length
            ) {
                // 모든 옵션 선택 시 상품도 체크
                if (!nextProducts.includes(productId))
                    nextProducts.push(productId)
            } else if (!isSelecting) {
                // 하나라도 해제 시 상품 체크 해제
                nextProducts = nextProducts.filter((id) => id !== productId)
            }

            dispatch(adminProductsAction.setSelectedOptionIds(nextOptions))
            dispatch(adminProductsAction.setSelectedProductIds(nextProducts))
        },
        [selectedProductIds, selectedOptionIds, rows, dispatch],
    )

    const handleSelectAll = useCallback(() => {
        const isAllSelected =
            allProductIds.length > 0 &&
            selectedProductIds.length === allProductIds.length

        if (isAllSelected) {
            dispatch(adminProductsAction.clearSelections(undefined))
        } else {
            const allOptionKeys = rows
                .filter((row) => row.optionId)
                .map((row) => `${row.productId}:${row.optionId}`)

            dispatch(adminProductsAction.setSelectedProductIds(allProductIds))
            dispatch(adminProductsAction.setSelectedOptionIds(allOptionKeys))
        }
    }, [allProductIds, selectedProductIds.length, rows, dispatch])

    const isAllSelected = useMemo(() => {
        return (
            allProductIds.length > 0 &&
            selectedProductIds.length === allProductIds.length
        )
    }, [selectedProductIds.length, allProductIds.length])

    const isSomeSelected = useMemo(() => {
        return (
            selectedProductIds.length > 0 &&
            selectedProductIds.length < allProductIds.length
        )
    }, [selectedProductIds.length, allProductIds.length])

    const getSelectionState = (productId: string, optionId?: string) => {
        const isProductSelected = selectedProductIds.includes(productId)
        const isOptionSelected = optionId
            ? selectedOptionIds.includes(`${productId}:${optionId}`)
            : false
        return { isProductSelected, isOptionSelected }
    }

    const columns = useMemo(() => {
        return [
            {
                id: 'select',
                meta: { merge: true, width: 50 },
                header: () => (
                    <div className="flex items-center justify-center">
                        <input
                            ref={(el) => {
                                if (el) el.indeterminate = isSomeSelected
                            }}
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            className="accent-primary-500 cursor-pointer"
                        />
                    </div>
                ),
                accessorFn: (row: RowT) => row.productId,
                cell: ({ row }: { row: { original: RowT } }) => {
                    const { isProductSelected } = getSelectionState(
                        row.original.productId,
                    )
                    return (
                        <div className="flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={isProductSelected}
                                onChange={() =>
                                    handleSelectProduct(row.original.productId)
                                }
                                className="accent-primary-500 cursor-pointer"
                            />
                        </div>
                    )
                },
            },
            columnHelper.accessor('storeName', {
                header: '스토어명',
                meta: { merge: true, width: 120 },
                cell: ({ getValue }) => (
                    <div className="text-center">
                        <span className="text-primary-500 underline">
                            {String(getValue())}
                        </span>
                    </div>
                ),
            }),
            columnHelper.accessor('productId', {
                header: '상품아이디/상품명',
                meta: { merge: true },
                cell: ({ row }) => (
                    <div className="flex flex-col items-center">
                        <span className="text-primary-500">
                            [{row.original.productId}]
                        </span>
                        <span className="underline">
                            {row.original.productName}
                        </span>
                    </div>
                ),
            }),
            columnHelper.display({
                id: 'select-option',
                meta: { width: 50 },
                header: () => <div />,
                cell: ({ row }) => {
                    const { isOptionSelected } = getSelectionState(
                        row.original.productId,
                        row.original.optionId,
                    )
                    return (
                        <div className="flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={isOptionSelected}
                                onChange={() =>
                                    handleSelectOption(
                                        row.original.productId,
                                        row.original.optionId,
                                    )
                                }
                                className="accent-primary-500 cursor-pointer"
                            />
                        </div>
                    )
                },
            }),
            columnHelper.accessor('optionName', {
                header: '상품옵션명',
                cell: ({ row }) => (
                    <div>
                        <div className="flex flex-col gap-1">
                            <span>{row.original.optionName}</span>
                            <div className="flex items-center gap-3">
                                <div className="text-[12px] text-gray-500">
                                    {row.original.tags.join(', ')}
                                </div>
                                <span className="font-semibold">
                                    {row.original.optionPrice.toLocaleString()}
                                    원
                                </span>
                            </div>
                        </div>
                    </div>
                ),
            }),
            columnHelper.accessor('stock', {
                header: '재고',
                meta: { width: 80 },
                cell: ({ getValue }) => (
                    <div className="text-center">
                        <span>{Number(getValue() ?? 0)}</span>
                    </div>
                ),
            }),
            columnHelper.accessor('productPrice', {
                header: '상품가',
                meta: { merge: true, width: 120 },
                cell: ({ getValue }) => (
                    <div className="text-center">
                        <span>
                            {Number(getValue() ?? 0).toLocaleString()}원
                        </span>
                    </div>
                ),
            }),
            columnHelper.accessor('link', {
                header: '링크',
                meta: { merge: true, width: 100 },
                cell: ({ getValue }) => (
                    <div className="text-center">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                                window.open(String(getValue()), '_blank')
                            }
                        >
                            이동
                        </Button>
                    </div>
                ),
            }),
        ]
    }, [
        isSomeSelected,
        isAllSelected,
        handleSelectAll,
        getSelectionState,
        handleSelectProduct,
        handleSelectOption,
    ])

    return (
        <SSdataTable<RowT, unknown>
            columns={columns as never}
            data={rows}
            pagination={{
                enabled: true,
                position: 'top',
                align: 'right',
                pageSize: 10,
            }}
            styles={{
                headerClassName: 'bg-gray-200',
                containerClassName: 'rounded-none border border-gray-200',
            }}
        />
    )
}
