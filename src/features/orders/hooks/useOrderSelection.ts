import { useCallback, useState } from 'react'
import type { OrderTableRow } from '../type/orderTableType'
import { getOrderItemIndices, isAllItemsSelected } from '../utils/orderUtils'

interface UseOrderSelectionReturn {
    selections: {
        orders: Set<string>
        items: Set<string>
    }
    handleSelectOrder: (targetOrderNumber: string) => void
    handleSelectItem: (rowId: string, targetOrderNumber: string) => void
    handleSelectAll: (
        allOrderNumbers: string[],
        tableData: OrderTableRow[],
    ) => void
    isAllSelected: (allOrderNumbers: string[]) => boolean
    isSomeSelected: (allOrderNumbers: string[]) => boolean
    clearSelections: () => void
}

export const useOrderSelection = (
    tableData: OrderTableRow[],
): UseOrderSelectionReturn => {
    const [selections, setSelections] = useState<{
        orders: Set<string>
        items: Set<string>
    }>({
        orders: new Set(),
        items: new Set(),
    })

    const handleSelectOrder = useCallback(
        (targetOrderNumber: string) => {
            setSelections((prev) => {
                const isOrderSelected = prev.orders.has(targetOrderNumber)
                const nextSelectedOrders = new Set(prev.orders)
                const nextSelectedItems = new Set(prev.items)

                if (isOrderSelected) {
                    nextSelectedOrders.delete(targetOrderNumber)
                } else {
                    nextSelectedOrders.add(targetOrderNumber)
                }

                tableData.forEach((row, index) => {
                    if (row.orderNumber === targetOrderNumber) {
                        if (isOrderSelected) {
                            nextSelectedItems.delete(index.toString())
                        } else {
                            nextSelectedItems.add(index.toString())
                        }
                    }
                })

                return { orders: nextSelectedOrders, items: nextSelectedItems }
            })
        },
        [tableData],
    )

    const handleSelectItem = useCallback(
        (rowId: string, targetOrderNumber: string) => {
            setSelections((prev) => {
                const nextSelectedOrders = new Set(prev.orders)
                const nextSelectedItems = new Set(prev.items)

                if (nextSelectedItems.has(rowId)) {
                    nextSelectedItems.delete(rowId)
                } else {
                    nextSelectedItems.add(rowId)
                }

                const targetOrderItemIndices = getOrderItemIndices(
                    tableData,
                    targetOrderNumber,
                )

                if (
                    isAllItemsSelected(
                        targetOrderItemIndices,
                        nextSelectedItems,
                    )
                ) {
                    nextSelectedOrders.add(targetOrderNumber)
                } else {
                    nextSelectedOrders.delete(targetOrderNumber)
                }

                return {
                    orders: nextSelectedOrders,
                    items: nextSelectedItems,
                }
            })
        },
        [tableData],
    )

    const handleSelectAll = useCallback(
        (allOrderNumbers: string[], tableData: OrderTableRow[]) => {
            setSelections((prev) => {
                const isAllSelected =
                    prev.orders.size === allOrderNumbers.length &&
                    allOrderNumbers.length > 0

                if (isAllSelected) {
                    return {
                        orders: new Set(),
                        items: new Set(),
                    }
                }

                return {
                    orders: new Set(allOrderNumbers),
                    items: new Set(
                        Array.from(tableData, (_, idx) => idx.toString()),
                    ),
                }
            })
        },
        [],
    )

    const isAllSelected = useCallback(
        (allOrderNumbers: string[]) => {
            return (
                selections.orders.size === allOrderNumbers.length &&
                allOrderNumbers.length > 0
            )
        },
        [selections.orders.size],
    )

    const isSomeSelected = useCallback(
        (allOrderNumbers: string[]) => {
            return (
                selections.orders.size > 0 &&
                selections.orders.size < allOrderNumbers.length
            )
        },
        [selections.orders.size],
    )

    const clearSelections = useCallback(() => {
        setSelections({
            orders: new Set(),
            items: new Set(),
        })
    }, [])

    return {
        selections,
        handleSelectOrder,
        handleSelectItem,
        handleSelectAll,
        isAllSelected,
        isSomeSelected,
        clearSelections,
    }
}
