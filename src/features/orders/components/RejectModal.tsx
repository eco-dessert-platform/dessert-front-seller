import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import RejectImageUploader from './RejectImageUploader'
import type {
    RejectModalProps,
    RejectInputValue,
} from '../type/orderModalType'
import { REJECT_TYPE_LIST } from '../data/rejectTypeList'

const MAX_REASON_LENGTH = 2000

const RejectModal = ({
    rejectType,
    title,
    onConfirm,
    onCancel,
}: RejectModalProps) => {
    const [inputValues, setInputValues] = useState<RejectInputValue>({
        type: null,
        reason: '',
        images: [],
    })
    const [uploadedImages, setUploadedImages] = useState<
        Array<{ id: string; file: File; previewSrc: string }>
    >([])

    const handleChangeReason = ({
        target,
    }: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValues((prev) => ({
            ...prev,
            reason: target.value.slice(0, MAX_REASON_LENGTH),
        }))
    }

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target

        if (!files) return

        const images = Array.from(files)
        const newImages = images.map((file) => ({
            id: crypto.randomUUID(),
            file: file,
            previewSrc: URL.createObjectURL(file),
        }))

        setUploadedImages((prev) => [...prev, ...newImages])
    }

    const handleDeleteImage = (targetId: string) => {
        const changedImages = uploadedImages.filter(({ id }) => id !== targetId)
        setUploadedImages(changedImages)
    }

    return (
        <BgrDialog open type="popup" title={title} onOpenChange={() => {}}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <SelectPrimitive.Root
                        value={inputValues.type ?? undefined}
                        onValueChange={(value) => {
                            setInputValues((prev) => ({
                                ...prev,
                                type: value,
                            }))
                        }}
                    >
                        <SelectPrimitive.Trigger className="flex w-[186px] items-center justify-between gap-2 rounded-lg border border-gray-300 py-2 pr-2 pl-3 [&[data-placeholder]>span:first-child]:text-gray-500">
                            <SelectPrimitive.Value placeholder="구분" />
                            <SelectPrimitive.Icon className="transition-transform duration-200 [[data-state=open]>&]:rotate-180">
                                <ChevronDown size={20} />
                            </SelectPrimitive.Icon>
                        </SelectPrimitive.Trigger>
                        <SelectPrimitive.Content
                            position="popper"
                            className="z-50 w-[186px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
                        >
                            <SelectPrimitive.Viewport className="p-1">
                                {REJECT_TYPE_LIST[rejectType].map((type) => (
                                    <SelectPrimitive.Item
                                        value={type}
                                        className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-gray-100"
                                    >
                                        <SelectPrimitive.ItemText>
                                            {type}
                                        </SelectPrimitive.ItemText>
                                    </SelectPrimitive.Item>
                                ))}
                            </SelectPrimitive.Viewport>
                        </SelectPrimitive.Content>
                    </SelectPrimitive.Root>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col gap-2.5 rounded-lg border border-gray-300 px-3 py-2">
                            <textarea
                                placeholder="내용을 자세하게 입력해주세요."
                                maxLength={MAX_REASON_LENGTH}
                                value={inputValues.reason}
                                className="resize-none focus:outline-none"
                                onChange={handleChangeReason}
                            />
                            <p className="ml-auto text-[10px] text-gray-400">
                                (
                                <span className="text-primary-500 font-bold">
                                    {inputValues.reason.length}
                                </span>
                                /{MAX_REASON_LENGTH.toLocaleString()})
                            </p>
                        </div>
                        <p className="text-12 text-gray-500">
                            10자 이상 사유를 작성해주세요
                        </p>
                    </div>
                </div>
                <RejectImageUploader
                    images={uploadedImages}
                    maxUploadCount={1}
                    onUploadImage={handleUploadImage}
                    onDeleteImage={handleDeleteImage}
                />
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={onCancel}
                        className="h-[42px] w-[90px] cursor-pointer rounded-lg border border-gray-200 bg-white text-gray-800"
                    >
                        취소
                    </button>
                    <button
                        disabled={
                            !inputValues.type || inputValues.reason.length < 1
                        }
                        onClick={onConfirm}
                        className="h-[42px] w-[90px] cursor-pointer rounded-lg bg-gray-900 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        확인
                    </button>
                </div>
            </div>
        </BgrDialog>
    )
}

export default RejectModal
