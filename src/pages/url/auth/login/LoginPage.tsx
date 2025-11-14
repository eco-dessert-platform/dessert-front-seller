import ButtonGoogle from 'src/assets/icons/button/bbangle-google-button.svg?react'
import ButtonKakao from 'src/assets/icons/button/bbangle-kakao-button.svg?react'
import BgrHeader from 'src/shared/layout/BgrHeader'

const LoginPage = () => {
    return (
        <div className={'bg-background flex h-screen w-screen flex-col'}>
            <BgrHeader />

            {/* wrap */}
            <div className="flex max-w-[1920px] min-w-[1440px] flex-1 items-center justify-center self-stretch bg-gray-50 px-[196px] py-10">
                {/* content */}
                <div className="flex flex-1 items-center gap-4 self-stretch rounded-[20px] border border-gray-200 bg-white p-2.5">
                    {/* image */}
                    <div className="max-h-[746px] max-w-[595px] flex-1/2 items-center self-stretch rounded-[20px] bg-amber-100" />

                    {/* p-1 */}
                    <div className="flex flex-1/2 flex-col items-center gap-14 px-5">
                        {/* title */}
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-heading-18-b text-gray-900">
                                🎉 환영합니다
                            </p>
                            <p className="text-title-16-m text-gray-900">
                                빵그리의 오븐 판매자 채널입니다. <br />
                                로그인 또는 회원가입을 진행하시려면 아래 버튼을
                                눌러주세요.
                            </p>
                        </div>

                        {/* button wrap */}
                        <div className="flex flex-col items-center gap-3 self-stretch">
                            <ButtonKakao
                                onClick={() => console.log('카카오 로그인')}
                            />
                            <ButtonGoogle
                                onClick={() => console.log('구글 로그인')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2 self-stretch border-t border-t-gray-200 bg-gray-100 p-6">
                {/* children */}
                <div className="flex items-center justify-center gap-2 self-stretch">
                    <p className="text-body-12-b text-gray-700">
                        빵그리의 오븐
                    </p>
                    <div className="h-3 w-[1px] bg-gray-200" />
                    <p className="text-body-12-b text-gray-700">
                        대표 : 윤예찬
                    </p>
                    <div className="h-3 w-[1px] bg-gray-200" />
                    <p className="text-body-12-b text-gray-700">
                        사업자등록번호 : 670-01-03496
                    </p>
                    <div className="h-3 w-[1px] bg-gray-200" />
                    <p className="text-body-12-b text-gray-700">
                        이메일 : dpcks9893@naver.com
                    </p>
                </div>

                <div className="flex h-[19px] items-center justify-center gap-2 self-stretch">
                    <p className="text-body-12-r text-gray-500">이용약관</p>
                    <div className="h-3 w-[1px] bg-gray-200" />
                    <p className="text-body-12-b text-gray-700">
                        개인정보 처리방침
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default LoginPage
