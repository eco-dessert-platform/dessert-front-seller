import { ReactNode } from 'react'

interface RequiredLabelProps {
    children: ReactNode
    className?: string
}

const RequiredLabel = ({ children, className = '' }: RequiredLabelProps) => {
    return (
        <label className={`text-body-12-r text-gray-800 ${className}`}>
            {children}
            <span className="text-primary-500" aria-label="필수">
                *
            </span>
        </label>
    )
}

export default RequiredLabel
