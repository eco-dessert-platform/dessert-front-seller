import BgrHeader from 'src/shared/layout/BgrHeader'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { Input } from 'src/shared/lib/shadcn/components/ui/input'
import RightArrow from 'src/assets/icons/arrow/right-arrow.svg?react'
import RequiredLabel from 'src/shared/components/text/RequiredLabel'

const SellerVerificationPage = () => {
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

                    <span className="text-title-16-sb text-gray-300">
                        스토어 정보 등록
                    </span>

                    <RightArrow stroke="#E0E0E0" width={24} height={24} />

                    <span className="text-title-16-sb text-gray-300">
                        회원가입 완료
                    </span>
                </div>
            </div>

            {/* wrap */}
            <div className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-5 self-stretch bg-gray-50 px-[196px] py-10">
                {/* p-3 */}
                <div className="flex flex-col items-center self-stretch rounded-2xl bg-white">
                    {/* s-1 */}
                    <div className="flex flex-col items-start gap-1 self-stretch px-5 py-4">
                        <p className="text-heading-20-sb text-gray-900">
                            필수 서류 등록
                        </p>
                        <p className="text-title-16-r text-gray-700">
                            파일은 10MB 이하의 jpg, jpeg, png, pdf만 등록이
                            가능해요
                        </p>
                    </div>

                    {/* s-2 */}
                    <div className="flex flex-col items-start gap-4 self-stretch px-5 pt-2.5 pb-4">
                        {/* input field*/}
                        <div className="flex flex-col items-start gap-1 self-stretch">
                            <RequiredLabel>사업자 등록증</RequiredLabel>
                            <div className="flex items-start gap-4 self-stretch">
                                <Input
                                    className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                    placeholder="사업자 등록증을 업로드해주세요"
                                />
                                <Button className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2">
                                    <span className="text-title-16-m text-white">
                                        업로드
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* input field*/}
                        <div className="flex flex-col items-start gap-1 self-stretch">
                            <RequiredLabel>통신판매업 신고증</RequiredLabel>
                            <div className="flex items-start gap-4 self-stretch">
                                <Input
                                    className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                    placeholder="통신판매업 신고증을 업로드해주세요"
                                />
                                <Button className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2">
                                    <span className="text-title-16-m text-white">
                                        업로드
                                    </span>
                                </Button>
                            </div>
                        </div>

                        {/* input field*/}
                        <div className="flex flex-col items-start gap-1 self-stretch">
                            <RequiredLabel>
                                즉석식품제조가공업 & 식품제조업
                            </RequiredLabel>
                            <div className="flex items-start gap-4 self-stretch">
                                <Input
                                    className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                    placeholder="즉석식품제조가공업 & 식품제조업을 업로드해주세요"
                                />
                                <Button className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2">
                                    <span className="text-title-16-m text-white">
                                        업로드
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* p-3 */}
                <div className="flex flex-col items-start self-stretch rounded-2xl bg-white">
                    {/* s-1 */}
                    <div className="flex flex-col items-start gap-1 self-stretch px-5 py-4">
                        <p className="text-heading-20-sb text-gray-900">
                            사업자 명의 계좌인증
                        </p>
                        <p className="text-title-16-r text-gray-700">
                            사업자 명의의 통장 사본과 일치하는 계좌번호로
                            인증해주세요
                        </p>
                    </div>

                    {/* s-2 */}
                    <div className="flex flex-col items-start gap-4 self-stretch px-5 pt-2.5 pb-4">
                        {/* input field*/}
                        <div className="flex flex-col items-start gap-1 self-stretch">
                            <RequiredLabel>사업자 명의 통장사본</RequiredLabel>
                            <div className="flex items-start gap-4 self-stretch">
                                <Input
                                    className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                    placeholder="대표자명 혹은 사업자명의 통장 사본을 업로드해주세요(10MB 이하의 jpg, jpeg, png, pdf)"
                                />
                                <Button className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2">
                                    <span className="text-title-16-m text-white">
                                        업로드
                                    </span>
                                </Button>
                            </div>
                            <span className="text-body-12-r text-gray-500">
                                예금주는 대표자명 혹은 사업자명과 일치하는
                                계좌번호만 인증이 가능해요
                            </span>
                        </div>

                        {/* s-2-2 */}
                        <div className="flex items-center justify-end gap-4 self-stretch">
                            {/* input field*/}
                            <div className="flex flex-1/2 flex-col items-start gap-1">
                                <span className="text-body-12-r text-gray-800">
                                    은행명
                                </span>
                                <div className="flex items-start gap-4 self-stretch">
                                    <Input
                                        className="text-title-16-r flex flex-1/2 items-center gap-2 self-stretch rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                                        placeholder="은행명"
                                    />
                                </div>
                            </div>

                            {/* input field*/}
                            <div className="flex flex-1/2 flex-col items-start gap-1">
                                <span className="text-body-12-r text-gray-800">
                                    계좌번호
                                </span>
                                <div className="flex items-start gap-4 self-stretch">
                                    <Input
                                        className="text-title-16-r flex flex-1/2 items-center gap-2 self-stretch rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                                        placeholder="계좌번호"
                                    />

                                    <Button className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2">
                                        <span className="text-title-16-m text-white">
                                            계좌인증
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2.5 self-stretch bg-white">
                <div className="flex items-end justify-end gap-3 self-stretch bg-white p-6">
                    <Button className="flex h-[56px] w-[180px] min-w-[180px] items-center justify-center gap-2 rounded-[12px] border border-gray-300 bg-gray-300 p-4">
                        <span className="text-heading-18-m text-white">
                            다음
                        </span>
                    </Button>
                </div>
            </footer>
        </div>
    )
}

export default SellerVerificationPage
