import { Button } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'

import { sellerInfoQueries } from '@/entity/seller-info'
import {
  StoreAccountInfoForm,
  StoreInfoForm,
  StoreNameForm,
} from '@/features/seller-info'

export function SellerInfoPage() {
  const { isLoading, isError, refetch } = useQuery(sellerInfoQueries.store())

  if (isLoading) {
    return (
      <div className="py-40 text-center typo-body-14-r text-gray-500">
        스토어 정보를 불러오는 중이에요.
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-12 py-40">
        <p className="typo-body-14-r text-gray-500">
          스토어 정보를 불러오지 못했어요.
        </p>
        <Button
          title="다시 시도"
          variant="secondary-outlined"
          onClick={() => refetch()}
        />
      </div>
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
