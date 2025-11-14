import { ReactNode } from 'react'

interface PageWrapperProps {
    children: ReactNode
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
    return (
        <div className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-5 self-stretch bg-gray-50 px-[196px] py-10">
            {children}
        </div>
    )
}

// 섹션 컨테이너
interface SectionProps {
    children: ReactNode
    className?: string
}

export const Section = ({ children, className = '' }: SectionProps) => {
    return (
        <div
            className={`flex flex-col items-start self-stretch rounded-2xl bg-white ${className}`}
        >
            {children}
        </div>
    )
}

// 섹션 헤더
interface SectionHeaderProps {
    title: string
    description?: string
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
    return (
        <div className="flex flex-col items-start gap-1 self-stretch px-5 py-4">
            <p className="text-heading-20-sb text-gray-900">{title}</p>
            {description && (
                <p className="text-title-16-r text-gray-700">{description}</p>
            )}
        </div>
    )
}

// 섹션 컨텐츠
interface SectionContentProps {
    children: ReactNode
}

export const SectionContent = ({ children }: SectionContentProps) => {
    return (
        <div className="flex flex-col items-start gap-4 self-stretch px-5 pt-2.5 pb-4">
            {children}
        </div>
    )
}
