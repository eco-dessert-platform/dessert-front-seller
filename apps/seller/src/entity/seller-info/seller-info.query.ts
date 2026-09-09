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
  updateStore,
} from './seller-info.api'

export const sellerInfoQueries = {
  all: () => ['sellerInfo'],
  store: () =>
    queryOptions({
      queryKey: [...sellerInfoQueries.all(), 'store'],
      queryFn: getStore,
      // 자동 재시도 대신 실패를 바로 노출하고 다시 시도 버튼으로 재요청한다.
      retry: false,
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

export function useUpdateStoreDetailMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sellerInfoQueries.store().queryKey,
      })
    },
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
