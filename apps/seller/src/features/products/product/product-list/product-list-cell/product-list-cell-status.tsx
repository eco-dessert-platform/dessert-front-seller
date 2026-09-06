import { Badge } from '@dessert/ui'

import { ProductType } from '@/entity/products/product/product.type'

import ProductListCellToggleSale from './product-list-cell-toggle-sale'

type Props = {
  status: ProductType['status']
  onStatusChange: (status: ProductType['status']) => void
}
const badgeMap = {
  onSale: { color: 'green', label: '판매중' },
  stopSale: { color: 'grayDark', label: '판매중지' },
  soldOut: { color: 'red', label: '품절' },
  pending: { color: 'yellow', label: '판매대기' },
  banned: { color: 'gray', label: '판매금지' },
} as const

const ProductListCellStatus = ({ status, onStatusChange }: Props) => {
  const badge = badgeMap[status]

  const handleToggle = () => {
    onStatusChange(status === 'stopSale' ? 'onSale' : 'stopSale')
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Badge color={badge.color} variant="outline" content={badge.label} />
      <ProductListCellToggleSale
        checked={status === 'stopSale'}
        onChange={handleToggle}
      />
    </div>
  )
}

export default ProductListCellStatus
