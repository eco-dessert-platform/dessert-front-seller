import { useState } from 'react'

import { Button, Dropdown, Input, Label } from '@dessert/ui'
import { useKakaoPostcodePopup } from 'react-daum-postcode'
import { Controller, useFormContext } from 'react-hook-form'

import { StoreDetailFormValues } from '@/entity/seller-info'
import { formatDaumAddress } from '@/shared/utils/format-daum-address'

const CUSTOM_EMAIL_DOMAIN = 'custom'

const EMAIL_DOMAIN = [
  { label: '선택하세요', value: '' },
  { label: 'naver.com', value: 'naver.com' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'kakao.com', value: 'kakao.com' },
  { label: 'icloud.com', value: 'icloud.com' },
  { label: 'hanmail.net', value: 'hanmail.net' },
  { label: 'hotmail.com', value: 'hotmail.com' },
  { label: 'outlook.com', value: 'outlook.com' },
  { label: '직접 입력', value: CUSTOM_EMAIL_DOMAIN },
]

export function StoreContactAddressForm() {
  return (
    <section className="flex w-full min-w-0 flex-col gap-24">
      <ContactSection />
      <EmailSection />
      <AddressSection />
    </section>
  )
}

function ContactSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  return (
    <div>
      <div className="flex w-full flex-col gap-20 2xl:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <Input
            {...register('phoneNumber')}
            placeholder="01011112222"
            required
            label="연락처"
          />
          {errors.phoneNumber && (
            <span className="typo-body-12-r text-error-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <Input
          {...register('subPhoneNumber')}
          placeholder="01033334444"
          label="추가 연락처"
          className="flex-1"
        />
      </div>
      <p className="mt-2 text-[12px] font-normal text-gray-500">
        연락처는 주문서 혹은 상품 페이지 하단에서 고객이 확인할 수 있어요
      </p>
    </div>
  )
}

function EmailSection() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  const [selectedEmailDomain, setSelectedEmailDomain] = useState('')
  const isCustomDomain = selectedEmailDomain === CUSTOM_EMAIL_DOMAIN

  return (
    <div>
      <Label label="이메일" required />
      <div className="flex w-full flex-col gap-20 2xl:flex-row 2xl:items-center">
        <div className="flex flex-1 flex-col gap-6">
          <Input {...register('emailLocal')} placeholder="aaa123" required />
          {errors.emailLocal && (
            <span className="typo-body-12-r text-error-500">
              {errors.emailLocal.message}
            </span>
          )}
        </div>

        <div className="flex items-center text-[16px] font-normal text-gray-800">
          @
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <Controller
            name="emailDomain"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="naver.com"
                required
                disabled={!isCustomDomain}
              />
            )}
          />
          {errors.emailDomain && (
            <span className="typo-body-12-r text-error-500">
              {errors.emailDomain.message}
            </span>
          )}
        </div>

        <Dropdown
          options={EMAIL_DOMAIN}
          placeholder="선택하세요"
          value={selectedEmailDomain}
          onSelect={(value) => {
            setSelectedEmailDomain(value)
            if (value === CUSTOM_EMAIL_DOMAIN) {
              setValue('emailDomain', '', { shouldValidate: true })
              return
            }
            setValue('emailDomain', value, { shouldValidate: true })
          }}
          className="flex-1"
        />
      </div>
    </div>
  )
}

function AddressSection() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  const [postalCode, setPostalCode] = useState('')
  const [isPostalCodeSelected, setIsPostalCodeSelected] = useState(false)
  const openPostcode = useKakaoPostcodePopup()

  // 우편번호를 새로 검색했거나, 이미 등록된 주소가 프리필된 경우 상세주소 편집 허용.
  const hasAddress = watch('originAddress').trim().length > 0
  const canEditAddressDetail = isPostalCodeSelected || hasAddress

  const handleClickPostalCodeSearch = () => {
    openPostcode({
      onComplete: (data) => {
        setPostalCode(data.zonecode)
        setValue('originAddress', formatDaumAddress(data), {
          shouldValidate: true,
        })
        setIsPostalCodeSelected(true)
      },
    })
  }

  return (
    <div>
      <div className="flex flex-col gap-24">
        <div className="flex w-full flex-col gap-20 2xl:flex-row">
          <div className="w-full xl:w-[310px] 2xl:shrink-0">
            <Label label="우편번호" required />
            <div className="flex gap-12">
              <Input
                placeholder="12345"
                required
                className="flex-1"
                value={postalCode}
                readOnly
                disabled
              />
              <Button
                title="우편번호 검색"
                className="shrink-0"
                onClick={handleClickPostalCodeSearch}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            <Input
              {...register('originAddress')}
              label="출고지 주소"
              placeholder="서울시 강남구 선릉로"
              required
              disabled
            />
            {errors.originAddress && (
              <span className="typo-body-12-r text-error-500">
                {errors.originAddress.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            {...register('originAddressDetail')}
            label="출고지 상세주소"
            placeholder="1동 101호"
            required
            disabled={!canEditAddressDetail}
          />
          {errors.originAddressDetail && (
            <span className="typo-body-12-r text-error-500">
              {errors.originAddressDetail.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
