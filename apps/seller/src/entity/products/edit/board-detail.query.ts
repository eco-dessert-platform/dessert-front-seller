import { queryOptions } from '@tanstack/react-query'

import { getSellerBoardDetail } from './board-detail.api'
import { productQueries } from '../create/create.query'


export const boardDetailQueries = {
  all: () => [...productQueries.all(), 'detail'] as const,
  detail: (boardId: number) =>
    queryOptions({
      queryKey: [...boardDetailQueries.all(), boardId] as const,
      queryFn: () => getSellerBoardDetail(boardId),
      enabled: Number.isFinite(boardId) && boardId > 0,
    }),
}
