import { useMutation, useQueryClient } from '@tanstack/react-query'

import { boardDetailQueries, productQueries, updateProductBoard } from '@/entity/products'

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
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: productQueries.all(),
      })
      void queryClient.invalidateQueries({
        queryKey: boardDetailQueries.detail(variables.boardId).queryKey,
      })
    },
  })
}
