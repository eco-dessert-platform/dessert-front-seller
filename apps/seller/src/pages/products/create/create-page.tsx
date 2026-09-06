import { useEffect, useRef, useState } from 'react'

import { FormProvider, useFormContext, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  CreateProductForm,
  ProductBoardFormSections,
  hasCreateFormInput,
  useCreateFormPersistence,
  useCreateFunnelEntry,
  useCreateProductForm,
  useProductCreationStore,
  useSubmitCreateForm,
} from '@/features/products/create'
import {
  CreateDraftModal,
  useCreateDraft,
  useCreateDraftStore,
} from '@/features/products/create/create-draft'
import { CreateFooter } from '@/features/products/create/create-footer'
import { navigateToCreateDetail } from '@/features/products/create/create-form/create-funnel-navigation.utils'
import { ProductPreviewModal } from '@/features/products/create/create-preview'
import { ProductFormModeProvider } from '@/features/products/edit/product-form-mode.context'

function CreatePage() {
  const entryMode = useCreateFunnelEntry()
  const form = useCreateProductForm(entryMode)

  return (
    <ProductFormModeProvider value={{ mode: 'create' }}>
      <FormProvider {...form}>
        <CreatePageInner entryMode={entryMode} />
      </FormProvider>
    </ProductFormModeProvider>
  )
}

interface CreatePageInnerProps {
  entryMode: ReturnType<typeof useCreateFunnelEntry>
}

function CreatePageInner({ entryMode }: CreatePageInnerProps) {
  const navigate = useNavigate()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false)
  const { draft } = useCreateDraftStore()
  const isInitialMount = useRef(true)
  const { handleRestoreDraft, clearDraft, handleSaveDraft } = useCreateDraft()
  const { handleSubmit, isPending } = useSubmitCreateForm()
  const {
    control,
    formState: { isDirty },
  } = useFormContext<CreateProductForm>()
  const values = useWatch({ control }) as CreateProductForm
  const productDetail = useProductCreationStore((state) => state.productDetail)
  const canSubmit = hasCreateFormInput(values, productDetail, isDirty)

  useCreateFormPersistence(entryMode)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false

      if (entryMode === 'restore') return

      if (draft) {
        setIsDraftModalOpen(true)
      }
    }
  }, [draft, entryMode])

  return (
    <>
      <ProductBoardFormSections
        productDetail={productDetail}
        onOpenDetail={() => navigateToCreateDetail(navigate)}
      />
      <CreateFooter
        onPreview={() => setIsPreviewOpen(true)}
        onSubmit={handleSubmit}
        submitLabel="저장하기"
        isPending={isPending}
        canSubmit={canSubmit}
        onSaveDraft={handleSaveDraft}
      />
      {isPreviewOpen && (
        <ProductPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          productDetail={productDetail}
        />
      )}

      {isDraftModalOpen && (
        <CreateDraftModal
          isOpen={isDraftModalOpen}
          onConfirm={() => {
            handleRestoreDraft()
            setIsDraftModalOpen(false)
          }}
          onClose={() => {
            clearDraft()
            setIsDraftModalOpen(false)
          }}
        />
      )}
    </>
  )
}

export default CreatePage
