import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'

interface BgrDropdownOption {
    label: string
    value: string
    disabled?: boolean
}

interface BgrDropdownProps {
    options: BgrDropdownOption[]
    value?: string
    placeholder?: string
    disabled?: boolean
    className?: string
    onSelect?: (value: string) => void
}

const BgrDropdown = ({
    options,
    value,
    placeholder = '선택하세요',
    disabled = false,
    className = '',
    onSelect,
}: BgrDropdownProps) => {
    const selectedOption = options.find((opt) => opt.value === value)

    return (
        <div className={clsx('relative w-full', className)}>
            <button
                type="button"
                disabled={disabled}
                className={clsx(
                    'flex items-center justify-between w-full h-[42px] px-3 py-2',
                    'bg-white border border-gray-300 rounded-[10px]',
                    'text-title-16-r text-gray-800',
                    'hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
                    'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
                )}
            >
                <span className="flex-1 text-left">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className="w-5 h-5 text-gray-600 shrink-0" />
            </button>
        </div>
    )
}

export default BgrDropdown

