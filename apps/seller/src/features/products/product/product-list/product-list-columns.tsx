import { Button, Checkbox } from '@dessert/ui'
import { ColumnDef } from '@tanstack/react-table'

import { ProductType } from '@/entity/products/product/product.type'

import ProductListCellStatus from './product-list-cell/product-list-cell-status'

type Args = {
  selectedIds: string[]
  allSelected: boolean | 'indeterminate'
  selectedIdSet: Set<string>
  onToggleAll: (checked: boolean | 'indeterminate') => void
  onToggleRow: (id: string, checked: boolean | 'indeterminate') => void
  onCopyRow: (row: ProductType) => void
  onStatusChange: (id: string, status: ProductType['status']) => void
}

const widthMeta = (widthClass: string) =>
  ({
    flexible: true,
    headerClassName: widthClass,
    className: widthClass,
  }) as const

export const getResultColumns = ({
  allSelected,
  selectedIdSet,
  onToggleAll,
  onToggleRow,
  onCopyRow,
  onStatusChange,
}: Args): ColumnDef<ProductType>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox checked={allSelected} onCheckedChange={onToggleAll} />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={selectedIdSet.has(row.original.id)}
          onCheckedChange={(checked) => onToggleRow(row.original.id, checked)}
        />
      )
    },
    meta: widthMeta('w-[5%]'),
  },
  {
    header: '등록상품',
    accessorKey: 'productName',
    cell: ({ row }) => (
      <div className="flex min-w-0 items-center gap-16">
        <img
          src={row.original.thumbnailUrl}
          alt={row.original.productName}
          className="h-header w-[80px] shrink-0 rounded-8 bg-gray-100 object-cover"
        />
        <div className="line-clamp-2 min-w-0 flex-1 text-left typo-title-14-r text-gray-900">
          {row.original.productName}
        </div>
      </div>
    ),
    meta: widthMeta('w-[32%]'),
  },
  {
    header: '재고상태',
    accessorKey: 'stockStatus',
    cell: ({ row }) => (
      <div className="text-center typo-title-14-r text-gray-900">
        {row.original.stockStatus}
      </div>
    ),
    meta: widthMeta('w-[11%]'),
  },
  {
    header: '판매가',
    accessorKey: 'salePrice',
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <div className="typo-body-12-r text-gray-500 line-through">
          {`${row.original.originPrice.toLocaleString()}원`}
        </div>
        <div className="typo-title-14-sb text-gray-900">
          {`${row.original.salePrice.toLocaleString()}원`}
        </div>
      </div>
    ),
    meta: widthMeta('w-[14%]'),
  },
  {
    header: '배송비',
    accessorKey: 'shipping',
    cell: ({ row }) => (
      <div className="flex flex-col items-center">
        <div className="typo-title-14-sb text-gray-900">
          {`${row.original.shipping.price.toLocaleString()}원`}
        </div>
        <div className="typo-body-12-r text-primary-500">
          {row.original.shipping.type}
        </div>
        {row.original.shipping.minimumPrice != null && (
          <div className="typo-body-12-r text-gray-500">
            {`${row.original.shipping.minimumPrice.toLocaleString()}원`}
          </div>
        )}
      </div>
    ),
    meta: widthMeta('w-[12%]'),
  },
  {
    header: '판매상태',
    accessorKey: 'status',
    cell: ({ row }) => (
      <ProductListCellStatus
        status={row.original.status}
        onStatusChange={(status) => onStatusChange(row.original.id, status)}
      />
    ),
    meta: widthMeta('w-[12%]'),
  },
  {
    header: '관리',
    id: 'actions',
    cell: ({ row }) => {
      const onEdit = () => {}

      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <Button
            variant="primary-outlined"
            title="수정"
            size="sm"
            onClick={onEdit}
          />
          <Button
            variant="secondary-outlined"
            title="복사"
            size="sm"
            onClick={() => onCopyRow(row.original)}
          />
        </div>
      )
    },
    meta: widthMeta('w-[14%]'),
  },
]
