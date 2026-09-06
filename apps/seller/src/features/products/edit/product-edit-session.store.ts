import { create } from 'zustand'

import type { CreateProductForm } from '@/features/products/create'

interface ProductEditSessionState {
  boardId: number | null
  formValues: CreateProductForm | null
  save: (boardId: number, formValues: CreateProductForm) => void
  clear: () => void
}

/**
 * edit ↔ edit/detail 왕복 시 RHF 폼 값을 보존합니다.
 * create 세션 스토어와 분리합니다.
 */
export const useProductEditSessionStore = create<ProductEditSessionState>(
  (set) => ({
    boardId: null,
    formValues: null,
    save: (boardId, formValues) => set({ boardId, formValues }),
    clear: () => set({ boardId: null, formValues: null }),
  }),
)
