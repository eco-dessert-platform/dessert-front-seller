import { type ReactNode, createContext, useContext } from 'react'

export type ProductFormMode = 'create' | 'edit'

export type ProductFormModeContextValue =
  | { mode: 'create' }
  | { mode: 'edit'; boardId: number }

const ProductFormModeContext = createContext<ProductFormModeContextValue>({
  mode: 'create',
})

export function ProductFormModeProvider({
  value,
  children,
}: {
  value: ProductFormModeContextValue
  children: ReactNode
}) {
  return (
    <ProductFormModeContext.Provider value={value}>
      {children}
    </ProductFormModeContext.Provider>
  )
}

export function useProductFormMode() {
  return useContext(ProductFormModeContext)
}
