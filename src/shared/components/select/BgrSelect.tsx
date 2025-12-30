import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import BgrLabel from '../label/BgrLabel'
import { cn } from 'src/shared/lib/shadcn/lib/utils'
import clsx from 'clsx'

interface BgrSelectOption {
    label: string
    value: string
    disabled?: boolean
}

interface BgrSelectProps {
    options: BgrSelectOption[]
    value?: string
    placeholder?: string
    label?: string
    required?: boolean
    disabled?: boolean
    error?: boolean
    errorMessage?: string
    helperText?: string
    className?: string
    onValueChange?: (value: string) => void
}

const BgrSelect = ({
    options,
    value,
    placeholder = '선택하세요',
    label,
    required = false,
    disabled = false,
    error = false,
    errorMessage,
    helperText,
    className = '',
    onValueChange,
}: BgrSelectProps) => {
    return (
        <div
            className={cn(
                'flex flex-col items-start gap-1 self-stretch',
                className,
            )}
        >
            {label && <BgrLabel label={label} required={required} />}
            <SelectPrimitive.Root
                value={value}
                onValueChange={onValueChange}
                disabled={disabled}
            >
                <SelectPrimitive.Trigger
                    className={cn(
                        'flex h-[42px] w-full items-center justify-between gap-2 rounded-[10px] border border-gray-300 bg-white px-3 py-2 text-title-16-r text-gray-800 outline-none',
                        'hover:border-gray-400',
                        'focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-200',
                        'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
                        error && 'border-red-500',
                    )}
                >
                    <SelectPrimitive.Value placeholder={placeholder} />
                    <SelectPrimitive.Icon className="transition-transform duration-200 data-[state=open]:rotate-180">
                        <ChevronDown size={20} className="text-gray-400" />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>
                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                        position="popper"
                        side="bottom"
                        sideOffset={4}
                        align="start"
                        className={cn(
                            'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-lg',
                        )}
                    >
                        <SelectPrimitive.Viewport className="p-1">
                            {options.map((option) => (
                                <SelectPrimitive.Item
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={cn(
                                        'relative flex cursor-pointer select-none items-center rounded-[8px] px-3 py-2 text-title-16-r text-gray-800 outline-none',
                                        'hover:bg-gray-50',
                                        'focus:bg-gray-50',
                                        'disabled:pointer-events-none disabled:opacity-50',
                                    )}
                                >
                                    <SelectPrimitive.ItemText>
                                        {option.label}
                                    </SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                            ))}
                        </SelectPrimitive.Viewport>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
            {error && errorMessage && (
                <span className="text-body-12-r text-red-500">
                    {errorMessage}
                </span>
            )}
            {!error && helperText && (
                <span className="text-body-12-r text-gray-500">
                    {helperText}
                </span>
            )}
        </div>
    )
}

export default BgrSelect

