import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartGrayIcon,
  HeartRedIcon,
  StarFilledIcon,
} from '@dessert/icons'
import { Button, LogoHeader } from '@dessert/ui'
import { motion } from 'framer-motion'

import NoThumb from '@/assets/icons/bbangle-cry.svg'
import BadgeGoodIcon from '@/assets/icons/reviewBadge/badge-good.svg'
import BadgePlainIcon from '@/assets/icons/reviewBadge/badge-plain.svg'
import BadgeSoftIcon from '@/assets/icons/reviewBadge/badge-soft.svg'
import { cn } from '@/shared/libs/utils'

import { CreatePreviewOptionItemUi } from './create-preview-option-item.ui'
import { usePreviewSlider } from './create-preview-slider.hook'
import { useCreatePreviewHook } from './create-preview.hook'

interface ProductPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  productDetail: string
}

const BADGES = [
  { label: '맛있어요', icon: BadgeGoodIcon },
  { label: '담백해요', icon: BadgePlainIcon },
  { label: '부드러워요', icon: BadgeSoftIcon },
]

export const ProductPreviewModal = ({
  isOpen,
  onClose,
  productDetail,
}: ProductPreviewModalProps) => {
  const {
    productName,
    productPrice,
    productDetail: previewProductDetail,
    discountPercent,
    deliveryFee,
    deliveryMinFee,
    totalPrice,
    isPriceEntered,
    allImageUrls,
    discountAmount,
    hasMainImage,
    options,
  } = useCreatePreviewHook(productDetail)

  const slides = !hasMainImage
    ? (['placeholder', ...allImageUrls] as const)
    : allImageUrls

  const { currentIndex, canDrag, handlePanEnd } = usePreviewSlider({
    slideCount: slides.length,
    resetKey: `${isOpen}-${allImageUrls.length}-${hasMainImage}`,
  })

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center overflow-hidden bg-gray-100"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="h-header w-full shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <LogoHeader />
      </div>

      <div
        className="relative h-full w-150 overflow-y-auto bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. 헤더 */}
        <div className="sticky top-0 z-10 flex items-center gap-12 bg-white p-16">
          <ChevronLeftIcon className="size-24 text-gray-900" />
          <h1 className="flex-1 truncate typo-title-16-m text-gray-900">
            {productName || '{{상품명}}'}
          </h1>
        </div>

        {/* 2. 탭 */}
        <div className="flex border-b border-gray-100 bg-white">
          <div className="flex-1 border-b-2 border-gray-900 py-12 text-center typo-title-14-sb text-gray-900">
            상품정보
          </div>
          <div className="flex-1 py-12 text-center typo-title-14-r text-gray-500">
            리뷰
          </div>
        </div>

        {/* 3. 이미지 슬라이더 */}
        <div className="relative aspect-square w-full p-16">
          <div className="relative size-full overflow-hidden rounded-6 bg-gray-100">
            <motion.div
              className={cn(
                'flex size-full select-none',
                canDrag && 'cursor-grab active:cursor-grabbing',
              )}
              onPanEnd={handlePanEnd}
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              style={{ touchAction: 'pan-y' }}
            >
              {slides.map((item, i) => (
                <div key={`slide-${i}`} className="size-full shrink-0">
                  {item === 'placeholder' ? (
                    <div className="flex size-full flex-col items-center justify-center gap-2 bg-gray-100 typo-body-14-r text-gray-400">
                      <img
                        src={NoThumb}
                        alt="메인 이미지 없음"
                        className="w-64"
                      />
                      <p className="typo-title-14-m text-gray-500">
                        대표 이미지가 등록되지 않았습니다.
                      </p>
                    </div>
                  ) : (
                    <img
                      src={item}
                      alt={`preview-${i}`}
                      className="size-full object-cover select-none"
                      draggable={false}
                    />
                  )}
                </div>
              ))}
            </motion.div>

            {options.length > 1 && (
              <div className="absolute top-16 left-16 z-10 rounded-4 bg-[#F26565] px-8 py-4 typo-body-12-sb text-white">
                묶음상품
              </div>
            )}
            <div className="absolute right-10 bottom-10 z-10 rounded-full bg-black/50 px-10 py-4 typo-body-12-r text-white select-none">
              {currentIndex + 1} / {slides.length}
            </div>
          </div>
        </div>

        {/* 4. 상품 기본 정보 */}
        <div className="flex w-full items-center justify-between bg-white px-16 py-12">
          <div className="flex items-center gap-6">
            <div className="size-24 rounded-6 bg-gray-500" />
            <p className="typo-title-14-m text-gray-600">Brand Name</p>
          </div>
          <HeartRedIcon className="size-24 text-gray-300" />
        </div>
        <div className="border-t border-gray-300 bg-white p-16">
          <h2 className="typo-title-16-r text-gray-800">
            {productName || '{{상품명}}'}
          </h2>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="typo-heading-18-r text-primary-500">
                {isPriceEntered && discountPercent > 0
                  ? `${discountPercent}%`
                  : '{{할인율}}'}
              </span>
              <span className="typo-heading-18-sb text-gray-900">
                {isPriceEntered
                  ? `${totalPrice.toLocaleString()}원~`
                  : '{{상품가격}}'}
              </span>
              {options.length > 1 && (
                <span className="typo-title-14-m text-gray-500">
                  맛별 가격 상이
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 typo-body-14-m text-gray-900">
              <StarFilledIcon className="size-16 fill-yellow-400 text-yellow-400" />
              0.0 <span className="typo-body-12-r text-gray-500">(0)</span>
              <ChevronRightIcon className="size-16 text-gray-300" />
            </div>
          </div>
        </div>

        {/* 5. 배송비 */}
        <div className="bg-gray-50 px-16 py-12">
          <div className="typo-title-14-m text-gray-600">
            배송비
            <span className="ml-4 typo-title-14-r text-gray-800">
              {deliveryFee != null
                ? `${deliveryFee.toLocaleString()}원`
                : '{{배송비}}'}
            </span>
            {deliveryMinFee != null && (
              <span className="ml-2 typo-body-12-r text-gray-500">
                ({deliveryMinFee.toLocaleString()}원 이상 구매 시 무료)
              </span>
            )}
          </div>
        </div>

        {/* 리뷰 배지 */}
        <div className="border-t border-gray-100">
          <h3 className="p-16 typo-title-14-sb text-gray-800">
            리뷰 대표 배지
          </h3>
          <div className="flex gap-10 border-t border-gray-100 p-16">
            {BADGES.map(({ label, icon }) => (
              <div
                key={label}
                className="flex flex-1 flex-col items-center gap-4 rounded-10 border-2 border-gray-300 p-8 text-center"
              >
                <img
                  src={icon}
                  alt={label}
                  className="size-40 object-contain"
                />
                <span className="typo-body-14-m text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. 상품 옵션 */}
        <div className="h-6 w-full bg-gray-100" />
        <div>
          <h3 className="p-16 typo-title-14-sb text-gray-800">상품 옵션</h3>
          {options.length === 0 ? (
            <div className="p-16 typo-body-14-r text-gray-400">
              옵션을 입력해주세요
            </div>
          ) : (
            options.map((option, idx) => (
              <CreatePreviewOptionItemUi
                key={idx}
                option={option}
                idx={idx}
                productPrice={productPrice}
                discountAmount={discountAmount}
              />
            ))
          )}
          <div className="p-16">
            <div className="mt-16 w-full rounded-10 border border-gray-200 py-8 text-center typo-title-16-m text-gray-800">
              간단히 보기
            </div>
          </div>
        </div>

        {/* 7. 상세 설명 */}
        <div className="mb-10 bg-white px-20 py-24 text-left">
          {previewProductDetail ? (
            <div
              className="ql-editor leading-relaxed text-gray-700"
              dangerouslySetInnerHTML={{ __html: previewProductDetail }}
            />
          ) : (
            <p className="typo-body-14-r text-gray-400">
              상세 설명을 등록해주세요
            </p>
          )}
        </div>

        {/* 하단 고정 바 */}
        <div className="sticky bottom-0 z-10 flex w-full items-center gap-10 border-t border-gray-100 bg-white p-16 px-20 py-16">
          <div className="flex size-56 items-center justify-center rounded-full border border-gray-200 text-gray-400">
            <HeartGrayIcon className="size-32" />
          </div>
          <button className="flex-1 rounded-full bg-gray-900 py-[13.5px] text-center typo-title-16-sb text-white hover:bg-black">
            구매하러가기
          </button>
        </div>
      </div>

      <div className="flex w-full shrink-0 justify-end border-t border-gray-200 bg-white p-24">
        <Button title="닫기" onClick={onClose} size="lg" />
      </div>
    </div>
  )
}
