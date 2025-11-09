import { ReactNode } from 'react'
import clsx from 'clsx'

interface ContentWrapperProps {
    children: ReactNode
    centered?: boolean
    fullHeight?: boolean
}

const AuthContentWrapper = ({
    children,
    centered = false,
    fullHeight = false,
}: ContentWrapperProps) => {
    return (
        <div
            className={clsx(
                'flex max-w-[1920px] min-w-[1440px] self-stretch bg-gray-50 px-[196px] py-10',
                centered && 'items-center justify-center',
                fullHeight && 'flex-1',
                !centered && !fullHeight && 'flex-col items-center gap-5',
            )}
        >
            {children}
        </div>
    )
}

export default AuthContentWrapper
