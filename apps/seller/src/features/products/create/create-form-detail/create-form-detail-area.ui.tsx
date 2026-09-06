import { useEffect } from 'react'

import { PlusIcon, SquarePenIcon } from '@dessert/icons'
import { Button, Label } from '@dessert/ui'

import AppLogoImage from '@/assets/images/apple-120x120.png'

import { useCreateHeaderSteps } from '../create-header'

interface ProductDetailAreaProps {
  productDetail: string
  onOpenDetail: () => void
}

export const ProductDetailArea = ({
  productDetail,
  onOpenDetail,
}: ProductDetailAreaProps) => {
  const { setProductFields } = useCreateHeaderSteps()

  const hasContent =
    productDetail.trim() !== '' && productDetail !== '<p><br></p>'

  useEffect(() => {
    setProductFields({ productDetail: hasContent })
  }, [hasContent, setProductFields])

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
            onClick={onOpenDetail}
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
          onClick={onOpenDetail}
        />
      )}
    </>
  )
}
