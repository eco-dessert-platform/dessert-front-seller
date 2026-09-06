import { useEffect, useMemo, useState } from 'react'

import { Button } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, Resolver, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import {
  type ProvisionalSellerBoardDetail,
  boardDetailQueries,
} from '@/entity/products'
import {
  CreateProductForm,
  ProductBoardFormSections,
  createProductSchema,
} from '@/features/products/create'
import { CreateFooter } from '@/features/products/create/create-footer'
import { ProductPreviewModal } from '@/features/products/create/create-preview'
import { EDIT_FORM_TOAST } from '@/features/products/edit/edit-form-toast.constants'
import { mapProductDetailToFormValues } from '@/features/products/edit/map-product-detail-to-form.utils'
import { useProductEditSessionStore } from '@/features/products/edit/product-edit-session.store'
import { useProductEditStore } from '@/features/products/edit/product-edit.store'
import { ProductFormModeProvider } from '@/features/products/edit/product-form-mode.context'

function EditPage() {
  const { boardId: boardIdParam } = useParams<{ boardId: string }>()
  const boardId = Number(boardIdParam)

  const { data, isLoading, isError, refetch, isFetching } = useQuery(
    boardDetailQueries.detail(boardId),
  )

  if (!Number.isFinite(boardId) || boardId <= 0) {
    return (
      <div className="flex flex-col items-center gap-12 py-40">
        <p className="typo-body-14-r text-gray-500">
          올바르지 않은 상품 정보예요.
        </p>
      </div>
    )
  }

  if (isLoading || (isFetching && !data)) {
    return (
      <div className="py-40 text-center typo-body-14-r text-gray-500">
        상품 정보를 불러오는 중이에요.
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center gap-12 py-40">
        <p className="typo-body-14-r text-gray-500">
          {EDIT_FORM_TOAST.LOAD_ERROR}
        </p>
        <Button
          title="다시 시도"
          variant="secondary-outlined"
          onClick={() => void refetch()}
        />
      </div>
    )
  }

  return (
    <ProductFormModeProvider value={{ mode: 'edit', boardId }}>
      <EditPageHydrated boardId={boardId} detail={data} />
    </ProductFormModeProvider>
  )
}

function EditPageHydrated({
  boardId,
  detail,
}: {
  boardId: number
  detail: ProvisionalSellerBoardDetail
}) {
  const mapped = useMemo(
    () => mapProductDetailToFormValues(detail),
    [detail],
  )
  const hydrateProductDetail = useProductEditStore(
    (state) => state.hydrateProductDetail,
  )
  const sessionBoardId = useProductEditSessionStore((state) => state.boardId)
  const sessionFormValues = useProductEditSessionStore(
    (state) => state.formValues,
  )

  const restoredFormValues =
    sessionBoardId === boardId && sessionFormValues
      ? sessionFormValues
      : mapped.formValues

  const form = useForm<CreateProductForm>({
    resolver: zodResolver(createProductSchema) as Resolver<CreateProductForm>,
    defaultValues: restoredFormValues,
    mode: 'onChange',
  })

  useEffect(() => {
    hydrateProductDetail(boardId, mapped.productDetail)

    if (sessionBoardId === boardId && sessionFormValues) {
      form.reset(sessionFormValues)
      return
    }

    form.reset(mapped.formValues)
  }, [
    boardId,
    form,
    hydrateProductDetail,
    mapped,
    sessionBoardId,
    sessionFormValues,
  ])

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  return (
    <FormProvider {...form}>
      <ProductBoardFormSections />
      <CreateFooter onPreview={() => setIsPreviewOpen(true)} />
      {isPreviewOpen && (
        <ProductPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </FormProvider>
  )
}

export default EditPage
