import { Button, Pagination } from '@dessert/ui'

import ExcelIcon from '@/assets/icons/icon-excel.svg?react'

interface IPaymentHoldTableTopProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onExcelDownload: () => void
}

const PaymentHoldTableTop = ({
  currentPage,
  totalPages,
  onPageChange,
  onExcelDownload,
}: IPaymentHoldTableTopProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <Button
        variant="secondary-outlined"
        size="sm"
        className="h-30 gap-4 px-10 py-6 text-gray-800"
        leftIcon={<ExcelIcon width={16} height={16} />}
        title="엑셀 다운로드"
        onClick={onExcelDownload}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default PaymentHoldTableTop
