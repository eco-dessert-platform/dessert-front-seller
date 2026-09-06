import { useEffect, useMemo, useState } from 'react'

import { ProductType } from '@/entity/products/product/product.type'

import { useDeleteProductBoardsMutation } from './use-delete-product-boards.mutation'

export const useProductList = ({ data }: { data: ProductType[] }) => {
  const [tableData, setTableData] = useState<ProductType[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const { mutateAsync: deleteBoards, isPending: isDeleting } =
    useDeleteProductBoardsMutation()

  useEffect(() => {
    setTableData(data)
    setSelectedIds((prev) => {
      const newIds = new Set(data.map((v) => v.id))
      return prev.filter((id) => newIds.has(id))
    })
  }, [data])

  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const allSelected: boolean | 'indeterminate' =
    tableData.length === 0
      ? false
      : selectedIds.length === tableData.length
        ? true
        : selectedIds.length > 0
          ? 'indeterminate'
          : false

  const toggleAll = (checked: boolean | 'indeterminate') => {
    setSelectedIds(checked === true ? tableData.map((v) => v.id) : [])
  }

  const toggleRow = (id: string, checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) =>
      checked === true
        ? [...new Set([...prev, id])]
        : prev.filter((v) => v !== id),
    )
  }

  const handleCopyRow = (row: ProductType) => {
    setTableData((prev) => [
      {
        ...row,
        id: crypto.randomUUID(),
      },
      ...prev,
    ])
  }

  const handleStatusChange = (
    id: string,
    status: ProductType['status'],
  ) => {
    setTableData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    )
  }

  const handleDelete = async () => {
    if (selectedIds.length === 0 || isDeleting) return

    const boardIds = selectedIds
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id))

    if (boardIds.length === 0) return

    await deleteBoards(boardIds)
    setSelectedIds([])
  }

  return {
    tableData,
    setTableData,
    selectedIds,
    setSelectedIds,
    selectedIdSet,
    allSelected,
    toggleAll,
    toggleRow,
    handleCopyRow,
    handleStatusChange,
    handleDelete,
    isDeleting,
  }
}
