import type { ProductType } from './product.type'
import type {
  ProductBoardInventoryStatus,
  ProductBoardItem,
  ProductBoardSaleStatus,
} from './product-board.type'

const INVENTORY_STATUS_LABEL: Record<ProductBoardInventoryStatus, string> = {
  IN_STOCK: '재고있음',
  OUT_OF_STOCK: '재고없음',
}

const SALE_STATUS_TO_UI: Record<ProductBoardSaleStatus, ProductType['status']> =
  {
    ON_SALE: 'onSale',
    OUT_OF_STOCK: 'soldOut',
    STOPPED: 'stopSale',
    PENDING: 'pending',
    BANNED: 'banned',
  }

const DELIVERY_TYPE_TO_SHIPPING: Record<
  string,
  ProductType['shipping']['type']
> = {
  무료: '무료',
  FREE: '무료',
  조건부무료: '조건부 무료',
  '조건부 무료': '조건부 무료',
  CONDITIONAL_FREE: '조건부 무료',
  유료: '유료',
  PAID: '유료',
}

export function mapProductBoardItemToProductType(
  item: ProductBoardItem,
): ProductType {
  const shippingType =
    DELIVERY_TYPE_TO_SHIPPING[item.deliveryType] ??
    (item.deliveryFee === 0
      ? '무료'
      : item.freeShippingConditions > 0
        ? '조건부 무료'
        : '유료')

  return {
    id: String(item.boardId),
    productName: item.title,
    thumbnailUrl: item.thumbnailUrl,
    stockStatus:
      INVENTORY_STATUS_LABEL[item.inventoryStatus] ?? item.inventoryStatus,
    originPrice: item.price,
    salePrice: item.discountPrice,
    shipping: {
      type: shippingType,
      price: item.deliveryFee,
      ...(shippingType === '조건부 무료'
        ? { minimumPrice: item.freeShippingConditions }
        : {}),
    },
    status: SALE_STATUS_TO_UI[item.saleStatus] ?? 'pending',
  }
}
