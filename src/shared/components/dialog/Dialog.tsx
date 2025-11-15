import { X } from 'lucide-react'
import React from 'react'

// Overlay 컴포넌트
interface OverlayProps {
    onClose: () => void
    children: React.ReactNode
}

const Overlay: React.FC<OverlayProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5 py-4">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={onClose}
            />
            {children}
        </div>
    )
}

export type DialogType = 'confirm' | 'alert' | 'popup'

export interface DialogProps {
    type: DialogType
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    children?: React.ReactNode
    /**
     * 확인
     */
    confirmText?: string
    /**
     * @default 취소
     */
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
}

export const Dialog: React.FC<DialogProps> = ({
    type,
    open,
    onOpenChange,
    title,
    description,
    children,
    confirmText = '확인',
    cancelText = '취소',
    onConfirm,
    onCancel,
}) => {
    const handleConfirm = () => {
        onConfirm?.()
        onOpenChange(false)
    }

    const handleCancel = () => {
        onCancel?.()
        onOpenChange(false)
    }

    if (!open) return null

    if (type === 'alert') {
        return (
            <Overlay onClose={() => onOpenChange(false)}>
                <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full px-5 py-4">
                    <div className='flex flex-col gap-3'>
                        {title && <h2 className="text-2xl font-medium text-gray-800">{title}</h2>}
                        {description && (
                            <p className="text-16 text-gray-700">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end items-center pt-6">
                        <button
                            onClick={handleConfirm}
                            className="w-[90px] h-[42px] text-white bg-gray-900 rounded-lg disabled:bg-gray-300"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </Overlay>
        )
    }

    // Confirm 타입: 확인/취소 버튼이 있는 확인 다이얼로그
    if (type === 'confirm') {
        return (
            <Overlay onClose={() => onOpenChange(false)}>
                <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full px-5 py-4">
                    <div className='flex flex-col gap-3'>
                        {title && <h2 className="text-2xl font-medium text-gray-800">{title}</h2>}
                        {description && (
                            <p className="text-16 text-gray-700">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2 justify-end items-center pt-6">
                        <button
                            onClick={handleCancel}
                            className="w-[90px] h-[42px] border border-gray-200 text-gray-800 rounded-lg bg-white"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="w-[90px] h-[42px] text-white bg-gray-900 rounded-lg disabled:bg-gray-300"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </Overlay>
        )
    }

    // Popup 타입: 커스텀 콘텐츠를 표시하는 팝업
    return (
        <Overlay onClose={() => onOpenChange(false)}>
            <div className="relative bg-white rounded-lg shadow-lg px-5 py-4 max-h-[90vh] overflow-y-auto w-full max-w-2xl">
                {title && (
                    <div className="flex items-center mb-4">
                        <h2 className="flex-grow text-2xl font-medium text-gray-800">{title}</h2>
                        <button onClick={() => onOpenChange(false)}>
                            <X size={30} />
                        </button>
                    </div>
                )}
                <div className='overflow-auto'>{children}</div>
            </div>
        </Overlay>
    )
}
