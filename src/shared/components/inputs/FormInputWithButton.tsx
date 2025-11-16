import RequiredLabel from 'src/shared/components/text/RequiredLabel.tsx'
import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'
import { Input } from 'src/shared/lib/shadcn/components/ui/input.tsx'

interface FormInputWithButtonProps {
    label?: string
    required?: boolean
    placeholder?: string
    value?: string
    onChange?: (value: string) => void
    disabled?: boolean
    helperText?: string
    buttonText: string
    onButtonClick: () => void
    buttonDisabled?: boolean
    readOnly?: boolean
}

const FormInputWithButton = ({
    label,
    required = false,
    placeholder,
    value,
    onChange,
    disabled = false,
    helperText,
    buttonText,
    onButtonClick,
    buttonDisabled = false,
    readOnly = false,
}: FormInputWithButtonProps) => {
    return (
        <div className="flex flex-col items-start gap-1 self-stretch">
            {label &&
                (required ? (
                    <RequiredLabel>{label}</RequiredLabel>
                ) : (
                    <label className="text-body-12-r text-gray-800">
                        {label}
                    </label>
                ))}
            <div className="flex items-start gap-4 self-stretch">
                <Input
                    className="text-title-16-r flex flex-1 items-center gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    disabled={disabled}
                    readOnly={readOnly}
                />
                <Button
                    className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2 disabled:opacity-50"
                    onClick={onButtonClick}
                    disabled={buttonDisabled}
                >
                    <span className="text-title-16-m text-white">
                        {buttonText}
                    </span>
                </Button>
            </div>
            {helperText && (
                <span className="text-body-12-r text-gray-500">
                    {helperText}
                </span>
            )}
        </div>
    )
}

export default FormInputWithButton
