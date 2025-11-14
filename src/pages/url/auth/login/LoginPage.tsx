import ImagePlaceholder from 'src/features/auth/components/ImagePlaceholderProps'
import AuthContentWrapper from 'src/features/auth/components/layout/AuthContentWrapper'
import AuthPageContainer from 'src/features/auth/components/layout/AuthPageContainer'
import { BgrLoginFooter } from 'src/features/auth/components/layout/BgrLoginFooter'
import BgrHeader from 'src/shared/layout/BgrHeader'
import ButtonGoogle from 'src/assets/icons/button/bbangle-google-button.svg?react'
import ButtonKakao from 'src/assets/icons/button/bbangle-kakao-button.svg?react'
import AuthCard from 'src/features/auth/components/layout/AuthCard'
import { AUTH_MESSAGES } from 'src/features/auth/constants/authMessages'

const LoginPage = () => {
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
                            <ButtonKakao
                                onClick={() => console.log('카카오 로그인')}
                                className="cursor-pointer"
                            />
                            <ButtonGoogle
                                onClick={() => console.log('구글 로그인')}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                </AuthCard>
            </AuthContentWrapper>

            <BgrLoginFooter />
        </AuthPageContainer>
    )
}

export default LoginPage
