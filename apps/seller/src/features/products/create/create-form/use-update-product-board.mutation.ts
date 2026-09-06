import { useMutation, useQueryClient } from '@tanstack/react-query'

import { productQueries, updateProductBoard } from '@/entity/products'

export const useUpdateProductBoardMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      boardId,
      formData,
    }: {
      boardId: number
      formData: FormData
    }) => updateProductBoard(boardId, formData),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: productQueries.all(),
      })
    },
  })
}
