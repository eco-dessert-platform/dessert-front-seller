import { create } from 'zustand'

interface ProductEditState {
  activeBoardId: number | null
  productDetail: string
  /** hydration 시점의 상세 HTML — dirty 비교용 */
  initialProductDetail: string
  editorImageFiles: Map<string, File>
  hydrateProductDetail: (boardId: number, content: string) => void
  setProductDetail: (content: string) => void
  setEditorImageFiles: (files: Map<string, File>) => void
  reset: () => void
}

/**
 * 상품 수정 전용 상세 HTML / 에디터 이미지 스토어.
 * create의 useProductCreationStore와 분리해 상태가 섞이지 않도록 합니다.
 */
export const useProductEditStore = create<ProductEditState>((set, get) => ({
  activeBoardId: null,
  productDetail: '',
  initialProductDetail: '',
  editorImageFiles: new Map(),
  hydrateProductDetail: (boardId, content) => {
    const current = get()
    // 같은 board의 detail 왕복 중이면 API 값으로 덮어쓰지 않음
    if (current.activeBoardId === boardId) {
      return
    }
    set({
      activeBoardId: boardId,
      productDetail: content,
      initialProductDetail: content,
      editorImageFiles: new Map(),
    })
  },
  setProductDetail: (content) => set({ productDetail: content }),
  setEditorImageFiles: (files) => set({ editorImageFiles: files }),
  reset: () => {
    const { editorImageFiles } = get()
    editorImageFiles.forEach((_, blobUrl) => {
      URL.revokeObjectURL(blobUrl)
    })
    set({
      activeBoardId: null,
      productDetail: '',
      initialProductDetail: '',
      editorImageFiles: new Map(),
    })
  },
}))
