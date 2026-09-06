import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@dessert/ui'

import {
  deleteProductBoards,
  getMyStore,
  productQueries,
} from '@/entity/products'

export const useDeleteProductBoardsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (boardIds: number[]) => {
      const store = await getMyStore()
      return deleteProductBoards(store.storeId, boardIds)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: productQueries.all(),
      })
      toast.success('선택한 상품을 삭제했습니다.')
    },
    onError: (error: Error) => {
      toast.error(
        '상품 삭제에 실패했습니다.',
        error.message || '다시 시도해주세요.',
      )
    },
  })
}
