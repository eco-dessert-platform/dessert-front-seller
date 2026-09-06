import { useEffect } from 'react'

import { PlusIcon, SquarePenIcon } from '@dessert/icons'
import { Button, Label } from '@dessert/ui'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import AppLogoImage from '@/assets/images/apple-120x120.png'
import { navigateToEditDetail } from '@/features/products/edit/edit-funnel-navigation.utils'
import { useProductEditSessionStore } from '@/features/products/edit/product-edit-session.store'
import { useProductEditStore } from '@/features/products/edit/product-edit.store'
import { useProductFormMode } from '@/features/products/edit/product-form-mode.context'

import { CreateProductForm, useProductCreationStore } from '../create-form'
import { navigateToCreateDetail } from '../create-form/create-funnel-navigation.utils'
import { useCreateHeaderSteps } from '../create-header'

export const ProductDetailArea = () => {
  const navigate = useNavigate()
  const mode = useProductFormMode()
  const form = useFormContext<CreateProductForm>()
  const createProductDetail = useProductCreationStore(
    (state) => state.productDetail,
  )
  const editProductDetail = useProductEditStore((state) => state.productDetail)
  const saveEditSession = useProductEditSessionStore((state) => state.save)
  const { setProductFields } = useCreateHeaderSteps()

  const productDetail =
    mode.mode === 'edit' ? editProductDetail : createProductDetail

  const hasContent =
    productDetail.trim() !== '' && productDetail !== '<p><br></p>'

  useEffect(() => {
    setProductFields({ productDetail: hasContent })
  }, [hasContent, setProductFields])

  const handleEditClick = () => {
    if (mode.mode === 'edit') {
      saveEditSession(mode.boardId, form.getValues())
      navigateToEditDetail(navigate, mode.boardId)
      return
    }
    navigateToCreateDetail(navigate)
  }

  return (
    <>
      <div className="mb-24 flex flex-col gap-4">
        <Label
          label="상세페이지 등록"
          className="typo-heading-20-sb text-gray-900"
        />
        <p className="typo-title-16-r text-gray-700">권장 크기 : 가로 860px</p>
      </div>

      {hasContent ? (
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center justify-center gap-8 pt-10 pb-20">
            <img
              src={AppLogoImage}
              alt="App Logo"
              className="size-[60px] rounded-10 object-contain"
            />
            <p className="typo-heading-18-sb text-primary-500">
              작성된 내용이 있어요!
            </p>
          </div>
          <Button
            type="button"
            title="상세페이지 수정"
            variant="primary-outlined"
            size="lg"
            leftIcon={<SquarePenIcon width={24} height={24} />}
            className="w-full"
            onClick={handleEditClick}
          />
        </div>
      ) : (
        <Button
          type="button"
          title="상세페이지 등록"
          variant="primary-outlined"
          size="lg"
          leftIcon={<PlusIcon width={24} height={24} />}
          className="w-full"
          onClick={handleEditClick}
        />
      )}
    </>
  )
}
