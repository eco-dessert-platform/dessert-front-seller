import { useMutation } from '@tanstack/react-query'

import { adminLogout, authKeys, useAuthStore } from '@/entity/auth'

export const useAdminLogoutMutation = () => {
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationKey: authKeys.all,
    mutationFn: adminLogout,
    onSettled: logout,
  })
}
