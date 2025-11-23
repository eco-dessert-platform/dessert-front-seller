import ImagePlaceholder from 'src/features/auth/components/ImagePlaceholderProps'
import AuthCard from 'src/features/auth/components/layout/AuthCard'
import AuthContentWrapper from 'src/features/auth/components/layout/AuthContentWrapper'
import AuthPageContainer from 'src/features/auth/components/layout/AuthPageContainer'
import { AuthProcessStep } from 'src/features/auth/components/layout/AuthProcessStep'
import { AUTH_MESSAGES } from 'src/features/auth/locales/authMessages'
import BgrButton from 'src/shared/components/button/BgrButton'
import BgrHeader from 'src/shared/layout/BgrHeader'

const RegisterSuccessPage = () => {
    return (
        <AuthPageContainer>
            <BgrHeader borderBottom={false} />
            <AuthProcessStep currentStep={3} />

            <AuthContentWrapper centered fullHeight>
                <AuthCard>
                    <ImagePlaceholder className="h-[660px] max-w-[840px]" />

                    <div className="flex flex-1 flex-col items-center gap-14 px-5">
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-heading-18-b text-gray-900">
                                {AUTH_MESSAGES.REGISTER_SUCCESS.TITLE}
                            </p>
                            <p className="text-title-16-m text-gray-900">
                                {AUTH_MESSAGES.REGISTER_SUCCESS.DESCRIPTION}
                            </p>
                        </div>

                        <BgrButton
                            title="첫화면으로"
                            onClick={() => console.log('첫화면으로')}
                            variant="secondary"
                            size="lg"
                            className="w-[408px]"
                        />
                    </div>
                </AuthCard>
            </AuthContentWrapper>
        </AuthPageContainer>
    )
}

export default RegisterSuccessPage
