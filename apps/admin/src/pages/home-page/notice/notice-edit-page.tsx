import { useNavigate, useParams } from 'react-router-dom'

import { noticeMockData } from '@/entity/home-page/notice'
import { NoticeForm } from '@/features/home-page/notice'
import { ROUTES } from '@/shared/constant'

export function NoticeEditPage() {
  const navigate = useNavigate()
  const { noticeId } = useParams()

  // TODO(#286 후속): 단건 조회 API 연동 시 실데이터로 교체
  const notice = noticeMockData.find((item) => String(item.id) === noticeId)

  return (
    <NoticeForm
      heading="공지사항 수정"
      submitTitle="등록"
      defaultValues={{ title: notice?.title ?? '', content: '' }}
      onSubmit={() => {
        // TODO(#286 후속): 공지사항 수정 API 연동
        navigate(ROUTES.HOMEPAGE.NOTICE)
      }}
    />
  )
}
