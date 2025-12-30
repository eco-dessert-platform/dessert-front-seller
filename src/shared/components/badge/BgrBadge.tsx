import clsx from 'clsx'

interface BgrBadgeProps {
    children: React.ReactNode
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
    size?: 'sm' | 'md'
    className?: string
}

const BgrBadge = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
}: BgrBadgeProps) => {
    const variantClasses = {
        success:
            'bg-green-50 border-green-800 text-green-800 border-[0.5px]',
        warning:
            'bg-yellow-50 border-yellow-800 text-yellow-800 border-[0.5px]',
        error: 'bg-red-50 border-red-800 text-red-800 border-[0.5px]',
        info: 'bg-blue-50 border-blue-800 text-blue-800 border-[0.5px]',
        default:
            'bg-gray-50 border-gray-800 text-gray-800 border-[0.5px]',
    }

    const sizeClasses = {
        sm: 'px-1 py-[2px] text-body-10-r rounded-[4px]',
        md: 'px-1 py-[2px] text-body-10-r rounded-[4px]',
    }

    return (
        <span
            className={clsx(
                'inline-flex items-center justify-center border border-solid',
                variantClasses[variant],
                sizeClasses[size],
                className,
            )}
        >
            {children}
        </span>
    )
}

export default BgrBadge

