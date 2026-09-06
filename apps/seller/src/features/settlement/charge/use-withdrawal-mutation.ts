import { useMutation, useQueryClient } from '@tanstack/react-query'

import { chargeKeys } from '@/entity/settlement/charge/api/charge-keys'
import { chargeService } from '@/entity/settlement/charge/api/charge-service'
import type { IWithdrawalRequest } from '@/entity/settlement/charge/entities'

export const useWithdrawalMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: IWithdrawalRequest) =>
      chargeService.postWithdrawal(request),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: chargeKeys.all() })
    },
  })
}
