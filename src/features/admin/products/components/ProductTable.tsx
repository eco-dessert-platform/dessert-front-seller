import { useMemo, useState, useCallback, useEffect } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { SSdataTable } from 'src/shared/components/table/SSdataTable'
import type { ProductListResult, ProductItem } from '../type/productType'

type RowT = {
    // 그룹(병합) 기준
    storeName: string
    productId: string
    productName: string
    link: string // 링크 컬럼 복원
    productPrice: number // ✅ 상품가(병합될 값)

    // 옵션(행마다 다름)
    optionId: string
    optionName: string
    tags: string[]
    optionPrice: number
    stock: number
}

const columnHelper = createColumnHelper<RowT>()

interface ProductTableProps {
    data?: ProductListResult | null
    onSelectionChange?: (data: {
        selectedProductIds: string[]
        selectedOptionIds: string[]
    }) => void
}

export default function ProductTable({
    data,
    onSelectionChange,
}: ProductTableProps) {
    const [selections, setSelections] = useState<{
        products: Set<string>
        options: Set<string>
    }>({
        products: new Set(),
        options: new Set(),
    })

    const rows: RowT[] = useMemo(() => {
        if (!data?.contents) return []

        return data.contents.flatMap((p: ProductItem) => {
            if (!p.productOptions || p.productOptions.length === 0) {
                return [
                    {
                        storeName: p.storeName,
                        productId: String(p.productId),
                        productName: p.productName,
                        link: `/products/${p.productId}`, // 링크 생성
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
                link: `/products/${p.productId}`, // 링크 생성
                productPrice: p.productPrice,

                optionId: String(o.optionId),
                optionName: o.optionName,
                tags: o.tags || [],
                optionPrice: o.price,
                stock: o.stock,
            }))
        })
    }, [data])

    const allProductIds = useMemo(
        () => Array.from(new Set(rows.map((row) => row.productId))),
        [rows],
    )

    const handleSelectProduct = useCallback((targetProductId: string) => {
        setSelections((prev) => {
            const isProductSelected = prev.products.has(targetProductId)
            const nextSelectedProducts = new Set(prev.products)

            // 상품 선택/해제만 처리 (옵션 선택과 독립적)
            if (isProductSelected) {
                nextSelectedProducts.delete(targetProductId)
            } else {
                nextSelectedProducts.add(targetProductId)
            }

            return {
                products: nextSelectedProducts,
                options: prev.options, // 옵션 선택은 변경하지 않음
            }
        })
    }, [])

    const handleSelectOption = useCallback(
        (rowId: string, targetProductId: string) => {
            setSelections((prev) => {
                const nextSelectedOptions = new Set(prev.options)

                // 옵션 선택/해제만 처리 (상품 선택과 독립적)
                if (nextSelectedOptions.has(rowId)) {
                    nextSelectedOptions.delete(rowId)
                } else {
                    nextSelectedOptions.add(rowId)
                }

                return {
                    products: prev.products, // 상품 선택은 변경하지 않음
                    options: nextSelectedOptions,
                }
            })
        },
        [],
    )

    const handleSelectAll = useCallback(() => {
        setSelections((prev) => {
            const isAllSelected =
                prev.products.size === allProductIds.length &&
                allProductIds.length > 0

            if (isAllSelected) {
                return {
                    products: new Set(),
                    options: new Set(),
                }
            }

            return {
                products: new Set(allProductIds),
                options: new Set(Array.from(rows, (_, idx) => idx.toString())),
            }
        })
    }, [allProductIds, rows])

    const isAllSelected = useMemo(() => {
        return (
            selections.products.size === allProductIds.length &&
            allProductIds.length > 0
        )
    }, [selections.products.size, allProductIds.length])

    const isSomeSelected = useMemo(() => {
        return (
            selections.products.size > 0 &&
            selections.products.size < allProductIds.length
        )
    }, [selections.products.size, allProductIds.length])

    // 선택 상태 확인 헬퍼 함수
    const getSelectionState = (rowId: string, productId: string) => {
        const isProductSelected = selections.products.has(productId)
        const isOptionSelected = selections.options.has(rowId)
        const isSelected = isProductSelected || isOptionSelected
        return { isProductSelected, isOptionSelected, isSelected }
    }

    const columns = useMemo(() => {
        return [
            {
                id: 'select',
                meta: { merge: true, width: 50 },
                header: () => {
                    return (
                        <div className="flex items-center justify-center">
                            <input
                                ref={(el) => {
                                    if (el) {
                                        el.indeterminate = isSomeSelected
                                    }
                                }}
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={handleSelectAll}
                                className="accent-primary-500 cursor-pointer"
                            />
                        </div>
                    )
                },
                accessorFn: (row: RowT) => row.productId,
                cell: ({ row }: { row: { original: RowT; id: string } }) => {
                    const { isProductSelected } = getSelectionState(
                        row.id,
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
                cell: ({ getValue, row }) => {
                    const { isSelected } = getSelectionState(
                        row.id,
                        row.original.productId,
                    )

                    return (
                        <div className="text-center">
                            <span className="text-primary-500 underline">
                                {String(getValue())}
                            </span>
                        </div>
                    )
                },
            }),
            columnHelper.accessor('productId', {
                header: '상품아이디/상품명',
                meta: { merge: true },
                cell: ({ row }) => {
                    const { isSelected } = getSelectionState(
                        row.id,
                        row.original.productId,
                    )

                    return (
                        <div className="flex flex-col items-center">
                            <span className="text-primary-500">
                                [{row.original.productId}]
                            </span>
                            <span className="underline">
                                {row.original.productName}
                            </span>
                        </div>
                    )
                },
            }),
            columnHelper.display({
                id: 'select-option',
                meta: { width: 50 },
                header: () => <div />,
                cell: ({ row }) => {
                    const { isOptionSelected, isSelected } = getSelectionState(
                        row.id,
                        row.original.productId,
                    )

                    return (
                        <div className="flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={isOptionSelected}
                                onChange={() =>
                                    handleSelectOption(
                                        row.id,
                                        row.original.productId,
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
                cell: ({ row }) => {
                    const { isSelected } = getSelectionState(
                        row.id,
                        row.original.productId,
                    )

                    return (
                        <div>
                            <div className="flex flex-col gap-1">
                                <span>{row.original.optionName}</span>

                                <div className="flex items-center gap-3">
                                    <div className="text-12 text-gray-500">
                                        {row.original.tags.join(', ')}
                                    </div>
                                    <span className="font-semibold">
                                        {row.original.optionPrice.toLocaleString()}
                                        원
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                },
            }),
            columnHelper.accessor('stock', {
                header: '재고',
                meta: { width: 80 },
                cell: ({ getValue, row }) => {
                    const { isSelected } = getSelectionState(
                        row.id,
                        row.original.productId,
                    )

                    return (
                        <div className="text-center">
                            <span>{Number(getValue() ?? 0)}</span>
                        </div>
                    )
                },
            }),
            columnHelper.accessor('productPrice', {
                header: '상품가',
                meta: { merge: true, width: 120 },
                cell: ({ getValue, row }) => {
                    const { isSelected } = getSelectionState(
                        row.id,
                        row.original.productId,
                    )

                    return (
                        <div className="text-center">
                            <span>
                                {Number(getValue() ?? 0).toLocaleString()}원
                            </span>
                        </div>
                    )
                },
            }),
            columnHelper.accessor('link', {
                header: '링크',
                meta: { merge: true, width: 100 },
                cell: ({ getValue, row }) => {
                    const { isSelected } = getSelectionState(
                        row.id,
                        row.original.productId,
                    )

                    return (
                        <div className="text-center">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    window.open(String(getValue()), '_blank')
                                }}
                            >
                                이동
                            </Button>
                        </div>
                    )
                },
            }),
        ]
    }, [
        selections,
        handleSelectProduct,
        handleSelectOption,
        handleSelectAll,
        isAllSelected,
        isSomeSelected,
    ])

    // 선택된 상품 ID 목록
    const selectedProductIds = useMemo(() => {
        return Array.from(selections.products)
    }, [selections.products])

    // 선택된 옵션 ID 목록 (row index를 문자열로 저장)
    const selectedOptionIds = useMemo(() => {
        return Array.from(selections.options)
    }, [selections.options])

    // 선택 상태 변경 시 콜백 호출
    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange({
                selectedProductIds,
                selectedOptionIds,
            })
        }
    }, [selectedProductIds, selectedOptionIds, onSelectionChange])

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
                headerClassName: 'bg-[#eee]',
                containerClassName: 'rounded-none border border-gray-200',
            }}
        />
    )
}
