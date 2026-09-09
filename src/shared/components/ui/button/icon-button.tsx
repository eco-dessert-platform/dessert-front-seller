import { cn } from '@/shared/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const iconButtonVariants = cva(
  'flex cursor-pointer items-center justify-center gap-8 border disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300',
  {
    variants: {
      variant: {
        primary:
          'border-primary-500 bg-white text-primary-500 hover:bg-gray-50 focus-visible:border-primary-700 focus-visible:bg-primary-50 active:border-primary-700 active:bg-primary-700',
        secondary:
          'border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus-visible:border-gray-200 focus-visible:bg-gray-50 active:border-gray-200 active:bg-gray-200',
      },
      size: {
        sm: 'size-30 rounded-8',
        md: 'size-[42px] rounded-10',
        lg: 'size-56 rounded-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface IconButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof iconButtonVariants> {
  onClick?: () => void
  disabled?: boolean
  Icon: React.ReactNode
  className?: string
}

export function IconButton({
  onClick,
  disabled = false,
  variant,
  size,
  Icon,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={props.type ?? 'button'}
      onClick={onClick}
      disabled={disabled}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    >
      {Icon}
    </button>
  )
}
