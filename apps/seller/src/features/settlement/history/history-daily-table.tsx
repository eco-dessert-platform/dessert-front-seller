import { useMemo } from 'react'

import { Button } from '@dessert/ui'
import { ColumnDef } from '@tanstack/react-table'

import { toSettlement } from '@/entity/settlement/settlement.transformer'
import { DailySettlementPageResponse } from '@/entity/settlement/settlement.type'
import { Settlement } from '@/entity/settlement/types'
import Table from '@/shared/components/ui/table/table'

import {
  DeductionDetailTable,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './history-popover'
import { SettlementTableTopArea } from './history-table-top-area'

const columns: ColumnDef<Settlement>[] = [
  {
    header: '정산ID',
    accessorKey: 'id',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">{row.original.id}</span>
    ),
  },
  {
    header: '정산예정일',
    accessorKey: 'expectedDate',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.expectedDate}
      </span>
    ),
  },
  {
    header: '정산완료일',
    accessorKey: 'completedDate',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.completedDate}
      </span>
    ),
  },
  {
    header: () => (
      <div className="flex flex-col items-center justify-center">
        <span>정산금액</span>
        <span className="typo-body-11-r text-gray-500">(a+b+c+d)</span>
      </div>
    ),
    accessorKey: 'totalAmount',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.totalAmount.toLocaleString()}
      </span>
    ),
  },
  {
    header: '정산금액 상세내역',
    columns: [
      {
        header: '결제금액(a)',
        accessorKey: 'paymentAmount',
        cell: ({ row }) => (
          <span className="typo-body-14-r text-gray-800">
            {row.original.paymentAmount.toLocaleString()}
          </span>
        ),
      },
      {
        header: '수수료(b)',
        accessorKey: 'commission',
        cell: ({ row }) => (
          <span className="typo-body-14-r text-gray-800">
            {row.original.commission.toLocaleString()}
          </span>
        ),
      },
      {
        header: '공제/환급(c)',
        accessorKey: 'deduction',
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-4">
            <span className="typo-body-14-r text-gray-800">
              {row.original.deduction.toLocaleString()}
            </span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary-outlined"
                  size="sm"
                  className="h-24 px-8 py-0 text-gray-600 outline-none"
                  title="상세"
                />
              </PopoverTrigger>
              <PopoverContent title="공제/환급 상세">
                <DeductionDetailTable
                  total={row.original.deduction}
                  shippingFeeChange={
                    row.original.deductionDetails?.shippingFeeChange ?? 0
                  }
                  chargeOffset={
                    row.original.deductionDetails?.chargeOffset ?? 0
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        ),
      },
      {
        header: '지급보류(d)',
        accessorKey: 'withheld',
        cell: ({ row }) => (
          <span className="typo-body-14-r text-gray-800">
            {row.original.withheld.toLocaleString()}
          </span>
        ),
      },
    ],
  },
  {
    header: '정산방식',
    accessorKey: 'method',
    cell: ({ row }) => (
      <span className="typo-body-14-r text-gray-800">
        {row.original.method}
      </span>
    ),
  },
]

interface DailySettlementTableProps {
  pageResponse?: DailySettlementPageResponse['settlements']
  onPageChange: (page: number) => void
  onDownloadExcel: () => void
  isDownloadingExcel?: boolean
}

export const DailySettlementTable = ({
  pageResponse,
  onPageChange,
  onDownloadExcel,
  isDownloadingExcel,
}: DailySettlementTableProps) => {
  const data = useMemo(
    () => (pageResponse?.content ?? []).map(toSettlement),
    [pageResponse],
  )
  const currentPage = (pageResponse?.page ?? 0) + 1
  const totalPages = pageResponse?.totalPages ?? 1

  return (
    <Table
      data={data}
      columns={columns}
      fillWidth
      emptyDesc="조회된 일별 정산내역이 없어요"
      topArea={
        <SettlementTableTopArea
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onDownloadExcel={onDownloadExcel}
          isDownloadingExcel={isDownloadingExcel}
        />
      }
      scrollHeight={500}
    />
  )
}
