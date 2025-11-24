import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
    children: ReactNode
    className?: string
}

const AuthCard = ({ children, className = '' }: CardProps) => {
    return (
        <div
            className={clsx(
                'flex flex-1 items-center gap-4 self-stretch rounded-[20px] border border-gray-200 bg-white p-2.5',
                className,
            )}
        >
            {children}
        </div>
    )
}

export default AuthCard
