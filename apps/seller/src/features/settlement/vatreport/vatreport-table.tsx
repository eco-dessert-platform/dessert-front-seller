import type { ColumnDef } from '@tanstack/react-table'
import { Text } from '@dessert/ui'

import { DEFAULT_VAT_REPORT_PAGE_SIZE } from '@/entity/settlement/vatreport/constants'
import type { IVatReportRow } from '@/entity/settlement/vatreport/entities'
import Table from '@/shared/components/ui/table/table'

import VatReportTableTop from './vatreport-table-top'

const formatMonth = (month: string) => month.replace('-', '.')

const formatAmount = (amount: number) => amount.toLocaleString()

const vatReportColumns: ColumnDef<IVatReportRow>[] = [
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        일자
      </Text>
    ),
    accessorKey: 'month',
    enableResizing: false,
    meta: { flexible: true },
    cell: ({ row }) => (
      <Text variant="body14-r">{formatMonth(row.original.month)}</Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        과세 매출금액
      </Text>
    ),
    accessorKey: 'taxableSalesAmount',
    enableResizing: false,
    meta: { flexible: true },
    cell: ({ row }) => (
      <Text variant="body14-r">
        {formatAmount(row.original.taxableSalesAmount)}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        면세 매출금액
      </Text>
    ),
    accessorKey: 'taxFreeSalesAmount',
    enableResizing: false,
    meta: { flexible: true },
    cell: ({ row }) => (
      <Text variant="body14-r">
        {formatAmount(row.original.taxFreeSalesAmount)}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        신용카드
      </Text>
    ),
    accessorKey: 'creditCardAmount',
    enableResizing: false,
    meta: { flexible: true },
    cell: ({ row }) => (
      <Text variant="body14-r">
        {formatAmount(row.original.creditCardAmount)}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        현금영수증 소득공제
      </Text>
    ),
    accessorKey: 'cashReceiptIncomeDeductionAmount',
    enableResizing: false,
    meta: { flexible: true },
    cell: ({ row }) => (
      <Text variant="body14-r">
        {formatAmount(row.original.cashReceiptIncomeDeductionAmount)}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        현금영수증 지출증빙
      </Text>
    ),
    accessorKey: 'cashReceiptExpenseProofAmount',
    enableResizing: false,
    meta: { flexible: true },
    cell: ({ row }) => (
      <Text variant="body14-r">
        {formatAmount(row.original.cashReceiptExpenseProofAmount)}
      </Text>
    ),
  },
  {
    header: () => (
      <Text as="span" variant="body12-m" color="gray-800">
        기타
      </Text>
    ),
    accessorKey: 'etcAmount',
    enableResizing: false,
    meta: { flexible: true },
    cell: ({ row }) => (
      <Text variant="body14-r">{formatAmount(row.original.etcAmount)}</Text>
    ),
  },
]

interface IVatReportTableProps {
  items?: IVatReportRow[]
  page?: number
  size?: number
  onPageChange: (page: number) => void
  onExcelDownload: () => void
}

const VatReportTable = ({
  items = [],
  page = 0,
  size = DEFAULT_VAT_REPORT_PAGE_SIZE,
  onPageChange,
  onExcelDownload,
}: IVatReportTableProps) => {
  const totalPages = Math.max(1, Math.ceil(items.length / size))
  const paginatedItems = items.slice(page * size, (page + 1) * size)

  return (
    <div className="[&_td]:border-r [&_td]:border-gray-300 [&_td:last-child]:border-r-0 [&_th]:border-r [&_th]:border-gray-300 [&_th:last-child]:border-r-0">
      <Table
        data={paginatedItems}
        columns={vatReportColumns}
        fillWidth
        topArea={
          <VatReportTableTop
            currentPage={page + 1}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onExcelDownload={onExcelDownload}
          />
        }
        emptyDesc="조회된 부가세 신고 내역이 없어요"
        scrollHeight={498}
      />
    </div>
  )
}

export default VatReportTable
