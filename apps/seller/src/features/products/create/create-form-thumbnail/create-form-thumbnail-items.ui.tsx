import { useEffect, useState } from 'react'

import { XIcon } from '@dessert/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { isExistingImageRef } from './create-form-thumbnail.type'

import type { ExtraImageItem, MainImageValue } from './create-form-thumbnail.type'

interface SortableImageItemsProps {
  id: string
  image: ExtraImageItem
  onDelete: () => void
}

export const SortableImageItems = ({
  id,
  image,
  onDelete,
}: SortableImageItemsProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    transition,
    zIndex: isDragging ? 999 : 1,
    opacity: isDragging ? 0.3 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      <ImagePreviewItem image={image} onDelete={onDelete} />
    </div>
  )
}

interface ImagePreviewItemProps {
  image: MainImageValue | ExtraImageItem
  onDelete: () => void
}

export const ImagePreviewItem = ({
  image,
  onDelete,
}: ImagePreviewItemProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    if (!image) {
      setPreviewUrl('')
      return
    }

    if (isExistingImageRef(image)) {
      setPreviewUrl(image.url)
      return
    }

    const file =
      image instanceof File
        ? image
        : 'file' in image && image.file instanceof File
          ? image.file
          : null

    if (!file) {
      setPreviewUrl('')
      return
    }

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [image])

  return (
    <div className="relative h-[120px] w-[120px] overflow-hidden rounded-16 border border-gray-100 bg-gray-50">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          className="size-full object-cover"
        />
      )}
      <button
        type="button"
        aria-label="이미지 삭제"
        onClick={onDelete}
        className="absolute top-6 right-6 cursor-pointer rounded-full bg-black/10 p-2 text-white transition-colors hover:bg-gray-900/50"
      >
        <XIcon className="size-12" />
      </button>
    </div>
  )
}
