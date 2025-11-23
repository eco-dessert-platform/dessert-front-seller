import clsx from 'clsx'
import RightArrow_icon from 'src/assets/icons/arrow/right-arrow.svg?react'

interface Step {
    label: string
    active: boolean
}

interface AuthProcessStepProps {
    currentStep: 1 | 2 | 3
}

export const AuthProcessStep = ({ currentStep }: AuthProcessStepProps) => {
    const steps: Step[] = [
        { label: '판매자 인증', active: currentStep >= 1 },
        { label: '스토어 정보 등록', active: currentStep >= 2 },
        { label: '회원가입 완료', active: currentStep >= 3 },
    ]

    return (
        <div className="flex h-[60px] max-w-[1920px] min-w-[1440px] flex-col items-center justify-center gap-2.5 self-stretch border-b border-b-gray-200 bg-white px-[90px] py-4">
            <div className="flex flex-1 items-center justify-center gap-[60px] self-stretch">
                {steps.map((step, index) => (
                    <>
                        <span
                            key={step.label}
                            className={clsx(
                                'text-title-16-sb',
                                step.active
                                    ? 'text-primary-500'
                                    : 'text-gray-300',
                            )}
                        >
                            {step.label}
                        </span>
                        {index < steps.length - 1 && (
                            <RightArrow_icon
                                stroke={step.active ? '#F04C28' : '#E0E0E0'}
                                width={24}
                                height={24}
                            />
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}
