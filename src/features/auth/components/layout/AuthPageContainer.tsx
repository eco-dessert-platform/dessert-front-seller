import { ReactNode } from 'react'

interface PageContainerProps {
    children: ReactNode
}

const AuthPageContainer = ({ children }: PageContainerProps) => {
    return (
        <div className="bg-background flex h-screen w-screen flex-col">
            {children}
        </div>
    )
}

export default AuthPageContainer
