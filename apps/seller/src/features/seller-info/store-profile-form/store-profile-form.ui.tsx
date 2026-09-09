import { Textarea } from '@dessert/ui'
import { Controller, useFormContext } from 'react-hook-form'

import { StoreDetailFormValues } from '@/entity/seller-info'

import { StoreProfileImagePreview } from '../store-profile-image-preview'

const IMG_NOTICE_SIZE = '권장 크기 1000x1000, 최소 160 이상 (1:1 비율)'
const IMG_NOTICE_FORMAT = 'jpg,jpeg,png 형식 10MB 이하 파일만 업로드 가능해요'

interface StoreProfileFormProps {
  profileImage: File | null
  onProfileImageChange: (file: File | null) => void
  initialProfileUrl?: string
}

export function StoreProfileForm({
  profileImage,
  onProfileImageChange,
  initialProfileUrl,
}: StoreProfileFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  return (
    <section>
      <h2 className="text-[14px] text-gray-800">스토어 프로필</h2>
      <StoreProfileImagePreview
        className="mt-4"
        file={profileImage}
        initialUrl={initialProfileUrl}
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
            className="mt-8"
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
