import ImagePlaceholder from 'src/features/auth/components/ImagePlaceholderProps'
import AuthContentWrapper from 'src/features/auth/components/layout/AuthContentWrapper'
import AuthPageContainer from 'src/features/auth/components/layout/AuthPageContainer'
import { BgrLoginFooter } from 'src/features/auth/components/layout/BgrLoginFooter'
import BgrHeader from 'src/shared/layout/BgrHeader'
import AuthCard from 'src/features/auth/components/layout/AuthCard'
import { AUTH_MESSAGES } from 'src/features/auth/locales/authMessages'
import { useSocialLogin } from 'src/features/auth/hooks/useSocialLogin'
import KakaoLoginButton from 'src/features/auth/components/ui/check/buttons/KakaoLoginButton'
import GoogleLoginButton from 'src/features/auth/components/ui/check/buttons/GoogleLoginButton'

const LoginPage = () => {
    useSocialLogin()

    return (
        <AuthPageContainer>
            <BgrHeader />

            <AuthContentWrapper centered fullHeight>
                <AuthCard>
                    <ImagePlaceholder className="max-h-[746px] max-w-[595px]" />

                    <div className="flex flex-1 flex-col items-center gap-14 px-5">
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-heading-18-b text-gray-900">
                                {AUTH_MESSAGES.LOGIN.TITLE}
                            </p>
                            <p className="text-title-16-m text-gray-900">
                                {AUTH_MESSAGES.LOGIN.DESCRIPTION}
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <KakaoLoginButton />
                            <GoogleLoginButton />
                        </div>
                    </div>
                </AuthCard>
            </AuthContentWrapper>

            <BgrLoginFooter />
        </AuthPageContainer>
    )
}

export default LoginPage
