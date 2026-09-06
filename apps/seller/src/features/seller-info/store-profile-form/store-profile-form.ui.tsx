import { Controller, useFormContext } from 'react-hook-form'
import { Textarea } from '@dessert/ui'
import { useQuery } from '@tanstack/react-query'

import { StoreDetailFormValues, sellerInfoQueries } from '@/entity/seller-info'
import { cn } from '@/shared/libs/utils'

import { StoreProfileImagePreview } from '../store-profile-image-preview'

const IMG_NOTICE_SIZE = '권장 크기 1000x1000, 최소 160 이상 (1:1 비율)'
const IMG_NOTICE_FORMAT = 'jpg,jpeg,png 형식 10MB 이하 파일만 업로드 가능해요'

interface StoreProfileFormProps {
  isEditable: boolean
  profileImageFile: File | null
  onProfileImageChange: (file: File | null) => void
}

export function StoreProfileForm({
  isEditable,
  profileImageFile,
  onProfileImageChange,
}: StoreProfileFormProps) {
  const { data } = useQuery(sellerInfoQueries.store())

  const {
    control,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  return (
    <section>
      <h2 className="text-[14px] text-gray-800">스토어 프로필</h2>
      <StoreProfileImagePreview
        className="mt-4"
        file={profileImageFile}
        initialUrl={data?.store.profile}
        disabled={!isEditable}
        onChange={onProfileImageChange}
      />
      <div className="text-[10px] font-normal text-gray-500">
        <p>{IMG_NOTICE_SIZE}</p>
        <p>{IMG_NOTICE_FORMAT}</p>
      </div>

      <Controller
        name="introduce"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label="한줄소개"
            placeholder="빵그리입니다!"
            maxLength={100}
            showCount
            readOnly={!isEditable}
            className={cn(
              'mt-8',
              !isEditable && 'pointer-events-none [&_textarea]:text-gray-400',
            )}
          />
        )}
      />
      {errors.introduce && (
        <span className="typo-body-12-r text-error-500">
          {errors.introduce.message}
        </span>
      )}
    </section>
  )
}
