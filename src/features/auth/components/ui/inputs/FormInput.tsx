import RequiredLabel from 'src/shared/components/text/RequiredLabel'
import { Input } from 'src/shared/lib/shadcn/components/ui/input'

interface FormInputProps {
    label?: string
    required?: boolean
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
    helperText?: string
    type?: 'text' | 'email' | 'password' | 'tel' | 'number'
    className?: string
}

const FormInput = ({
    label,
    required = false,
    placeholder,
    value,
    onChange,
    disabled = false,
    helperText,
    type = 'text',
    className = '',
}: FormInputProps) => {
    return (
        <div
            className={`flex flex-col items-start gap-1 self-stretch ${className}`}
        >
            {label &&
                (required ? (
                    <RequiredLabel>{label}</RequiredLabel>
                ) : (
                    <label className="text-body-12-r text-gray-800">
                        {label}
                    </label>
                ))}
            <Input
                type={type}
                className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
            />
            {helperText && (
                <span className="text-body-12-r text-gray-500">
                    {helperText}
                </span>
            )}
        </div>
    )
}

export default FormInput
