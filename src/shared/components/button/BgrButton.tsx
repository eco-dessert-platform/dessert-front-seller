import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import clsx from 'clsx'

interface BgrButtonProps {
    title: string
    onClick?: () => void
    disabled?: boolean
    variant?:
        | 'primary-filled'
        | 'primary-outlined'
        | 'secondary-filled'
        | 'secondary-outlined'
    size?: 'sm' | 'md' | 'lg'
    roundedFull?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    className?: string
}

const BgrButton = ({
    title,
    onClick,
    disabled = false,
    variant = 'primary-filled',
    size = 'md',
    roundedFull = false,
    leftIcon,
    rightIcon,
    className = '',
}: BgrButtonProps) => {
    const sizeClasses = {
        sm: 'h-[30px] px-2.5 py-2 rounded-[8px]',
        md: 'h-[42px] px-4 py-3 rounded-[10px]',
        lg: 'h-[56px] px-4 py-4 rounded-[12px]',
    }

    const typoClasses = {
        sm: 'text-body-12-m',
        md: 'text-title-16-m',
        lg: 'text-heading-18-m',
    }

    const variantClasses = {
        'primary-filled':
            'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700 focus-visible:bg-primary-700 focus-visible:border-primary-700',
        'primary-outlined':
            'bg-white border-primary-500 text-primary-500 hover:bg-primary-50 hover:border-primary-600 active:bg-primary-100 active:border-primary-700 focus-visible:bg-primary-50 focus-visible:border-primary-700',
        'secondary-filled':
            'bg-gray-900 border-gray-900 text-white hover:bg-gray-800 hover:border-gray-800 active:bg-gray-700 active:border-gray-700 focus-visible:bg-gray-700 focus-visible:border-gray-700',
        'secondary-outlined':
            'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-50 active:bg-gray-100 active:border-gray-200 focus-visible:bg-gray-50 focus-visible:border-gray-200',
    }

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'flex items-center justify-center gap-2 border disabled:opacity-50',
                sizeClasses[size],
                variantClasses[variant],
                roundedFull && 'rounded-full',

                className,
            )}
        >
            {leftIcon && leftIcon}
            <span className={typoClasses[size]}>{title}</span>
            {rightIcon && rightIcon}
        </Button>
    )
}

export default BgrButton
