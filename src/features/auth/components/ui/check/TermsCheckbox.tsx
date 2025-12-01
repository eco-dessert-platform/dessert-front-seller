import CheckOff_icon from 'src/assets/icons/icn-check-off.svg?react'
import React from 'react'

interface TermsCheckboxProps {
    label: string
    required?: boolean
    checked: boolean
    onChange: (checked: boolean) => void
    content?: React.ReactNode
}

export const TermsCheckbox = ({
    label,
    required = false,
    checked,

    onChange,
    content,
}: TermsCheckboxProps) => {
    return (
        <div className="flex flex-col items-start gap-2 self-stretch">
            <div className="flex items-center gap-3">
                <div
                    onClick={() => onChange(!checked)}
                    className="cursor-pointer"
                >
                    <CheckOff_icon />
                </div>
                <div className="flex items-center gap-0.5">
                    <p className="text-title-16-m text-gray-900">{label}</p>
                    {required && (
                        <p className="text-title-16-m text-primary-500">
                            (필수)
                        </p>
                    )}
                </div>
            </div>

            {content && (
                <div className="flex h-[200px] flex-col items-start gap-1 self-stretch overflow-y-auto rounded-[10px] border border-gray-300 p-4">
                    {content}
                </div>
            )}
        </div>
    )
}

// 약관 전체 동의
interface TermsAllAgreeProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

export const TermsAllAgree = ({ checked, onChange }: TermsAllAgreeProps) => {
    return (
        <>
            <div className="flex items-center gap-3 self-stretch">
                <div
                    onClick={() => onChange(!checked)}
                    className="cursor-pointer"
                >
                    <CheckOff_icon />
                </div>
                <p className="text-title-16-m text-gray-900">전체 동의</p>
            </div>

            <div className="flex flex-col items-start gap-2.5 self-stretch py-1">
                <div className="h-0.5 w-full bg-gray-300" />
            </div>
        </>
    )
}

// 약관 컨텐츠 섹션
interface TermsContentSectionProps {
    title: string
    children: React.ReactNode
}

export const TermsContentSection = ({
    title,
    children,
}: TermsContentSectionProps) => {
    return (
        <div className="flex flex-col items-start gap-0.5 self-stretch">
            <p className="text-title-14-sb self-stretch text-gray-700">
                {title}
            </p>
            <p className="text-title-14-r self-stretch text-gray-700">
                {children}
            </p>
        </div>
    )
}
