import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { CameraIcon, XIcon } from '@dessert/icons'

import { cn } from '@/shared/libs/utils'

import { sellerInfoToast } from '../seller-info-toast'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB

interface StoreProfileImagePreviewProps {
  className?: string
  file?: File | null
  initialUrl?: string
  disabled?: boolean
  onChange: (file: File | null) => void
}

export function StoreProfileImagePreview({
  className,
  file,
  initialUrl,
  disabled = false,
  onChange,
}: StoreProfileImagePreviewProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [isInitialCleared, setIsInitialCleared] = useState(false)

  const handleUploadAreaClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0]
    event.target.value = ''

    if (!nextFile) {
      return
    }

    if (!ALLOWED_IMAGE_TYPES.includes(nextFile.type)) {
      sellerInfoToast.profileImageFormatError()
      return
    }

    if (nextFile.size > MAX_IMAGE_SIZE) {
      sellerInfoToast.profileImageSizeError()
      return
    }

    onChange(nextFile)
    setIsInitialCleared(false)
  }

  const handleRemove = () => {
    onChange(null)
    setIsInitialCleared(true)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (!file) {
      setPreviewUrl('')
      return
    }

    const nextPreviewUrl = URL.createObjectURL(file)
    setPreviewUrl(nextPreviewUrl)

    return () => {
      URL.revokeObjectURL(nextPreviewUrl)
    }
  }, [file])

  // 서버에 저장된 프로필 이미지 URL 이 도착하면 다시 노출
  useEffect(() => {
    if (initialUrl) setIsInitialCleared(false)
  }, [initialUrl])

  const displayUrl = previewUrl || (isInitialCleared ? '' : (initialUrl ?? ''))

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="relative size-[200px] overflow-hidden rounded-32 border border-gray-100">
        {displayUrl ? (
          <div className="relative size-full">
            <img
              src={displayUrl}
              alt="스토어 프로필 미리보기"
              className="size-full object-cover"
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                aria-label="이미지 제거"
                className="absolute top-12 right-12 flex size-20 cursor-pointer items-center justify-center"
              >
                <XIcon className="size-20" />
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleUploadAreaClick}
            disabled={disabled}
            className="flex size-full cursor-pointer flex-col items-center justify-center text-gray-400 disabled:cursor-not-allowed"
          >
            <CameraIcon
              className="size-24 text-gray-300"
              aria-label="이미지 업로드"
            />
            <span className="text-[14px] font-medium text-gray-400">
              이미지를 업로드해주세요
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
