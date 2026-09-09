import { Button } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { sellerInfoQueries } from '@/entity/seller-info'
import {
  StoreAccountInfoForm,
  StoreInfoForm,
  StoreNameForm,
} from '@/features/seller-info'
import { extractServerMessage } from '@/shared/utils/extract-server-message'

// 헤더 80px와 본문 상하 여백 80px을 뺀 높이. 조회 상태 화면이 본문 영역을 채우도록 한다.
const STATE_SECTION_STYLE =
  'mx-auto flex min-h-[calc(100vh-160px)] max-w-[1100px] items-center justify-center rounded-20 bg-white p-24'

export function SellerInfoPage() {
  const { data, isLoading, isError, error, refetch } = useQuery(
    sellerInfoQueries.store(),
  )

  if (isLoading) {
    return (
      <section className={STATE_SECTION_STYLE}>
        <p className="typo-body-14-r text-gray-500">
          스토어 정보를 불러오는 중이에요.
        </p>
      </section>
    )
  }

  if (isError || !data) {
    // 서버가 사유를 내려준 경우 그대로 노출. 그 외에는 내부 메시지 대신 기본 문구.
    const serverMessage =
      extractServerMessage(error) ??
      (error && !isAxiosError(error) ? error.message : undefined)

    return (
      <section className={STATE_SECTION_STYLE}>
        <div className="flex flex-col items-center gap-12">
          <p className="typo-body-14-r text-gray-500">
            {serverMessage ?? '스토어 정보를 불러오지 못했어요.'}
          </p>
          <Button
            title="다시 시도"
            variant="secondary-outlined"
            onClick={() => refetch()}
          />
        </div>
      </section>
    )
  }

  return (
    <div className="mx-auto flex max-w-[1100px] min-w-0 flex-col gap-40 overflow-hidden">
      <StoreNameForm />
      <StoreInfoForm />
      <StoreAccountInfoForm />
    </div>
  )
}
