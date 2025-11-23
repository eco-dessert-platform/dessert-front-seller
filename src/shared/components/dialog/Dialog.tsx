import { X } from 'lucide-react'

interface OverlayProps {
    onClose: () => void
    children: React.ReactNode
}

const Overlay: React.FC<OverlayProps> = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5 py-4">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
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
     * @default 확인
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
                <div className="relative w-full max-w-md rounded-lg bg-white px-5 py-4 shadow-lg">
                    <div className="flex flex-col gap-3">
                        {title && (
                            <h2 className="text-2xl font-medium text-gray-800">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-16 text-gray-700">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-end pt-6">
                        <button
                            onClick={handleConfirm}
                            className="h-[42px] w-[90px] rounded-lg bg-gray-900 text-white disabled:bg-gray-300"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </Overlay>
        )
    }

    if (type === 'confirm') {
        return (
            <Overlay onClose={() => onOpenChange(false)}>
                <div className="relative w-full max-w-md rounded-lg bg-white px-5 py-4 shadow-lg">
                    <div className="flex flex-col gap-3">
                        {title && (
                            <h2 className="text-2xl font-medium text-gray-800">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-16 text-gray-700">
                                {description}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-6">
                        <button
                            onClick={handleCancel}
                            className="h-[42px] w-[90px] rounded-lg border border-gray-200 bg-white text-gray-800"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="h-[42px] w-[90px] rounded-lg bg-gray-900 text-white disabled:bg-gray-300"
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </Overlay>
        )
    }

    return (
        <Overlay onClose={() => onOpenChange(false)}>
            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white px-5 py-4 shadow-lg">
                {title && (
                    <div className="mb-4 flex items-center">
                        <h2 className="flex-grow text-2xl font-medium text-gray-800">
                            {title}
                        </h2>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="cursor-pointer"
                        >
                            <X size={30} />
                        </button>
                    </div>
                )}
                <div className="overflow-auto">{children}</div>
            </div>
        </Overlay>
    )
}
