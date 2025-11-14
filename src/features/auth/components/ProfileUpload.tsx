import { ReactNode } from 'react'
import Camera from 'src/assets/icons/profile-camera-icon.svg?react'

interface ProfileUploadProps {
    label?: string
    helperText?: ReactNode
    imageUrl?: string
    onUpload?: (file: File) => void
}

export const ProfileUpload = ({
    label = '스토어 프로필',
    helperText = (
        <>
            권장 크기 1000×1000, 최소 160×160 이상 (1:1 비율) · <br />
            jpg, jpeg, png 형식 · 10MB 이하 파일만 업로드 가능해요
        </>
    ),
    imageUrl,
    onUpload,
}: ProfileUploadProps) => {
    const handleClick = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/jpeg,image/jpg,image/png'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) onUpload?.(file)
        }
        input.click()
    }

    return (
        <>
            <div className="flex flex-col items-start gap-1 self-stretch">
                <p className="text-title-14-m self-stretch text-gray-800">
                    {label}
                </p>
                <div
                    className="flex h-[200px] w-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-gray-200 p-6"
                    onClick={handleClick}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="프로필"
                            className="h-full w-full rounded-2xl object-cover"
                        />
                    ) : (
                        <>
                            <Camera />
                            <div className="flex items-center justify-center gap-1 self-stretch">
                                <p className="text-body-12-r text-center text-gray-800">
                                    이미지를 업로드해주세요
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {helperText && (
                <p className="text-body-10-r text-gray-500">{helperText}</p>
            )}
        </>
    )
}
