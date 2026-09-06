import { useEffect, useRef } from 'react'

export const useEditorImageInsert = (
  setEditorImageFiles: (files: Map<string, File>) => void,
) => {
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
