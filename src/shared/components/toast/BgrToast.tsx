import clsx from 'clsx'
import { CheckCircle2, X, AlertCircle, Info, XCircle } from 'lucide-react'
import { toast, ToastOptions, Id } from 'react-toastify'

interface BgrToastProps {
    message: string
    variant?: 'success' | 'error' | 'warning' | 'info'
    onClose?: () => void
    className?: string
}

const BgrToast = ({
    message,
    variant = 'success',
    onClose,
    className = '',
}: BgrToastProps) => {
    const variantClasses = {
        success:
            'bg-green-50 border-green-500 text-green-700 border border-solid',
        error: 'bg-red-50 border-red-500 text-red-700 border border-solid',
        warning:
            'bg-yellow-50 border-yellow-500 text-yellow-700 border border-solid',
        info: 'bg-blue-50 border-blue-500 text-blue-700 border border-solid',
    }

    const iconMap = {
        success: CheckCircle2,
        error: XCircle,
        warning: AlertCircle,
        info: Info,
    }

    const Icon = iconMap[variant]

    return (
        <div
            className={clsx(
                'flex items-center gap-4 p-3 rounded-[10px]',
                'shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)]',
                'min-w-[240px] max-w-[400px]',
                variantClasses[variant],
                className,
            )}
            role="alert"
        >
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <Icon className="w-6 h-6 shrink-0" />
                <p className="text-title-14-b flex-1">{message}</p>
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="shrink-0 hover:opacity-70 transition-opacity"
                    aria-label="닫기"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    )
}

// react-toastify와 통합된 헬퍼 함수들
export const bgrToast = {
    success: (message: string, options?: ToastOptions): Id => {
        let toastId: Id
        const ToastComponent = () => (
            <BgrToast
                message={message}
                variant="success"
                onClose={() => toast.dismiss(toastId)}
            />
        )
        toastId = toast(<ToastComponent />, {
            ...options,
            className: '!p-0 !bg-transparent !shadow-none',
        })
        return toastId
    },
    error: (message: string, options?: ToastOptions): Id => {
        let toastId: Id
        const ToastComponent = () => (
            <BgrToast
                message={message}
                variant="error"
                onClose={() => toast.dismiss(toastId)}
            />
        )
        toastId = toast(<ToastComponent />, {
            ...options,
            className: '!p-0 !bg-transparent !shadow-none',
        })
        return toastId
    },
    warning: (message: string, options?: ToastOptions): Id => {
        let toastId: Id
        const ToastComponent = () => (
            <BgrToast
                message={message}
                variant="warning"
                onClose={() => toast.dismiss(toastId)}
            />
        )
        toastId = toast(<ToastComponent />, {
            ...options,
            className: '!p-0 !bg-transparent !shadow-none',
        })
        return toastId
    },
    info: (message: string, options?: ToastOptions): Id => {
        let toastId: Id
        const ToastComponent = () => (
            <BgrToast
                message={message}
                variant="info"
                onClose={() => toast.dismiss(toastId)}
            />
        )
        toastId = toast(<ToastComponent />, {
            ...options,
            className: '!p-0 !bg-transparent !shadow-none',
        })
        return toastId
    },
}

export default BgrToast

