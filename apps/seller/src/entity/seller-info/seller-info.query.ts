import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  checkStoreName,
  getAccountVerification,
  getStore,
  requestStoreNameChange,
  updateSellerAccount,
  updateStoreDetail,
} from './seller-info.api'

export const sellerInfoQueries = {
  all: () => ['sellerInfo'],
  store: () =>
    queryOptions({
      queryKey: [...sellerInfoQueries.all(), 'store'],
      queryFn: getStore,
    }),
  accountVerification: () =>
    queryOptions({
      queryKey: [...sellerInfoQueries.all(), 'accountVerification'],
      queryFn: getAccountVerification,
      staleTime: 0,
    }),
}

export function useCheckStoreNameMutation() {
  return useMutation({
    mutationFn: checkStoreName,
  })
}

export function useRequestStoreNameChangeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestStoreNameChange,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sellerInfoQueries.store().queryKey,
      })
    },
  })
}

export function useUpdateSellerAccountMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSellerAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sellerInfoQueries.accountVerification().queryKey,
      })
    },
  })
}

export function useUpdateStoreDetailMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStoreDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sellerInfoQueries.store().queryKey,
      })
    },
  })
}
