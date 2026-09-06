import type { ColumnDef } from '@tanstack/react-table'
import { Text } from '@dessert/ui'

import { PAYMENT_HOLD_STATUS_LABELS } from '@/entity/settlement/payment-hold/constants'
import type {
  IPaymentHoldPageResponse,
  IPaymentHoldRow,
} from '@/entity/settlement/payment-hold/entities'
import Table from '@/shared/components/ui/table/table'

import PaymentHoldNotice from './payment-hold-notice'
import PaymentHoldTableTop from './payment-hold-table-top'

const formatAmount = (amount: number) => amount.toLocaleString()

const getStatusLabel = (status: IPaymentHoldRow['status']) =>
  PAYMENT_HOLD_STATUS_LABELS[status]

const PAYMENT_HOLD_COLUMN_MIN_SIZE = 120

const paymentHoldColumns: ColumnDef<IPaymentHoldRow>[] = [
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        지급보류ID
      </Text>
    ),
    accessorKey: 'paymentHoldId',
    size: PAYMENT_HOLD_COLUMN_MIN_SIZE,
    enableResizing: false,
    cell: ({ row }) => (
      <Text variant="body14-r">{row.original.paymentHoldId}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        정산ID
      </Text>
    ),
    accessorKey: 'settlementId',
    size: PAYMENT_HOLD_COLUMN_MIN_SIZE,
    enableResizing: false,
    cell: ({ row }) => (
      <Text variant="body14-r">{row.original.settlementId}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        정산상태
      </Text>
    ),
    accessorKey: 'status',
    size: PAYMENT_HOLD_COLUMN_MIN_SIZE,
    enableResizing: false,
    cell: ({ row }) => (
      <Text variant="body14-r">{getStatusLabel(row.original.status)}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        정산기준일
      </Text>
    ),
    accessorKey: 'baseDate',
    size: PAYMENT_HOLD_COLUMN_MIN_SIZE,
    enableResizing: false,
    cell: ({ row }) => <Text variant="body14-r">{row.original.baseDate}</Text>,
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        정산완료일
      </Text>
    ),
    accessorKey: 'completedDate',
    size: PAYMENT_HOLD_COLUMN_MIN_SIZE,
    enableResizing: false,
    cell: ({ row }) => (
      <Text variant="body14-r">{row.original.completedDate}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        정산금액
      </Text>
    ),
    accessorKey: 'amount',
    size: PAYMENT_HOLD_COLUMN_MIN_SIZE,
    enableResizing: false,
    meta: {
      flexible: true,
    },
    cell: ({ row }) => (
      <Text variant="body14-r">{formatAmount(row.original.amount)}</Text>
    ),
  },
]

interface IPaymentHoldTableProps {
  pageResponse?: IPaymentHoldPageResponse
  onPageChange: (page: number) => void
  onExcelDownload: () => void
}

const PaymentHoldTable = ({
  pageResponse,
  onPageChange,
  onExcelDownload,
}: IPaymentHoldTableProps) => {
  const data = pageResponse ?? {
    content: [],
    page: 0,
    size: 10,
    totalPages: 1,
    totalElements: 0,
  }

  return (
    <div className="[&_td]:border-r [&_td]:border-gray-300 [&_td:last-child]:border-r-0 [&_th]:border-r [&_th]:border-gray-300 [&_th:last-child]:border-r-0 bg-white">
      <Table
        data={data.content}
        columns={paymentHoldColumns}
        fillWidth
        emptyDesc="조회된 지급 보류 내역이 없어요"
        topArea={
          <PaymentHoldTableTop
            currentPage={data.page + 1}
            totalPages={data.totalPages}
            onPageChange={onPageChange}
            onExcelDownload={onExcelDownload}
          />
        }
        bottomArea={<PaymentHoldNotice />}
        scrollHeight={500}
      />
    </div>
  )
}

export default PaymentHoldTable
