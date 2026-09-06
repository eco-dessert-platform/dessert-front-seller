import { ROUTES } from '@/shared/constant/routes'

export const FROM_EDIT_DETAIL_PAGE_STATE = { fromEditDetailPage: true } as const

type NavigateFn = (to: string, options?: { state?: unknown }) => void

export function navigateToEditDetail(
  navigate: NavigateFn,
  boardId: number | string,
) {
  navigate(ROUTES.PRODUCTS.editDetail(boardId))
}

export function navigateBackToEditFromDetail(
  navigate: NavigateFn,
  boardId: number | string,
) {
  navigate(ROUTES.PRODUCTS.edit(boardId), {
    state: FROM_EDIT_DETAIL_PAGE_STATE,
  })
}
