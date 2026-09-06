import { toast } from '@dessert/ui'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  CreateProductForm,
  buildUpdateProductBoardFormData,
  useUpdateProductBoardMutation,
} from '@/features/products/create'
import {
  isExistingImageRef,
  isExtraImageFileItem,
} from '@/features/products/create/create-form-thumbnail/create-form-thumbnail.type'
import { ROUTES } from '@/shared/constant/routes'

import { EDIT_FORM_TOAST } from './edit-form-toast.constants'
import { useProductEditSessionStore } from './product-edit-session.store'
import { useProductEditStore } from './product-edit.store'
import { useProductFormMode } from './product-form-mode.context'

/**
 * 폼의 기존 URL / 신규 File을 update FormData 인자로 분리합니다.
 */
export function resolveUpdateImagePayload(data: CreateProductForm) {
  const existingThumbnailUrl = isExistingImageRef(data.mainImage)
    ? data.mainImage.url
    : undefined

  const mainImageFile = data.mainImage instanceof File ? data.mainImage : null

  const existingSubImageUrls = (data.extraImages ?? [])
    .filter(isExistingImageRef)
    .map((item) => item.url)

  const newSubImageFiles = (data.extraImages ?? [])
    .filter(isExtraImageFileItem)
    .map((item) => item.file)

  return {
    existingThumbnailUrl,
    mainImageFile,
    existingSubImageUrls,
    newSubImageFiles,
  }
}

export function useSubmitEditForm() {
  const form = useFormContext<CreateProductForm>()
  const navigate = useNavigate()
  const mode = useProductFormMode()
  const { productDetail, editorImageFiles, reset } = useProductEditStore()
  const clearEditSession = useProductEditSessionStore((state) => state.clear)
  const { mutateAsync, isPending } = useUpdateProductBoardMutation()

  const showSaveErrorToast = (errorMessage?: string) => {
    toast.error(
      EDIT_FORM_TOAST.SAVE_ERROR.title,
      errorMessage || EDIT_FORM_TOAST.SAVE_ERROR.description,
    )
  }

  const handleSubmit = form.handleSubmit(
    async (data) => {
      if (mode.mode !== 'edit') return

      try {
        const {
          existingThumbnailUrl,
          mainImageFile,
          existingSubImageUrls,
          newSubImageFiles,
        } = resolveUpdateImagePayload(data)

        if (!mainImageFile && !existingThumbnailUrl) {
          showSaveErrorToast('대표 이미지는 필수입니다.')
          return
        }

        const boardDetailImages = Array.from(editorImageFiles.values())
        const formData = buildUpdateProductBoardFormData({
          data: {
            ...data,
            mainImage: mainImageFile,
            extraImages: [],
          },
          productDetail,
          productIdsByOptionIndex: data.options.map(
            (option) => option.productId ?? null,
          ),
          boardDetailImages,
          existingThumbnailUrl,
          existingSubImageUrls,
          newSubImageFiles,
        })

        await mutateAsync({ boardId: mode.boardId, formData })

        toast.success(EDIT_FORM_TOAST.SAVE_SUCCESS)
        clearEditSession()
        reset()
        navigate(ROUTES.PRODUCTS.ALL)
      } catch (error) {
        const errorMessage =
          error instanceof Error && error.message ? error.message : undefined
        showSaveErrorToast(errorMessage)
      }
    },
    () => {
      showSaveErrorToast()
    },
  )

  return { handleSubmit, isPending }
}
