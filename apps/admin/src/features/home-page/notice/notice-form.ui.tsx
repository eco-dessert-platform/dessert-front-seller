import { useEffect, useRef, useState } from 'react'

import { Button, Editor, Input, Label } from '@dessert/ui'

import type { NoticeFormValues } from '@/entity/home-page/notice'

const TITLE_MIN_LENGTH = 3
const TITLE_MAX_LENGTH = 50
const TITLE_HELPER_TEXT = `${TITLE_MIN_LENGTH}~${TITLE_MAX_LENGTH} 글자를 입력 하세요`

/** 빈 에디터도 빈 문단 태그를 넘기므로 태그를 걷어내고 판단한다 */
const isEditorEmpty = (value: string) =>
  value.replace(/<(p|div|br)[^>]*>|<\/(p|div)>|&nbsp;|\s/g, '') === ''

interface NoticeFormProps {
  heading: string
  submitTitle: string
  defaultValues?: NoticeFormValues
  onSubmit: (values: NoticeFormValues) => void
  isSubmitting?: boolean
}

export const NoticeForm = ({
  heading,
  submitTitle,
  defaultValues,
  onSubmit,
  isSubmitting = false,
}: NoticeFormProps) => {
  const [title, setTitle] = useState(defaultValues?.title ?? '')
  const [content, setContent] = useState(defaultValues?.content ?? '')
  const previewUrlsRef = useRef<string[]>([])

  const isTitleValid =
    title.trim().length >= TITLE_MIN_LENGTH &&
    title.trim().length <= TITLE_MAX_LENGTH
  const canSubmit = isTitleValid && !isEditorEmpty(content) && !isSubmitting

  // 미리보기 주소는 화면을 벗어날 때 해제해 파일이 메모리에 남지 않게 한다
  useEffect(() => {
    const previewUrls = previewUrlsRef.current

    return () => {
      previewUrls.forEach((previewUrl) => URL.revokeObjectURL(previewUrl))
      previewUrls.length = 0
    }
  }, [])

  /** 이미지 업로드 API 연동 전까지 로컬 미리보기 URL로 삽입한다 */
  const handleImageUpload = async (file: File) => {
    const previewUrl = URL.createObjectURL(file)
    previewUrlsRef.current.push(previewUrl)

    return previewUrl
  }

  return (
    <form
      className="flex flex-col gap-20 rounded-20 border border-gray-200 bg-white px-40 py-32"
      onSubmit={(event) => {
        event.preventDefault()
        if (!canSubmit) return

        onSubmit({ title: title.trim(), content })
      }}
    >
      <h2 className="typo-heading-20-sb text-gray-900">{heading}</h2>

      <Input
        label="공지사항명"
        required
        placeholder="제목을 입력하세요."
        helperText={TITLE_HELPER_TEXT}
        value={title}
        maxLength={TITLE_MAX_LENGTH}
        onChange={(event) => setTitle(event.target.value)}
      />

      <div className="flex flex-col gap-8">
        <Label label="내용" required className="sr-only" />
        <Editor
          value={content}
          onChange={setContent}
          image
          onImageUpload={handleImageUpload}
          placeholder="내용을 입력하세요. (권장크기 : 가로 860px)"
          height={480}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          title={submitTitle}
          size="lg"
          disabled={!canSubmit}
        />
      </div>
    </form>
  )
}
