import { Text } from '@dessert/ui'
import { Info } from 'lucide-react'

const PaymentHoldNotice = () => {
  return (
    <div className="flex items-center gap-4">
      <Info size={18} className="text-gray-700" aria-label="지급보류 안내" />
      <Text variant="body12-sb" color="gray-700">
        자세한 지급보류 사유 및 해제 요청은 고객센터로 문의해주세요.
      </Text>
    </div>
  )
}

export default PaymentHoldNotice
