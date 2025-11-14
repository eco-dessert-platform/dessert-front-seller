import BgrHeader from 'src/shared/layout/BgrHeader'
import RightArrow from 'src/assets/icons/arrow/right-arrow.svg?react'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'

const RegisterSuccessPage = () => {
    return (
        <div className={'bg-background flex h-screen w-screen flex-col'}>
            <BgrHeader borderBottom={false} />

            {/* process step */}
            <div className="flex h-[60px] max-w-[1920px] min-w-[1440px] flex-col items-center justify-center gap-2.5 self-stretch border-b border-b-gray-200 bg-white px-[90px] py-4">
                <div className="flex flex-1/2 items-center justify-center gap-[60px] self-stretch">
                    <span className="text-primary-500 text-title-16-sb">
                        판매자 인증
                    </span>

                    <RightArrow />

                    <span className="text-title-16-sb text-primary-500">
                        스토어 정보 등록
                    </span>

                    <RightArrow />

                    <span className="text-title-16-sb text-primary-500">
                        회원가입 완료
                    </span>
                </div>
            </div>

            {/* wrap */}
            <div className="flex max-w-[1920px] min-w-[1440px] flex-1 items-center justify-center self-stretch bg-gray-50 px-[196px] py-10">
                {/* content */}
                <div className="flex flex-1 items-center gap-4 self-stretch rounded-[20px] border border-gray-200 bg-white p-2.5">
                    {/* image */}
                    <div className="h-[660px] max-w-[840px] flex-1/2 items-center self-stretch rounded-[20px] bg-amber-100" />

                    {/* p-1 */}
                    <div className="flex flex-1/2 flex-col items-center gap-14 px-5">
                        {/* title */}
                        <div className="flex flex-col items-start gap-1">
                            <p className="text-heading-18-b text-gray-900">
                                🎉 회원가입 완료
                            </p>
                            <p className="text-title-16-m text-gray-900">
                                빵그리의 오븐 판매자 채널에 가입해 주셔서
                                진심으로 감사드립니다.
                                <br />
                                고객님의 가입 정보는 확인 후 승인 절차를 거치게
                                되며,
                                <br />
                                승인까지는 영업일 기준 1~2일 정도 소요됩니다.
                                <br />
                                승인될 때까지 조금만 기다려 주세요.
                            </p>
                        </div>

                        <Button className="border-primary-500 flex h-[56px] w-[408px] min-w-[180px] items-center justify-center gap-2 rounded-[12px] border bg-white p-4">
                            <p className="text-heading-18-m text-primary-500">
                                첫화면으로 이동
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterSuccessPage
