import { ReactNode } from 'react'

interface BgrLabelProps {
    label: ReactNode
    required?: boolean
    className?: string
}

const BgrLabel = ({
    label,
    required = false,
    className = '',
}: BgrLabelProps) => {
    return (
        <label className={`text-body-12-r text-gray-800 ${className}`}>
            {label}
            {required && (
                <span className="text-primary-500" aria-label="필수">
                    *
                </span>
            )}
        </label>
    )
}

export default BgrLabel
