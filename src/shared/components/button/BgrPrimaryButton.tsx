import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import clsx from 'clsx'

interface BgrPrimaryButtonProps {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'outline' | 'gray'
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const BgrPrimaryButton = ({
    children,
    onClick,
    disabled = false,
    variant = 'primary',
    size = 'md',
    className = '',
}: BgrPrimaryButtonProps) => {
    const sizeClasses = {
        sm: 'h-[42px] min-w-[90px] px-4 py-2',
        md: 'h-[48px] min-w-[120px] px-6 py-3',
        lg: 'h-[56px] min-w-[180px] px-4 py-4',
    }

    const variantClasses = {
        primary: 'bg-primary-500 border-primary-500 text-white',
        secondary: 'bg-white border-primary-500 text-primary-500',
        outline: 'bg-white border-gray-300 text-gray-800',
        gray: 'bg-gray-300 border-gray-300 text-white',
    }

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'flex items-center justify-center gap-2 rounded-[12px] border disabled:opacity-50',
                sizeClasses[size],
                variantClasses[variant],
                className,
            )}
        >
            <span className="text-heading-18-m">{children}</span>
        </Button>
    )
}

export default BgrPrimaryButton
