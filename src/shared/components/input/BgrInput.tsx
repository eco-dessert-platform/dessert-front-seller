import { Input } from 'src/shared/lib/shadcn/components/ui/input.tsx'
import BgrLabel from '../label/BgrLabel'
import { cn } from 'src/shared/lib/shadcn/lib/utils'

interface BgrInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    required?: boolean
    placeholder?: string
    value?: string
    disabled?: boolean
    helperText?: string
    type?: 'text' | 'email' | 'password' | 'tel' | 'number'
    error?: boolean
    errorMessage?: string
    className?: string
}

const BgrInput = ({
    label,
    required = false,
    placeholder,
    value,
    onChange,
    disabled = false,
    type = 'text',
    error,
    className = '',
    ...restProps
}: BgrInputProps) => {
    return (
        <div
            className={`flex flex-col items-start gap-1 self-stretch ${className}`}
        >
            {label && <BgrLabel label={label} required={required} />}
            <Input
                type={type}
                className={cn(
                    'text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400',
                    error && 'border-red-500',
                )}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                {...restProps}
            />
        </div>
    )
}

export default BgrInput
