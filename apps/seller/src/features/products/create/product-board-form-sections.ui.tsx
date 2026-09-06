import { CreateFormContainer } from '@/features/products/create/create-form'
import { ProductDeliveryArea } from '@/features/products/create/create-form-delivery'
import { ProductDetailArea } from '@/features/products/create/create-form-detail'
import { ProductDisclosureArea } from '@/features/products/create/create-form-disclosure'
import { ProductInfoArea } from '@/features/products/create/create-form-info'
import { ProductOptionsArea } from '@/features/products/create/create-form-options'
import { ThumbnailUploadArea } from '@/features/products/create/create-form-thumbnail'
import { ProductHeader } from '@/features/products/create/create-header'

interface ProductBoardFormSectionsProps {
  productDetail: string
  onOpenDetail: () => void
}

/** create / edit 공용 폼 섹션 */
export function ProductBoardFormSections({
  productDetail,
  onOpenDetail,
}: ProductBoardFormSectionsProps) {
  return (
    <>
      <ProductHeader />
      <CreateFormContainer id="productInfo" className="mt-22">
        <ProductInfoArea />
      </CreateFormContainer>

      <CreateFormContainer id="productDelivery">
        <ProductDeliveryArea />
      </CreateFormContainer>

      <CreateFormContainer id="productThumbnail">
        <ThumbnailUploadArea />
      </CreateFormContainer>

      <CreateFormContainer id="productOptions">
        <ProductOptionsArea />
      </CreateFormContainer>

      <CreateFormContainer id="productDetail">
        <ProductDetailArea
          productDetail={productDetail}
          onOpenDetail={onOpenDetail}
        />
      </CreateFormContainer>

      <CreateFormContainer id="productDisclosure" className="mb-40">
        <ProductDisclosureArea />
      </CreateFormContainer>
    </>
  )
}
