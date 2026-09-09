import { ChangeEvent, useEffect, useRef, useState } from 'react'

import { CameraIcon, XIcon } from '@dessert/icons'

import { cn } from '@/shared/libs/utils'

interface StoreProfileImagePreviewProps {
  className?: string
  file?: File | null
  // 수정 화면에서 기존 등록된 프로필 이미지 URL. 새 파일을 고르지 않았을 때만 노출.
  initialUrl?: string
  onChange: (file: File | null) => void
}

export function StoreProfileImagePreview({
  className,
  file,
  initialUrl,
  onChange,
}: StoreProfileImagePreviewProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleUploadAreaClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0]

    if (!nextFile) {
      return
    }

    onChange(nextFile)
    event.target.value = ''
  }

  const handleRemove = () => {
    onChange(null)

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

  // 새로 고른 파일 우선, 없으면 기존 등록된 이미지 URL.
  const displayUrl = previewUrl || initialUrl || ''

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
            <button
              type="button"
              onClick={handleUploadAreaClick}
              aria-label="이미지 변경"
              className="size-full cursor-pointer"
            >
              <img
                src={displayUrl}
                alt="스토어 프로필 미리보기"
                className="size-full object-cover"
              />
            </button>
            {file && (
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
            className="flex size-full cursor-pointer flex-col items-center justify-center text-gray-400"
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
