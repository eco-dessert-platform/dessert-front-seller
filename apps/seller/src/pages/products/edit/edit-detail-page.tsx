import { useRef } from 'react'

import { BbanggreuiOvenLogo } from '@dessert/icons'
import { Button, Editor } from '@dessert/ui'
import { useNavigate, useParams } from 'react-router'

import { useEditorImageInsert } from '@/features/products/create'
import { navigateBackToEditFromDetail } from '@/features/products/edit/edit-funnel-navigation.utils'
import { useProductEditStore } from '@/features/products/edit/product-edit.store'
import { ProductFormModeProvider } from '@/features/products/edit/product-form-mode.context'
import { cn } from '@/shared/libs/utils'

import '../create/create-detail-editor.css'

function EditDetailPageInner() {
  const navigate = useNavigate()
  const { boardId: boardIdParam } = useParams<{ boardId: string }>()
  const boardId = Number(boardIdParam)
  const { productDetail, setProductDetail } = useProductEditStore()

  const localDetailRef = useRef(productDetail)
  const setEditorImageFiles = useProductEditStore(
    (state) => state.setEditorImageFiles,
  )
  const { handleImageInsert } = useEditorImageInsert(setEditorImageFiles)

  const navigateBackToEdit = () => {
    navigateBackToEditFromDetail(navigate, boardId)
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
          onClick={navigateBackToEdit}
        />
        <Button
          type="button"
          title="확인"
          variant="primary-filled"
          size="lg"
          onClick={() => {
            setProductDetail(localDetailRef.current)
            navigateBackToEdit()
          }}
        />
      </footer>
    </div>
  )
}

export function EditDetailPage() {
  const { boardId: boardIdParam } = useParams<{ boardId: string }>()
  const boardId = Number(boardIdParam)

  if (!Number.isFinite(boardId) || boardId <= 0) {
    return null
  }

  return (
    <ProductFormModeProvider value={{ mode: 'edit', boardId }}>
      <EditDetailPageInner />
    </ProductFormModeProvider>
  )
}
