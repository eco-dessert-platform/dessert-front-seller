import { useRef } from 'react'

import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button, Editor } from '@dessert/ui'
import { useNavigate } from 'react-router'

import { useEditorImageInsert } from '@/features/products/create'
import { useCreateFormSessionStore } from '@/features/products/create/create-form/create-form-session.store'
import { navigateBackToCreateFromDetail } from '@/features/products/create/create-form/create-funnel-navigation.utils'
import { useProductCreationStore } from '@/features/products/create/create-form/product-creation.store'
import './create-detail-editor.css'
import { cn } from '@/shared/libs/utils'

export function DetailEditPage() {
  const navigate = useNavigate()
  const { productDetail, setProductDetail } = useProductCreationStore()

  const localDetailRef = useRef(productDetail)
  const setEditorImageFiles = useProductCreationStore(
    (state) => state.setEditorImageFiles,
  )
  const { handleImageInsert } = useEditorImageInsert(setEditorImageFiles)

  const navigateBackToCreate = () => {
    navigateBackToCreateFromDetail(navigate)
  }

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <header className="flex h-header shrink-0 items-center border-b border-gray-300 bg-white px-24 py-10">
        <div className="flex items-center">
          <BbanggreuiOvenLogo className="h-[42px] w-auto" />
        </div>
      </header>

      <main
        className={cn(
          // eslint-disable-next-line better-tailwindcss/no-unknown-classes
          'detail-edit-page flex flex-1 flex-col items-center overflow-auto',
        )}
      >
        <div className="flex size-full flex-col bg-white">
          <Editor
            value={productDetail}
            onChange={(val) => {
              localDetailRef.current = val
            }}
            image={true}
            onImageUpload={handleImageInsert}
            placeholder="자유롭게 상세페이지를 작성해보세요 (권장크기 : 가로 860px)"
            className="block! size-full rounded-none! border-none!"
          />
        </div>
      </main>

      <footer className="flex w-full shrink-0 items-center justify-end gap-12 border-t border-gray-200 p-24">
        <Button
          type="button"
          title="취소"
          variant="primary-outlined"
          size="lg"
          onClick={navigateBackToCreate}
        />
        <Button
          type="button"
          title="등록하기"
          variant="primary-filled"
          size="lg"
          onClick={() => {
            setProductDetail(localDetailRef.current)
            useCreateFormSessionStore
              .getState()
              .updateProductDetail(localDetailRef.current)
            navigateBackToCreate()
          }}
        />
      </footer>
    </div>
  )
}
