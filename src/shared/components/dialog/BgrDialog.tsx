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

type BaseDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
}

type AlertDialogProps = BaseDialogProps & {
    type: 'alert'
    description?: string
    confirmText?: string
    onConfirm?: () => void
}

type ConfirmDialogProps = BaseDialogProps & {
    type: 'confirm'
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
}

type PopupDialogProps = BaseDialogProps & {
    type: 'popup'
    children: React.ReactNode
}

export type BgrDialogProps =
    | AlertDialogProps
    | ConfirmDialogProps
    | PopupDialogProps

export const BgrDialog: React.FC<BgrDialogProps> = (props) => {
    const { type, open, onOpenChange, title } = props

    if (!open) return null

    if (type === 'alert') {
        const { description, confirmText = '확인', onConfirm } = props

        const handleConfirm = () => {
            onConfirm?.()
            onOpenChange(false)
        }

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
        const {
            description,
            confirmText = '확인',
            cancelText = '취소',
            onConfirm,
            onCancel,
        } = props

        const handleConfirm = () => {
            onConfirm?.()
            onOpenChange(false)
        }

        const handleCancel = () => {
            onCancel?.()
            onOpenChange(false)
        }

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

    const { children } = props

    return (
        <Overlay onClose={() => onOpenChange(false)}>
            <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-lg bg-white shadow-lg">
                <div className="mb-4 flex items-center px-5 pt-4">
                    <h2 className="grow text-2xl font-medium text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="cursor-pointer"
                    >
                        <X size={30} />
                    </button>
                </div>
                <div className="grow overflow-auto px-5 pb-4">{children}</div>
            </div>
        </Overlay>
    )
}
