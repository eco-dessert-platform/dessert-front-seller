import { Label } from '../label/label'
import { cn } from '../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>,
  label?: string
  required?: boolean
  helperText?: string
  error?: boolean
  errorMessage?: string
  labelClassName?: string
}

const formFieldBase =
  'w-full typo-title-16-r border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400'

const Input = ({
  ref,
  label,
  required = false,
  placeholder,
  value,
  onChange,
  disabled = false,
  type = 'text',
  error,
  errorMessage,
  helperText,
  className = '',
  maxLength,
  labelClassName,
  ...restProps
}: InputProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-1.5 self-stretch',
        className,
      )}
    >
      {label && (
        <Label label={label} required={required} className={labelClassName} />
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          type={type}
          className={cn(
            formFieldBase,
            'flex h-input items-center rounded-10 px-12 py-8 disabled:cursor-not-allowed',
            error
              ? 'border-error-500 focus-visible:border-error-500'
              : 'focus-visible:ring-2 focus-visible:ring-[#9E9E9E] focus-visible:ring-offset-1',
            maxLength && 'pr-14',
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          {...restProps}
        />
        {maxLength && (
          <span className="absolute top-1/2 right-3 -translate-y-1/2 typo-body-12-r text-gray-400">
            {String(value || '').length}/{maxLength}
          </span>
        )}
      </div>
      {error && errorMessage ? (
        <span className="typo-body-12-r text-error-500">{errorMessage}</span>
      ) : (
        helperText && (
          <span className="typo-body-12-r text-gray-500">{helperText}</span>
        )
      )}
    </div>
  )
}

export { Input }
