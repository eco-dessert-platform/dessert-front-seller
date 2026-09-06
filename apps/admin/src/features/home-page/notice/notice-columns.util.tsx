import { Button, Checkbox } from '@dessert/ui'

import type { Notice } from '@/entity/home-page/notice'

import type { ColumnDef } from '@tanstack/react-table'

const HEADER_CLASS = 'border-b-[0.8px] border-b-gray-400'
const CELL_CLASS = 'border-r border-gray-200 px-10 text-center'

interface NoticeColumnsArgs {
  allSelected: boolean
  selectedIds: number[]
  onToggleAll: (checked: boolean | 'indeterminate') => void
  onToggleRow: (id: number, checked: boolean | 'indeterminate') => void
  onEdit: (id: number) => void
  onSelectNotice: (id: number) => void
  isTableActionDisabled?: boolean
}

export const getNoticeColumns = ({
  allSelected,
  selectedIds,
  onToggleAll,
  onToggleRow,
  onEdit,
  onSelectNotice,
  isTableActionDisabled = false,
}: NoticeColumnsArgs): ColumnDef<Notice>[] => [
  {
    id: 'select',
    header: () => (
      <Checkbox
        checked={allSelected}
        disabled={isTableActionDisabled}
        onCheckedChange={onToggleAll}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedIds.includes(row.original.id)}
        disabled={isTableActionDisabled}
        onCheckedChange={(checked) => onToggleRow(row.original.id, checked)}
      />
    ),
    size: 40,
  },
  {
    accessorKey: 'title',
    header: '공지사항명',
    cell: ({ row }) => (
      <button
        type="button"
        className="block w-full truncate typo-body-14-r text-gray-900"
        onClick={() => onSelectNotice(row.original.id)}
      >
        {row.original.title}
      </button>
    ),
    size: 410,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'createdAt',
    header: '등록일자',
    cell: ({ row }) => (
      <span className="block truncate typo-body-14-r text-gray-900">
        {row.original.createdAt}
      </span>
    ),
    size: 200,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    accessorKey: 'modifiedAt',
    header: '수정일자',
    cell: ({ row }) => (
      <span className="block truncate typo-body-14-r text-gray-900">
        {row.original.modifiedAt}
      </span>
    ),
    size: 200,
    meta: {
      headerClassName: HEADER_CLASS,
      className: CELL_CLASS,
    },
  },
  {
    id: 'edit',
    header: '수정',
    cell: ({ row }) => (
      <Button
        title="수정"
        size="sm"
        variant="primary-outlined"
        disabled={isTableActionDisabled}
        onClick={() => onEdit(row.original.id)}
      />
    ),
    size: 95,
    meta: {
      headerClassName: HEADER_CLASS,
      className: 'px-10 text-center',
    },
  },
]
