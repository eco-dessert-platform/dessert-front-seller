import { useNavigate } from 'react-router-dom'

import { NoticeForm } from '@/features/home-page/notice'
import { ROUTES } from '@/shared/constant'

export function NoticeCreatePage() {
  const navigate = useNavigate()

  return (
    <NoticeForm
      heading="공지사항 등록"
      submitTitle="등록"
      onSubmit={() => {
        // TODO(#286 후속): 공지사항 등록 API 연동
        navigate(ROUTES.HOMEPAGE.NOTICE)
      }}
    />
  )
}
