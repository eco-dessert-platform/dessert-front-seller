import clsx from 'clsx'
import { X } from 'lucide-react'
import CameraIcon from 'src/assets/icons/camera.svg?react'
import type { RejectImageUploaderProps } from '../type/orderModalType'

const RejectImageUploader = ({
    images,
    maxUploadCount,
    onUploadImage,
    onDeleteImage,
}: RejectImageUploaderProps) => {
    const isDisabled = images.length >= maxUploadCount

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return
        onUploadImage(event)
    }

    return (
        <div className="flex w-[628px] items-center gap-4 rounded-lg border border-gray-300 bg-gray-100 p-3">
            <input
                id="img-uploader"
                type="file"
                className="hidden"
                onChange={handleUpload}
                disabled={isDisabled}
            />
            <label
                htmlFor="img-uploader"
                className={clsx(
                    'flex aspect-square w-[94px] flex-col items-center justify-center rounded-xl border border-gray-200',
                    isDisabled ? 'bg-gray-50' : 'bg-white',
                )}
            >
                <CameraIcon />
                <div className="text-12 flex items-center gap-1 text-gray-800">
                    <p>사진</p>
                    <p>
                        <span className="text-primary-500">
                            {images.length}
                        </span>
                        /{maxUploadCount}
                    </p>
                </div>
            </label>
            <div className="flex items-center gap-1.5">
                {images.map(({ id, previewSrc }) => (
                    <div
                        key={id}
                        className="relative aspect-square w-[94px] overflow-hidden rounded-xl border border-gray-200"
                    >
                        <img
                            src={previewSrc}
                            alt="업로드 이미지"
                            className="absolute h-full w-full object-contain"
                        />
                        <button
                            onClick={() => onDeleteImage(id)}
                            className="absolute top-1.5 right-1.5 flex aspect-square w-5 cursor-pointer items-center justify-center rounded-full border border-white bg-black opacity-10"
                        >
                            <X color="white" size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RejectImageUploader
