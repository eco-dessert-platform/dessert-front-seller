import { toast } from '@dessert/ui'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/shared/constant'

import { useAdminLogoutMutation } from './logout.mutation'

export const useLogout = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useAdminLogoutMutation()

  const onLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.success('로그아웃 되었어요')
      },
      onError: () => {
        toast.error('로그아웃 처리 중 문제가 생겼어요', '다시 로그인해 주세요')
      },
      onSettled: () => {
        navigate(ROUTES.LOGIN, { replace: true })
      },
    })
  }

  return { onLogout, isPending }
}
