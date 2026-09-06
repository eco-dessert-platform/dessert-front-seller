import { useEffect, useRef, useState } from 'react'

import { FormProvider } from 'react-hook-form'

import {
  ProductBoardFormSections,
  useCreateFormPersistence,
  useCreateFunnelEntry,
  useCreateProductForm,
} from '@/features/products/create'
import {
  CreateDraftModal,
  useCreateDraft,
  useCreateDraftStore,
} from '@/features/products/create/create-draft'
import { CreateFooter } from '@/features/products/create/create-footer'
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false)
  const { draft } = useCreateDraftStore()
  const isInitialMount = useRef(true)
  const { handleRestoreDraft, clearDraft } = useCreateDraft()

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
      <ProductBoardFormSections />
      <CreateFooter onPreview={() => setIsPreviewOpen(true)} />
      {isPreviewOpen && (
        <ProductPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
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
