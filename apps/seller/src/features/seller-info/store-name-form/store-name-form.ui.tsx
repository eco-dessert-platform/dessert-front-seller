import { useState } from 'react'

import { Button } from '@dessert/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import {
  StoreNameFormValues,
  sellerInfoQueries,
  storeNameSchema,
  useCheckStoreNameMutation,
  useRequestStoreNameChangeMutation,
} from '@/entity/seller-info'
import { cn } from '@/shared/libs/utils'
import { InputField } from '@/shared/ui/input-field'

import {
  SELLER_INFO_CANCEL_DIALOG_CONTENT,
  SELLER_INFO_SUBMIT_DIALOG_CONTENT,
  SellerInfoConfirmDialog,
} from '../seller-info-confirm-dialog'
import { sellerInfoToast } from '../seller-info-toast'

type ConfirmDialogType = 'cancel' | 'submit'

export function StoreNameForm() {
  const { data } = useQuery(sellerInfoQueries.store())
  const { mutate: checkName } = useCheckStoreNameMutation()
  const { mutate: requestChange, isPending: isRequesting } =
    useRequestStoreNameChangeMutation()

  const [confirmDialogType, setConfirmDialogType] =
    useState<ConfirmDialogType | null>(null)
  const [lastCheckedName, setLastCheckedName] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<StoreNameFormValues>({
    resolver: zodResolver(storeNameSchema),
    defaultValues: { storeName: '' },
    mode: 'onChange',
  })

  // 조회 로딩과 실패는 페이지에서 한 번만 처리한다.
  if (!data) return null

  const { available, store } = data
  const storeName = watch('storeName').trim()
  const hasStoreName = storeName.length > 0
  const isSameAsCurrent = hasStoreName && storeName === store.name
  const isChecked = lastCheckedName !== null && lastCheckedName === storeName
  const canSubmit =
    available && isValid && isChecked && !isSameAsCurrent && !isRequesting

  const confirmDialogContent =
    confirmDialogType === null
      ? null
      : confirmDialogType === 'cancel'
        ? SELLER_INFO_CANCEL_DIALOG_CONTENT
        : SELLER_INFO_SUBMIT_DIALOG_CONTENT

  const handleCheckClick = () => {
    if (!hasStoreName || !isValid) return
    if (isSameAsCurrent) {
      setError('storeName', {
        type: 'sameAsCurrent',
        message: '현재 스토어명과 같아요',
      })
      return
    }

    checkName(storeName, {
      onSuccess: ({ available: isAvailable }) => {
        if (!isAvailable) {
          setLastCheckedName(null)
          setError('storeName', {
            type: 'duplicate',
            message: '이미 사용 중인 스토어명이에요',
          })
          sellerInfoToast.storeNameChangeDuplicateError()
          return
        }
        clearErrors('storeName')
        setLastCheckedName(storeName)
      },
      onError: () => {
        sellerInfoToast.storeNameCheckError()
      },
    })
  }

  const handleCancelButtonClick = () => {
    setConfirmDialogType('cancel')
  }

  const handleDialogClose = () => {
    setConfirmDialogType(null)
  }

  const handleDialogConfirm = () => {
    if (confirmDialogType === 'cancel') {
      reset()
      setLastCheckedName(null)
      handleDialogClose()
      return
    }

    requestChange(
      { newName: storeName },
      {
        onSuccess: () => {
          sellerInfoToast.storeNameChangeSuccess()
          reset()
          setLastCheckedName(null)
        },
        onError: () => {
          sellerInfoToast.storeNameChangeError()
        },
        onSettled: handleDialogClose,
      },
    )
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) handleDialogClose()
  }

  const onSubmit = () => {
    if (!canSubmit) return
    setConfirmDialogType('submit')
  }

  return (
    <section className="flex flex-col rounded-20 bg-white p-24">
      <h2 className="text-[20px] font-semibold">스토어명 변경</h2>
      <p className="mt-[3px] gap-[22px] text-[16px] font-normal text-gray-700">
        스토어명은 최초 한 번만 변경할 수 있어요.
      </p>

      <InputField
        {...register('storeName')}
        label="스토어명"
        placeholder={store.name}
        required
        buttonText="중복확인"
        maxLength={50}
        onButtonClick={handleCheckClick}
        error={!!errors.storeName}
        errorMessage={errors.storeName?.message}
        helperText={isChecked ? '✓ 사용 가능한 이름이에요' : undefined}
        disabled={isRequesting}
        className="mt-[22px]"
      />

      <span className="mt-32 flex flex-row justify-end gap-10">
        <Button
          title="취소하기"
          size="md"
          className={cn(
            'w-[160px]',
            !hasStoreName && 'pointer-events-none invisible',
          )}
          variant="primary-outlined"
          onClick={handleCancelButtonClick}
        />
        <Button
          title="수정하기"
          size="md"
          className="w-[160px]"
          disabled={!canSubmit}
          onClick={handleSubmit(onSubmit)}
        />
      </span>

      {confirmDialogContent !== null && (
        <SellerInfoConfirmDialog
          open
          title={confirmDialogContent.title}
          description={confirmDialogContent.description}
          onOpenChange={handleDialogOpenChange}
          onConfirm={handleDialogConfirm}
        />
      )}
    </section>
  )
}
