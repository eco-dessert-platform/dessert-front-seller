import { Dropdown } from '@dessert/ui'

import {
  PRODUCT_BOARD_SORT_OPTIONS,
  type ProductBoardSortType,
} from '@/entity/products/product/product-board-sort.constants'

type ProductTopAreaSortProps = {
  sortBy: ProductBoardSortType
  onSortChange: (sortBy: ProductBoardSortType) => void
}

const ProductTopAreaSort = ({
  sortBy,
  onSortChange,
}: ProductTopAreaSortProps) => {
  return (
    <Dropdown
      options={[...PRODUCT_BOARD_SORT_OPTIONS]}
      value={sortBy}
      placeholder="최신순"
      onSelect={(value) => onSortChange(value as ProductBoardSortType)}
      className="w-0 min-w-[150px] shrink-0"
    />
  )
}

export default ProductTopAreaSort
