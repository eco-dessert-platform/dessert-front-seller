import clsx from 'clsx'

interface BgrRadioOption {
    label: string
    value: string
    disabled?: boolean
}

interface BgrRadioProps {
    options: BgrRadioOption[]
    value?: string
    name: string
    direction?: 'horizontal' | 'vertical'
    className?: string
    onChange?: (value: string) => void
}

const BgrRadio = ({
    options,
    value,
    name,
    direction = 'horizontal',
    className = '',
    onChange,
}: BgrRadioProps) => {
    return (
        <div
            className={clsx(
                'flex gap-2',
                direction === 'vertical' && 'flex-col',
                className,
            )}
            role="radiogroup"
        >
            {options.map((option) => (
                <label
                    key={option.value}
                    className={clsx(
                        'flex items-center gap-2 cursor-pointer',
                        option.disabled && 'opacity-50 cursor-not-allowed',
                    )}
                >
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        disabled={option.disabled}
                        onChange={() => onChange?.(option.value)}
                        className="sr-only"
                    />
                    <span
                        className={clsx(
                            'relative w-4 h-4 rounded-full border-2 border-gray-200 bg-white',
                            'flex items-center justify-center',
                            'transition-all',
                            value === option.value &&
                                'border-primary-500 bg-primary-500',
                            !option.disabled &&
                                'hover:border-gray-300',
                        )}
                    >
                        {value === option.value && (
                            <span className="absolute w-2 h-2 rounded-full bg-white" />
                        )}
                    </span>
                    <span className="text-title-16-r text-gray-800">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    )
}

export default BgrRadio

