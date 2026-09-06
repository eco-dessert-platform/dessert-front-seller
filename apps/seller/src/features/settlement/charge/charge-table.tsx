import type { ColumnDef } from '@tanstack/react-table'
import { Text } from '@dessert/ui'

import {
  IChargePageResponse,
  IChargeRow,
} from '@/entity/settlement/charge/entities'

import ChargeTableTop from './charge-table-top'
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
} from '@/entity/settlement/charge/constants'
import Table from '@/shared/components/ui/table/table'

const chargeColumns: ColumnDef<IChargeRow>[] = [
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        일자
      </Text>
    ),
    accessorKey: 'baseDate',
    size: 160,
    enableResizing: false,
    cell: ({ row }) => <Text variant="body14-r">{row.original.baseDate}</Text>,
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        정산ID
      </Text>
    ),
    accessorKey: 'settlementId',
    size: 180,
    enableResizing: false,
    cell: ({ row }) => (
      <Text variant="body14-r">{row.original.settlementId}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        구분
      </Text>
    ),
    accessorKey: 'category',
    size: 130,
    enableResizing: false,
    cell: ({ row }) => (
      <Text variant="body14-r">{CATEGORY_LABELS[row.original.category]}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        상태
      </Text>
    ),
    accessorKey: 'status',
    size: 130,
    enableResizing: false,
    cell: ({ row }) => (
      <Text variant="body14-r">{STATUS_LABELS[row.original.status]}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        금액
      </Text>
    ),
    accessorKey: 'amount',
    enableResizing: true,
    size: 130,
    meta: {
      flexible: true,
    },
    cell: ({ row }) => (
      <Text variant="body14-r">{row.original.amount.toLocaleString()}</Text>
    ),
  },
]

interface IChargeTableProps {
  pageResponse?: IChargePageResponse
  onPageChange: (page: number) => void
}

const ChargeTable = ({ pageResponse, onPageChange }: IChargeTableProps) => {
  const data = pageResponse ?? {
    content: [],
    page: 0,
    totalPages: 0,
    totalElements: 0,
  }

  return (
    <div className="[&_td]:border-r [&_td]:border-gray-300 [&_td:last-child]:border-r-0 [&_th]:border-r [&_th]:border-gray-300 [&_th:last-child]:border-r-0">
      <Table
        data={data.content}
        columns={chargeColumns}
        fillWidth={true}
        topArea={
          <ChargeTableTop
            currentPage={data.page + 1}
            totalPages={data.totalPages}
            onPageChange={onPageChange}
          />
        }
        emptyDesc="조회된 충전금 현황이 없어요"
        scrollHeight={498}
      />
    </div>
  )
}

export default ChargeTable
