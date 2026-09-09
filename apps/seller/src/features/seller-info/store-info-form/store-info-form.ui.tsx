import { useEffect, useState } from 'react'

import { Button } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'

import {
  StoreDetailFormValues,
  UpdateStoreDetailRequest,
  sellerInfoQueries,
  storeDetailSchema,
  useUpdateStoreDetailMutation,
} from '@/entity/seller-info'

import {
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
  SellerInfoConfirmDialog,
} from '../seller-info-confirm-dialog'
import { sellerInfoToast } from '../seller-info-toast'
import { StoreContactAddressForm } from '../store-contact-address-form'
import { StoreProfileForm } from '../store-profile-form'

const EMPTY_DEFAULTS: StoreDetailFormValues = {
  introduce: '',
  phoneNumber: '',
  subPhoneNumber: '',
  emailLocal: '',
  emailDomain: '',
  originAddress: '',
  originAddressDetail: '',
}

export function StoreInfoForm() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)

  const { data } = useQuery(sellerInfoQueries.store())
  const { mutate, isPending } = useUpdateStoreDetailMutation()

  const methods = useForm<StoreDetailFormValues>({
    resolver: zodResolver(storeDetailSchema),
    defaultValues: EMPTY_DEFAULTS,
    mode: 'onChange',
  })

  const { reset } = methods

  useEffect(() => {
    if (!data) return
    const { store } = data
    const [emailLocal = '', emailDomain = ''] = store.email.split('@')
    reset({
      introduce: store.introduce ?? '',
      phoneNumber: store.phoneNumber ?? '',
      subPhoneNumber: store.subPhoneNumber ?? '',
      emailLocal,
      emailDomain,
      originAddress: store.originAddress ?? '',
      originAddressDetail: store.originAddressDetail ?? '',
    })
  }, [data, reset])

  // 조회 로딩과 실패는 페이지에서 한 번만 처리한다.
  if (!data) return null

  const onSubmit = () => {
    setIsSubmitDialogOpen(true)
  }

  const handleConfirm = () => {
    const values = methods.getValues()
    const request: UpdateStoreDetailRequest = {
      storeName: data.store.name,
      introduce: values.introduce,
      phoneNumber: values.phoneNumber,
      subPhoneNumber: values.subPhoneNumber ?? '',
      email: `${values.emailLocal}@${values.emailDomain}`,
      originAddress: values.originAddress,
      originAddressDetail: values.originAddressDetail,
    }

    mutate(
      { request, profileImage },
      {
        onSuccess: () => {
          sellerInfoToast.saveSuccess()
          setProfileImage(null)
        },
        onError: () => {
          sellerInfoToast.storeInfoSaveError()
        },
        onSettled: () => setIsSubmitDialogOpen(false),
      },
    )
  }

  return (
    <FormProvider {...methods}>
      <section className="rounded-20 bg-white p-24">
        <h2 className="mb-4 text-[20px] font-semibold">스토어 정보 변경</h2>

        <div className="flex flex-col gap-20 2xl:flex-row">
          <div className="w-full xl:w-[220px] 2xl:shrink-0">
            <StoreProfileForm
              profileImage={profileImage}
              onProfileImageChange={setProfileImage}
              initialProfileUrl={data.store.profile}
            />
          </div>
          <div className="w-full min-w-0 2xl:flex-1">
            <StoreContactAddressForm />
          </div>
        </div>

        <div className="mt-16 flex justify-end">
          <Button
            title="수정하기"
            className="min-w-[160px]"
            disabled={isPending}
            onClick={methods.handleSubmit(onSubmit)}
          />
        </div>

        <SellerInfoConfirmDialog
          open={isSubmitDialogOpen}
          title={SELLER_INFO_SUBMIT_DIALOG_CONTENT.title}
          description={SELLER_INFO_SUBMIT_DIALOG_CONTENT.description}
          onOpenChange={setIsSubmitDialogOpen}
          onConfirm={handleConfirm}
        />
      </section>
    </FormProvider>
  )
}
