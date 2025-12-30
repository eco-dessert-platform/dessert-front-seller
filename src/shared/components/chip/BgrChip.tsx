import clsx from 'clsx'
import { X } from 'lucide-react'

interface BgrChipProps {
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'secondary'
    size?: 'sm' | 'md'
    closable?: boolean
    onClose?: () => void
    className?: string
}

const BgrChip = ({
    children,
    variant = 'default',
    size = 'md',
    closable = false,
    onClose,
    className = '',
}: BgrChipProps) => {
    const variantClasses = {
        default:
            'bg-white border-gray-200 text-gray-800 border border-solid',
        primary:
            'bg-white border-primary-500 text-primary-500 border border-solid',
        secondary:
            'bg-gray-50 border-gray-300 text-gray-800 border border-solid',
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-body-12-sb rounded-full',
        md: 'px-3 py-1.5 text-body-12-sb rounded-full',
    }

    return (
        <span
            className={clsx(
                'inline-flex items-center justify-center gap-2',
                variantClasses[variant],
                sizeClasses[size],
                className,
            )}
        >
            <span>{children}</span>
            {closable && onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label="닫기"
                >
                    <X className="w-3 h-3" />
                </button>
            )}
        </span>
    )
}

export default BgrChip

