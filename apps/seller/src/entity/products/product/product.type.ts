export type ProductType = {
  id: string
  sellerName?: string
  productName: string
  thumbnailUrl?: string
  stockStatus: string
  salePrice: number
  originPrice: number
  shipping: {
    type: '무료' | '조건부 무료' | '유료'
    price: number
    minimumPrice?: number
  }
  status: 'onSale' | 'stopSale' | 'soldOut' | 'pending' | 'banned'
}
