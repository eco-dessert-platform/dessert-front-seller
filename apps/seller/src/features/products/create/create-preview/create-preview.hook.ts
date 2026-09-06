import { useEffect, useState } from 'react'

import { useFormContext } from 'react-hook-form'

import { CreateProductForm } from '../create-form'
import {
  type ExtraImageItem,
  type MainImageValue,
  isExistingImageRef,
  isExtraImageFileItem,
} from '../create-form-thumbnail/create-form-thumbnail.type'

type PreviewImageValue = MainImageValue | ExtraImageItem | null | undefined

export const useCreatePreviewHook = (productDetail: string) => {
  const { watch } = useFormContext<CreateProductForm>()

  const [
    productName,
    productPrice,
    rawDiscount,
    discountType,
    deliveryFee,
    deliveryMinFee,
    mainImage,
    extraImages,
    options,
  ] = watch([
    'productName',
    'price',
    'discountAmount',
    'discountType',
    'deliveryFee',
    'deliveryMinFee',
    'mainImage',
    'extraImages',
    'options',
  ])

  const price = productPrice ?? 0
  const rawDiscountValue = rawDiscount ?? 0
  const discountAmount =
    discountType === 'won'
      ? rawDiscountValue
      : Math.round(price * (rawDiscountValue / 100))

  const discountPercent =
    discountType === 'won'
      ? price > 0
        ? Math.round((discountAmount / price) * 100)
        : 0
      : discountAmount

  const totalPrice =
    discountType === 'won'
      ? price - discountAmount
      : Math.round(price * (1 - discountAmount / 100))

  const isPriceEntered = productPrice !== null && productPrice > 0

  const [allImageUrls, setAllImageUrls] = useState<string[]>([])

  useEffect(() => {
    const images: string[] = []

    const createUrl = (item: PreviewImageValue): string | null => {
      if (!item) return null

      if (item instanceof File) {
        return URL.createObjectURL(item)
      }

      if (isExistingImageRef(item)) {
        return item.url
      }

      if (isExtraImageFileItem(item)) {
        return URL.createObjectURL(item.file)
      }

      return null
    }

    const main = createUrl(mainImage)
    if (main) images.push(main)

    for (const extraImage of extraImages ?? []) {
      const url = createUrl(extraImage)
      if (url) images.push(url)
    }

    setAllImageUrls(images)

    return () => {
      images.forEach((url) => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [mainImage, extraImages])

  return {
    productName,
    productPrice,
    productDetail,
    discountPercent,
    deliveryFee,
    deliveryMinFee,
    totalPrice,
    isPriceEntered,
    allImageUrls,
    discountAmount,
    hasMainImage: !!mainImage,
    options,
  }
}
