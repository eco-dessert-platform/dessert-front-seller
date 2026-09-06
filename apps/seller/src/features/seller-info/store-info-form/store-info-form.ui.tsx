import { useEffect, useState } from 'react'

import { Button } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'

import {
  Store,
  StoreDetailFormValues,
  UpdateStoreDetailRequest,
  sellerInfoQueries,
  storeDetailSchema,
  useUpdateStoreDetailMutation,
} from '@/entity/seller-info'

import {
  SELLER_INFO_CANCEL_DIALOG_CONTENT,
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
  SellerInfoConfirmDialog,
} from '../seller-info-confirm-dialog'
import { sellerInfoToast } from '../seller-info-toast'
import { StoreContactAddressForm } from '../store-contact-address-form'
import { StoreProfileForm } from '../store-profile-form'

const toFormValues = (store: Store): StoreDetailFormValues => {
  const email = store.email ?? ''
  const atIndex = email.lastIndexOf('@')

  return {
    introduce: store.introduce ?? '',
    phoneNumber: store.phoneNumber ?? '',
    subPhoneNumber: store.subPhoneNumber ?? '',
    emailLocal: atIndex >= 0 ? email.slice(0, atIndex) : email,
    emailDomain: atIndex >= 0 ? email.slice(atIndex + 1) : '',
    originAddress: store.originAddress ?? '',
    originAddressDetail: store.originAddressDetail ?? '',
  }
}

// 폼값 → 수정 요청 (이메일 합치기, 선택 필드는 빈 값이면 omit)
const toRequest = (values: StoreDetailFormValues): UpdateStoreDetailRequest => ({
  introduce: values.introduce || undefined,
  phoneNumber: values.phoneNumber,
  subPhoneNumber: values.subPhoneNumber || undefined,
  email: `${values.emailLocal}@${values.emailDomain}`,
  originAddress: values.originAddress,
  originAddressDetail: values.originAddressDetail,
})

export function StoreInfoForm() {
  const [isEditable, setIsEditable] = useState(false)
  const [dialogType, setDialogType] = useState<'cancel' | 'submit' | null>(null)
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)

  const { data } = useQuery(sellerInfoQueries.store())
  const { mutate: updateStore, isPending } = useUpdateStoreDetailMutation()

  const methods = useForm<StoreDetailFormValues>({
    resolver: zodResolver(storeDetailSchema),
    defaultValues: {
      introduce: '',
      phoneNumber: '',
      subPhoneNumber: '',
      emailLocal: '',
      emailDomain: '',
      originAddress: '',
      originAddressDetail: '',
    },
    mode: 'onChange',
  })

  const { reset } = methods

  // 스토어 정보 응답이 도착하면 폼에 prefill (이메일은 local@domain 으로 분리)
  useEffect(() => {
    if (!data) return
    reset(toFormValues(data.store))
  }, [data, reset])

  const dialogCopy =
    dialogType === 'cancel'
      ? SELLER_INFO_CANCEL_DIALOG_CONTENT
      : SELLER_INFO_SUBMIT_DIALOG_CONTENT

  const handleDialogConfirm = () => {
    if (dialogType === 'cancel') {
      if (data) reset(toFormValues(data.store))
      setProfileImageFile(null)
      setIsEditable(false)
      setDialogType(null)
      return
    }

    if (isPending) return

    updateStore(
      { request: toRequest(methods.getValues()), profileImage: profileImageFile },
      {
        onSuccess: () => {
          sellerInfoToast.saveSuccess()
          setProfileImageFile(null)
          setIsEditable(false)
          setDialogType(null)
        },
        onError: () => {
          sellerInfoToast.saveError()
          setDialogType(null)
        },
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
              isEditable={isEditable}
              profileImageFile={profileImageFile}
              onProfileImageChange={setProfileImageFile}
            />
          </div>
          <div className="w-full min-w-0 2xl:flex-1">
            <StoreContactAddressForm isEditable={isEditable} />
          </div>
        </div>

        <div className="mt-16 flex justify-end gap-10">
          {isEditable ? (
            <>
              <Button
                title="취소하기"
                variant="primary-outlined"
                className="min-w-[160px]"
                onClick={() => setDialogType('cancel')}
              />
              <Button
                title="수정하기"
                className="min-w-[160px]"
                disabled={isPending}
                onClick={methods.handleSubmit(() => setDialogType('submit'))}
              />
            </>
          ) : (
            <Button
              title="수정하기"
              className="min-w-[160px]"
              onClick={() => setIsEditable(true)}
            />
          )}
        </div>

        <SellerInfoConfirmDialog
          open={dialogType !== null}
          title={dialogCopy.title}
          description={dialogCopy.description}
          onOpenChange={(open) => {
            if (!open) setDialogType(null)
          }}
          onConfirm={handleDialogConfirm}
        />
      </section>
    </FormProvider>
  )
}
