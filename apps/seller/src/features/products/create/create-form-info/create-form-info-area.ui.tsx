import { useEffect } from 'react'

import { Dropdown, Input, Label, Switch } from '@dessert/ui'
import { Controller } from 'react-hook-form'

import { ProductDiscountType } from '@/entity/products/create/create-info/product-discount-type.constants'
import { PRODUCTION_START_TIME_OPTIONS } from '@/entity/products/create/create-info/production-time.constants'

import { useProductInfoForm } from './use-product-info-form.hook'
import { InfoTooltip, ProductFinalPrice } from '../create-form'
import { useCreateHeaderSteps } from '../create-header'

export const ProductInfoArea = () => {
  const {
    form,
    finalPrice,
    isFormField,
    price,
    discountAmount,
    discountType,
    priceInput,
    discountInput,
  } = useProductInfoForm()

  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = form

  const { setProductFields } = useCreateHeaderSteps()

  useEffect(() => {
    setProductFields({ productInfo: isFormField })
  }, [isFormField, setProductFields])

  return (
    <>
      <div className="mb-24 flex items-center gap-2">
        <Label label="상품 정보" className="typo-heading-20-sb text-gray-900" />
        <InfoTooltip>
          상품 제작 및 취소 안내
          <ul className="list-disc pl-16">
            <li>
              상품 제작이 시작된 이후에는 주문 취소가 불가능하며, 반품 절차로만
              진행이 가능합니다.
            </li>
            <li>
              단, 제작 시간 중에 접수된 주문은 다음 제작 시작 전까지 취소가
              가능합니다.
            </li>
          </ul>
        </InfoTooltip>
      </div>
      <Input
        label="상품명"
        required
        placeholder="상품명을 3~50자 미만으로 입력해주세요"
        className="gap-8"
        labelClassName="typo-heading-18-r"
        error={!!errors.productName}
        errorMessage={errors.productName?.message}
        {...register('productName')}
      />
      <div className="flex items-center gap-12 pt-32">
        <div className="flex items-center gap-2">
          <Label
            label="신선식품"
            required
            className="typo-heading-18-r text-gray-900"
          />
          <InfoTooltip iconSize={20}>
            신선식품 안내 <br />
            <ul className="list-disc pl-16">
              <li>주문 즉시 제작되거나 빠르게 소비해야 하는 상품이에요.</li>
              <li>
                상품 특성상 제작이 시작된 후에는 주문 취소가 불가능합니다.
              </li>
            </ul>
          </InfoTooltip>
        </div>
        <Controller
          control={control}
          name="isFresh"
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      <p className="mt-4 typo-title-16-r text-gray-600">
        주문 제작 상품의 경우 신선식품으로 설정해주세요.
      </p>
      <Label
        label="상품 제작 시간"
        required
        className="block pt-32 typo-heading-18-r"
      />
      <p className="mt-2 typo-title-16-r text-gray-600">
        고객 주문 취소 시점에 활용되니 정확히 입력해주세요.
      </p>
      <Controller
        control={control}
        name="productionTime"
        render={({ field }) => (
          <Dropdown
            options={[...PRODUCTION_START_TIME_OPTIONS]}
            value={field.value}
            className="mt-8"
            onSelect={field.onChange}
            placeholder="상품 제작 시간을 선택해주세요"
          />
        )}
      />
      <div className="grid grid-cols-2 gap-32 pt-32">
        <div>
          <div className="mt-8 flex w-full gap-8">
            <Input
              required
              label="가격"
              labelClassName="typo-heading-18-r"
              placeholder="0~100,000"
              className="flex-1"
              value={priceInput.displayValue}
              onChange={priceInput.handleChange}
              error={!!errors.price && price !== null}
              errorMessage={errors.price?.message || undefined}
            />
            <span className="relative top-11">원</span>
          </div>
        </div>
        <div>
          <div className="mt-8 flex gap-8">
            <Input
              required
              label="할인 금액"
              placeholder={discountType === 'won' ? '0~100,000' : '0~100'}
              className="flex-1"
              labelClassName="typo-heading-18-r"
              value={discountInput.displayValue}
              onChange={discountInput.handleChange}
              error={!!errors.discountAmount && discountAmount !== null}
              errorMessage={errors.discountAmount?.message || undefined}
            />
            <Controller
              control={control}
              name="discountType"
              render={({ field }) => (
                <Dropdown
                  options={ProductDiscountType}
                  value={field.value}
                  placeholder="원"
                  onSelect={(val) => {
                    field.onChange(val)
                    setValue('discountAmount', null, { shouldValidate: true })
                  }}
                  className="relative top-8.5 max-w-16.25"
                />
              )}
            />
          </div>
        </div>
      </div>
      {finalPrice !== null && (
        <ProductFinalPrice
          title="최종 상품 금액"
          price={price}
          finalPrice={finalPrice}
        />
      )}
    </>
  )
}
