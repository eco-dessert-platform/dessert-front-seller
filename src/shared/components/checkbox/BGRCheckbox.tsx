import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import clsx from 'clsx'

interface BGRCheckboxProps {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
    id?: string
    className?: string
    disabled?: boolean
}

export default function BGRCheckbox({
    checked,
    onCheckedChange,
    className,
    ...rest
}: BGRCheckboxProps) {
    return (
        <Checkbox.Root
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={clsx(
                'flex h-5 w-5 items-center justify-center rounded border-2 border-gray-300 bg-white transition-all',
                'data-[state=checked]:border-black data-[state=checked]:bg-black',
                'hover:border-gray-400',
                'focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...rest}
        >
            <Checkbox.Indicator className="flex items-center justify-center">
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </Checkbox.Indicator>
        </Checkbox.Root>
    )
}
