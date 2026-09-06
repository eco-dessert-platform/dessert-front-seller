import { Pagination, Table } from '@dessert/ui'

import type { ProductType } from '@/entity/products/product/product.type'
import type { ProductBoardSortType } from '@/entity/products/product/product-board-sort.constants'

import { getResultColumns } from './product-list-columns'
import { useProductList } from './product-list.hook'
import ProductTopAreaBulkDelete from './product-top-area/product-top-area-bulk-delete'
import ProductTopAreaCounter from './product-top-area/product-top-area-counter'
import ProductTopAreaSort from './product-top-area/product-top-area-sort'

type ResultTableProps = {
  data: ProductType[]
  totalElements: number
  currentPage: number
  totalPages: number
  sortBy: ProductBoardSortType
  isLoading?: boolean
  isError?: boolean
  onSortChange: (sortBy: ProductBoardSortType) => void
  onPageChange: (page: number) => void
  onRetry?: () => void
}

export const ResultTable = ({
  data,
  totalElements,
  currentPage,
  totalPages,
  sortBy,
  isLoading = false,
  isError = false,
  onSortChange,
  onPageChange,
  onRetry,
}: ResultTableProps) => {
  const {
    tableData,
    selectedIds,
    toggleAll,
    toggleRow,
    allSelected,
    selectedIdSet,
    handleCopyRow,
    handleStatusChange,
    handleDelete,
    isDeleting,
  } = useProductList({ data })

  const columns = getResultColumns({
    selectedIds,
    allSelected,
    selectedIdSet,
    onToggleAll: toggleAll,
    onToggleRow: toggleRow,
    onCopyRow: handleCopyRow,
    onStatusChange: handleStatusChange,
  })

  const isEmpty = !isLoading && !isError && tableData.length === 0

  return (
    <div>
      <Table
        data={tableData}
        columns={columns}
        tableClassName="w-full table-fixed"
        topArea={
          <div className="flex w-full items-center justify-between gap-16">
            <div className="flex items-center gap-10">
              <ProductTopAreaSort sortBy={sortBy} onSortChange={onSortChange} />
              <ProductTopAreaCounter
                selectedIds={selectedIds}
                tableData={totalElements}
              />
              <ProductTopAreaBulkDelete
                onDelete={() => {
                  void handleDelete()
                }}
                disabled={selectedIds.length === 0 || isDeleting}
              />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        }
      />

      {isLoading && (
        <div className="flex items-center justify-center py-40 typo-title-14-r text-gray-500">
          상품 목록을 불러오는 중입니다.
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center gap-12 py-40">
          <p className="typo-title-14-r text-gray-500">
            상품 목록을 불러오지 못했습니다.
          </p>
          {onRetry && (
            <button
              type="button"
              className="typo-title-14-m text-primary-500 underline"
              onClick={onRetry}
            >
              다시 시도
            </button>
          )}
        </div>
      )}

      {isEmpty && (
        <div className="flex items-center justify-center py-40 typo-title-14-r text-gray-500">
          등록된 상품이 없습니다.
        </div>
      )}
    </div>
  )
}
