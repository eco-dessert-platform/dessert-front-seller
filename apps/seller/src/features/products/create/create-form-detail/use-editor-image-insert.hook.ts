import { useEffect, useRef } from 'react'

import { useProductEditStore } from '@/features/products/edit/product-edit.store'

import { useProductCreationStore } from '../create-form/product-creation.store'

type EditorImageTarget = 'create' | 'edit'

export const useEditorImageInsert = (target: EditorImageTarget = 'create') => {
  const setCreateEditorImageFiles = useProductCreationStore(
    (state) => state.setEditorImageFiles,
  )
  const setEditEditorImageFiles = useProductEditStore(
    (state) => state.setEditorImageFiles,
  )

  const setEditorImageFiles =
    target === 'edit' ? setEditEditorImageFiles : setCreateEditorImageFiles

  const editorImageFiles = useRef<Map<string, File>>(new Map())

  const handleImageInsert = async (file: File) => {
    const blobUrl = URL.createObjectURL(file)
    editorImageFiles.current.set(blobUrl, file)
    return blobUrl
  }

  useEffect(() => {
    const currentImages = editorImageFiles.current
    return () => {
      setEditorImageFiles(new Map(currentImages))
      currentImages.clear()
    }
  }, [setEditorImageFiles])

  return { handleImageInsert, editorImageFiles }
}
