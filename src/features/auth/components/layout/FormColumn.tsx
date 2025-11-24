import { ReactNode } from 'react'

interface FormColumnProps {
    children: ReactNode
    gap?: number
    flex?: boolean
}

const FormColumn = ({ children, gap = 1, flex = true }: FormColumnProps) => {
    return (
        <div
            className={`flex ${flex ? 'flex-1/2' : ''} flex-col items-start gap-${gap} py-2.5`}
        >
            {children}
        </div>
    )
}

export default FormColumn
