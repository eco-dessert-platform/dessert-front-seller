import { useState } from 'react'

import { toast } from '@dessert/ui'
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useFormContext } from 'react-hook-form'

import { CreateProductForm } from '../create-form/product-create.types'

import type { ExtraImageItem, MainImageValue } from './create-form-thumbnail.type'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const MIN_SIZE = 160
const RECOMMENDED_SIZE = 1000

const validateImage = (
  file: File,
): Promise<{ error: string | null; warning: string | null }> => {
  return new Promise((resolve) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      resolve({
        error: 'jpg, jpeg, png 형식의 이미지만 업로드 가능해요',
        warning: null,
      })
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      resolve({ error: '10MB 이하의 이미지만 업로드 가능해요', warning: null })
      return
    }

    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const { width, height } = img
      let warning = null

      if (
        width < RECOMMENDED_SIZE ||
        height < RECOMMENDED_SIZE ||
        width < MIN_SIZE ||
        height < MIN_SIZE ||
        width !== height
      ) {
        warning = '권장 크기 1000×1000, 최소 160×160 이상 (1:1 비율)이에요'
      }

      resolve({ error: null, warning })
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve({ error: '이미지를 읽을 수 없어요', warning: null })
    }
    img.src = url
  })
}

const generateId = () => Math.random().toString(36).substring(2, 11)

export function useProductThumbnailForm() {
  const form = useFormContext<CreateProductForm>()

  const mainImage = form.watch('mainImage')
  const extraImages = form.watch('extraImages') || []
  type DeleteTarget = 'main' | { id: string }
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null)

  const isFormField = mainImage !== null

  const handleMainImageChange = (value: MainImageValue) => {
    form.setValue('mainImage', value, { shouldValidate: true })
  }

  const handleExtraImagesChange = (newItems: ExtraImageItem[]) => {
    form.setValue('extraImages', newItems, { shouldValidate: true })
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = extraImages.findIndex((item) => item.id === active.id)
      const newIndex = extraImages.findIndex((item) => item.id === over.id)

      if (oldIndex < 0 || newIndex < 0) return

      const newOrder = arrayMove(extraImages, oldIndex, newIndex)
      handleExtraImagesChange(newOrder)
    }
  }

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'main' | 'extra',
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (type === 'main') {
      const file = files[0]
      const { error, warning } = await validateImage(file)
      if (error) {
        toast.error(error)
        e.target.value = ''
        return
      }
      if (warning) toast.info(warning)
      handleMainImageChange(file)
    } else {
      const remainingSlots = 9 - extraImages.length
      const selectedFiles = Array.from(files)
      const newValidItems: ExtraImageItem[] = []

      for (const file of selectedFiles) {
        if (newValidItems.length >= remainingSlots) break
        const { error, warning } = await validateImage(file)
        if (error) {
          toast.error(`${file.name}: ${error}`)
        } else {
          if (warning) toast.info(`${file.name}: ${warning}`)
          newValidItems.push({ id: generateId(), kind: 'file', file })
        }
      }

      if (newValidItems.length > 0) {
        handleExtraImagesChange([...extraImages, ...newValidItems])
      }
    }
    e.target.value = ''
  }

  const handleImageDelete = () => {
    if (!deleteTarget) return

    if (deleteTarget === 'main') {
      handleMainImageChange(null)
    } else {
      const newExtraImages = extraImages.filter(
        (item) => item.id !== deleteTarget.id,
      )
      handleExtraImagesChange(newExtraImages)
    }
    setDeleteTarget(null)
  }

  return {
    form,
    mainImage,
    extraImages,
    isFormField,
    deleteTarget,
    sensors,
    setDeleteTarget,
    handleFileChange,
    handleImageDelete,
    handleDragEnd,
  }
}
