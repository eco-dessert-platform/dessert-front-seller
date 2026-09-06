import { ChangeEvent, useEffect, useState } from 'react'

import { Button, Dropdown, Input, Label } from '@dessert/ui'
import { useKakaoPostcodePopup } from 'react-daum-postcode'
import { Controller, useFormContext } from 'react-hook-form'

import { StoreDetailFormValues } from '@/entity/seller-info'
import { cn } from '@/shared/libs/utils'
import { formatDaumAddress } from '@/shared/utils/format-daum-address'

const CUSTOM_EMAIL_DOMAIN = 'custom'

const EMAIL_DOMAIN = [
  { label: '직접 입력', value: CUSTOM_EMAIL_DOMAIN },
  { label: 'naver.com', value: 'naver.com' },
  { label: 'gmail.com', value: 'gmail.com' },
  { label: 'kakao.com', value: 'kakao.com' },
  { label: 'icloud.com', value: 'icloud.com' },
  { label: 'hanmail.net', value: 'hanmail.net' },
  { label: 'hotmail.com', value: 'hotmail.com' },
  { label: 'outlook.com', value: 'outlook.com' },
]

interface StoreContactAddressFormProps {
  isEditable: boolean
}

export function StoreContactAddressForm({
  isEditable,
}: StoreContactAddressFormProps) {
  return (
    <section className="flex w-full min-w-0 flex-col gap-24">
      <ContactSection isEditable={isEditable} />
      <EmailSection isEditable={isEditable} />
      <AddressSection isEditable={isEditable} />
    </section>
  )
}

interface SectionProps {
  isEditable: boolean
}

const MAX_PHONE_LENGTH = 11

function ContactSection({ isEditable }: SectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  const phoneField = register('phoneNumber')
  const subPhoneField = register('subPhoneNumber')

  // 입력 단계에서 숫자만 + 11자로 제한 (하이픈·문자 원천 차단)
  const handleDigitsOnly =
    (onChange: (event: ChangeEvent<HTMLInputElement>) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      event.target.value = event.target.value
        .replace(/\D/g, '')
        .slice(0, MAX_PHONE_LENGTH)
      onChange(event)
    }

  return (
    <div>
      <div className="flex w-full flex-col gap-20 2xl:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <Input
            {...phoneField}
            onChange={handleDigitsOnly(phoneField.onChange)}
            placeholder={isEditable ? '하이픈(-) 없이 입력해주세요' : ''}
            required
            label="연락처"
            readOnly={!isEditable}
            className={cn(
              !isEditable && 'pointer-events-none [&_input]:text-gray-400',
            )}
          />
          {errors.phoneNumber && (
            <span className="typo-body-12-r text-error-500">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <Input
            {...subPhoneField}
            onChange={handleDigitsOnly(subPhoneField.onChange)}
            placeholder={isEditable ? '하이픈(-) 없이 입력해주세요' : ''}
            label="추가 연락처"
            readOnly={!isEditable}
            className={cn(
              !isEditable && 'pointer-events-none [&_input]:text-gray-400',
            )}
          />
        </div>
      </div>
      <p className="mt-2 text-[12px] font-normal text-gray-500">
        연락처는 주문서 혹은 상품 페이지 하단에서 고객이 확인할 수 있어요
      </p>
    </div>
  )
}

function EmailSection({ isEditable }: SectionProps) {
  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  const [selectedEmailDomain, setSelectedEmailDomain] = useState('')
  const isCustomDomain = selectedEmailDomain === CUSTOM_EMAIL_DOMAIN

  const emailDomain = watch('emailDomain')

  // prefill 로 도메인이 채워지면 드롭다운도 동기화 (프리셋이면 그 값, 아니면 직접 입력)
  useEffect(() => {
    if (!emailDomain || selectedEmailDomain !== '') return

    const matched = EMAIL_DOMAIN.find(
      (option) =>
        option.value === emailDomain &&
        option.value !== '' &&
        option.value !== CUSTOM_EMAIL_DOMAIN,
    )
    setSelectedEmailDomain(matched ? matched.value : CUSTOM_EMAIL_DOMAIN)
  }, [emailDomain, selectedEmailDomain])

  return (
    <div>
      <Label label="이메일" required />
      <div className="flex w-full flex-col gap-20 2xl:flex-row 2xl:items-center">
        <div className="flex flex-1 flex-col gap-6">
          <Input
            {...register('emailLocal')}
            placeholder={isEditable ? '이메일 주소를 입력해 주세요' : ''}
            required
            readOnly={!isEditable}
            className={cn(
              !isEditable && 'pointer-events-none [&_input]:text-gray-400',
            )}
          />
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
                disabled={!isEditable || !isCustomDomain}
              />
            )}
          />
        </div>

        <Dropdown
          options={EMAIL_DOMAIN}
          placeholder="선택하세요"
          value={selectedEmailDomain}
          disabled={!isEditable}
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
      {(errors.emailLocal || errors.emailDomain) && (
        <span className="mt-6 block typo-body-12-r text-error-500">
          {errors.emailLocal?.message ?? errors.emailDomain?.message}
        </span>
      )}
    </div>
  )
}

function AddressSection({ isEditable }: SectionProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<StoreDetailFormValues>()

  const [postalCode, setPostalCode] = useState('')
  const [isPostalCodeSelected, setIsPostalCodeSelected] = useState(false)
  const openPostcode = useKakaoPostcodePopup()

  const handleClickPostalCodeSearch = () => {
    openPostcode({
      onComplete: (data) => {
        setPostalCode(data.zonecode)
        // 백엔드는 우편번호를 originAddress 안에 "(우편번호) 주소" 형태로 받음
        setValue(
          'originAddress',
          `(${data.zonecode}) ${formatDaumAddress(data)}`,
          { shouldValidate: true },
        )
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
                disabled={!isEditable}
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
            placeholder={
              isEditable ? '상세 주소를 입력해 주세요(동/호수 포함)' : ''
            }
            required
            disabled={!isEditable || !isPostalCodeSelected}
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
