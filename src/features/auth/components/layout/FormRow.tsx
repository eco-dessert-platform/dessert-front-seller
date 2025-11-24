import { ReactNode } from 'react'

interface FormRowProps {
    children: ReactNode
    gap?: number
}

const FormRow = ({ children, gap = 4 }: FormRowProps) => {
    return (
        <div className={`flex items-start gap-${gap} self-stretch`}>
            {children}
        </div>
    )
}

export default FormRow
