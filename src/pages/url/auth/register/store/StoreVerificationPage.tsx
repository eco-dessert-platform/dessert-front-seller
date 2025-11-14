import BgrHeader from 'src/shared/layout/BgrHeader'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { Input } from 'src/shared/lib/shadcn/components/ui/input'
import RightArrow from 'src/assets/icons/arrow/right-arrow.svg?react'
import Camera from 'src/assets/icons/profile-camera-icon.svg?react'
import CheckOff from 'src/assets/icons/icn-check-off.svg?react'
import RequiredLabel from 'src/shared/components/text/RequiredLabel'

const StoreVerificationPage = () => {
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

                    <span className="text-title-16-sb text-gray-300">
                        회원가입 완료
                    </span>
                </div>
            </div>

            {/* wrap */}
            <div className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-5 self-stretch bg-gray-50 px-[196px] py-10">
                {/* p-2 */}
                <div className="flex flex-col items-start self-stretch rounded-2xl bg-white">
                    {/* s-1 */}
                    <div className="flex flex-col items-start gap-1 self-stretch px-5 py-4">
                        <p className="text-heading-20-sb text-gray-900">
                            스토어 정보 등록
                        </p>
                    </div>

                    {/* s-2 */}
                    <div className="flex flex-col items-start gap-4 self-stretch px-5 pt-2.5 pb-4">
                        {/* input field*/}
                        <div className="flex flex-col items-start gap-1 self-stretch">
                            <RequiredLabel>스토어명</RequiredLabel>
                            <div className="flex items-start gap-4 self-stretch">
                                <Input
                                    className="text-title-16-r flex flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                    placeholder="스토어를 검색해주세요"
                                />
                                <Button className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2">
                                    <span className="text-title-16-m text-white">
                                        업로드
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* frame */}
                    <div className="flex items-start self-stretch pb-4">
                        {/* profile */}
                        <div className="flex h-[398px] flex-col items-start gap-2 px-5 py-2.5">
                            {/* profile frame */}
                            <div className="flex flex-col items-start gap-1 self-stretch">
                                <p className="text-title-14-m self-stretch text-gray-800">
                                    스토어 프로필
                                </p>
                                <div className="flex flex-col items-start gap-1 self-stretch">
                                    <div className="flex h-[200px] w-[200px] flex-col items-center justify-center rounded-2xl border border-gray-200 p-6">
                                        <Camera />
                                        <div className="flex items-center justify-center gap-1 self-stretch">
                                            <p className="text-body-12-r text-center text-gray-800">
                                                이미지를 업로드해주세요
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-body-10-r text-gray-500">
                                    권장 크기 1000×1000, 최소 160×160 이상 (1:1
                                    비율) · <br />
                                    jpg, jpeg, png 형식 · 10MB 이하 파일만
                                    업로드 가능해요
                                </p>
                            </div>
                            {/* input field */}
                            <div className="flex w-[220px] flex-col items-start gap-1">
                                <label className="text-body-12-r text-gray-800">
                                    한줄소개
                                </label>
                                <Input
                                    className="text-title-16-r flex flex-col items-start justify-center gap-2.5 self-stretch rounded-[10px] border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                    placeholder="스토어 소개를 작성해주세요"
                                />
                            </div>
                        </div>
                        {/* s-2 */}
                        <div className="flex flex-1/2 flex-col items-center justify-center self-stretch">
                            {/* 연락처 frame */}
                            <div className="flex items-start gap-4 self-stretch px-5">
                                {/* input frame */}
                                <div className="flex flex-1/2 items-start gap-2.5 py-2.5">
                                    <div className="flex flex-1/2 flex-col items-start gap-1">
                                        <RequiredLabel>연락처</RequiredLabel>
                                        <Input
                                            className="text-title-16-r flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                            placeholder="하이픈(-) 없이 입력해주세요"
                                        />
                                        <p className="text-body-12-r self-stretch text-gray-500">
                                            연락처는 주문서 혹은 상품 페이지
                                            하단에서 고객이 확인할 수 있어요
                                        </p>
                                    </div>
                                </div>

                                {/* input frame */}
                                <div className="flex flex-1/2 items-start gap-2.5 py-2.5">
                                    <div className="flex flex-1/2 flex-col items-start gap-1">
                                        <p className="text-body-12-r text-gray-800">
                                            추가 연락처
                                        </p>
                                        <Input
                                            className="text-title-16-r flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                            placeholder="하이픈(-) 없이 입력해주세요"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* 이메일 frame */}
                            <div className="flex items-end gap-4 self-stretch px-5 py-2.5">
                                <div className="flex flex-1/2 flex-col items-start gap-1">
                                    <RequiredLabel>이메일</RequiredLabel>
                                    <Input
                                        className="text-title-16-r flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder:text-gray-400"
                                        placeholder="이메일 주소를 입력해주세요"
                                    />
                                </div>

                                <div className="flex h-[42px] w-[15px] flex-col items-center justify-center gap-2.5">
                                    <p className="text-title-16-r self-stretch text-gray-800">
                                        @
                                    </p>
                                </div>

                                <Input className="text-title-16-r flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400" />

                                <div className="flex min-w-[150px] flex-col items-start gap-1">
                                    <div className="flex w-[150px] items-center gap-2 rounded-[10px] border border-gray-300 py-1 pr-2 pl-3">
                                        <p className="text-title-16-r flex-1/2 text-gray-400">
                                            선택하세요
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* 주소 frame */}
                            <div className="flex items-start gap-4 self-stretch px-5 py-2.5">
                                <div className="flex w-[310px] flex-col items-start gap-1">
                                    <RequiredLabel>우편번호</RequiredLabel>
                                    <div className="flex items-start gap-4 self-stretch">
                                        <Input
                                            className="text-title-16-r flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                                            placeholder="우편번호"
                                        />
                                        <Button className="bg-primary-500 flex min-w-[90px] items-center justify-center rounded-[10px] px-4 py-2">
                                            <p className="text-title-16-m text-white">
                                                우편번호 검색
                                            </p>
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-1/2 flex-col items-start gap-1">
                                    <RequiredLabel>출고지 주소</RequiredLabel>
                                    <div className="flex items-start gap-4 self-stretch">
                                        <Input
                                            className="text-title-16-r flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                                            placeholder="출고지 주소"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 출고지 상세주소 frame */}
                            <div className="flex flex-col items-start gap-2.5 self-stretch px-5 py-2.5">
                                <div className="flex flex-col items-start gap-1 self-stretch">
                                    <RequiredLabel>
                                        출고지 상세 주소
                                    </RequiredLabel>
                                    <Input
                                        className="text-title-16-r flex-1/2 items-center gap-1.5 rounded-[10px] border border-gray-300 bg-gray-100 px-3 py-2 text-gray-400 placeholder:text-gray-400"
                                        placeholder="상세주소를 입력해주세요(동/호수 포함)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* p-2 */}
                <div className="flex w-[1048px] flex-col items-start rounded-2xl bg-white">
                    {/* s-1 */}
                    <div className="flex items-center justify-between self-stretch px-5 py-4">
                        <p className="text-heading-20-sb w-[128px] text-gray-900">
                            이용 약관 동의
                        </p>
                    </div>
                    {/* s-2 */}
                    <div className="item-start flex flex-col self-stretch px-5 py-3">
                        {/* 약관 frame */}
                        <div className="flex flex-col items-start gap-4 self-stretch">
                            <div className="flex items-center gap-3 self-stretch">
                                <CheckOff />
                                <p className="text-title-16-m text-gray-900">
                                    전체 동의
                                </p>
                            </div>

                            {/* divider */}
                            <div className="flex flex-col items-start gap-2.5 self-stretch py-1">
                                <div className="h-[1px] w-[1008px] bg-gray-300" />
                            </div>

                            <div className="flex flex-col items-start gap-2 self-stretch">
                                <div className="flex items-center gap-3">
                                    <CheckOff />
                                    <div className="flex items-center gap-0.5">
                                        <p className="text-title-16-m text-gray-900">
                                            이용약관
                                        </p>
                                        <p className="text-title-16-m text-primary-500">
                                            (필수)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex h-[200px] flex-col items-start gap-1 self-stretch overflow-y-auto rounded-[10px] border border-gray-300 p-4">
                                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                                        <p className="text-title-14-sb self-stretch text-gray-700">
                                            제1조 목적
                                        </p>
                                        <p className="text-title-14-r self-stretch text-gray-700">
                                            이 약관은 ‘빵그리의 오븐’(이하
                                            ‘회사’)이 운영하는 플랫폼을 통해
                                            제공되는 서비스 이용과 관련하여
                                            회사와 이용자 간의 권리, 의무 및
                                            책임사항을 규정함을 목적으로 합니다.
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                                        <p className="text-title-14-sb self-stretch text-gray-700">
                                            제2조 용어 정의
                                        </p>
                                        <p className="text-title-14-r self-stretch text-gray-700">
                                            1. “서비스”란 회사가 운영하는
                                            웹사이트 및 앱을 통해 제공하는 건강
                                            디저트 관련 정보, 상품 판매, 예약 및
                                            홍보 서비스를 말합니다.
                                            <br />
                                            2. “판매자”란 회사의 입점 절차를
                                            거쳐 자사 상품을 판매하는 개인 또는
                                            사업자를 말합니다.
                                            <br /> 3. “이용자”란 서비스에
                                            접속하여 이 약관에 따라 서비스를
                                            이용하는 모든 회원 및 비회원을
                                            의미합니다.
                                            <br /> 4. “회원”은 회사와 이용계약을
                                            체결하고 계정을 부여받은 자를
                                            말합니다.
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                                        <p className="text-title-14-sb self-stretch text-gray-700">
                                            제3조 약관의 효력 및 변경
                                        </p>
                                        <p className="text-title-14-r self-stretch text-gray-700">
                                            1. “서비스”란 회사가 운영하는
                                            웹사이트 및 앱을 통해 제공하는 건강
                                            디저트 관련 정보, 상품 판매, 예약 및
                                            홍보 서비스를 말합니다.
                                            <br />
                                            2. “판매자”란 회사의 입점 절차를
                                            거쳐 자사 상품을 판매하는 개인 또는
                                            사업자를 말합니다.
                                            <br /> 3. “이용자”란 서비스에
                                            접속하여 이 약관에 따라 서비스를
                                            이용하는 모든 회원 및 비회원을
                                            의미합니다.
                                            <br /> 4. “회원”은 회사와 이용계약을
                                            체결하고 계정을 부여받은 자를
                                            말합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-2 self-stretch">
                                <div className="flex items-center gap-3">
                                    <CheckOff />
                                    <div className="flex items-center gap-0.5">
                                        <p className="text-title-16-m text-gray-900">
                                            개인정보 처리방침
                                        </p>
                                        <p className="text-title-16-m text-primary-500">
                                            (필수)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex h-[200px] flex-col items-start gap-1 self-stretch overflow-y-auto rounded-[10px] border border-gray-300 p-4">
                                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                                        <p className="text-title-14-sb self-stretch text-gray-700">
                                            제1조 (개인정보의 수집 항목 및 방법)
                                        </p>
                                        <p className="text-title-14-r self-stretch text-gray-700">
                                            회사는 다음의 개인정보를 수집합니다.
                                            <br />
                                            · 회원가입 시: 이름, 이메일,
                                            비밀번호, 휴대전화번호
                                            <br />
                                            · 판매자 등록 시: 사업자등록번호,
                                            상호명, 대표자명, 정산계좌 정보
                                            <br />· 서비스 이용 시: 접속 로그,
                                            쿠키, 이용기록
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-start gap-0.5 self-stretch">
                                        <p className="text-title-14-sb self-stretch text-gray-700">
                                            제2조 (개인정보의 수집 및 이용 목적)
                                        </p>
                                        <p className="text-title-14-r self-stretch text-gray-700">
                                            수집한 개인정보는 다음의 목적을 위해
                                            사용됩니다.
                                            <br /> 1. 회원 관리 및 본인 확인
                                            <br />
                                            2. 입점자와 소비자 간 거래 중개 결제
                                            및 정산 서비스 제공 신규 서비스 개발
                                            및 마케팅 활용
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2.5 self-stretch bg-white">
                <div className="flex items-end justify-end gap-3 self-stretch p-6">
                    <Button className="border-primary-500 flex h-[56px] w-[180px] min-w-[180px] items-center justify-center gap-2 rounded-[12px] border bg-white p-4">
                        <span className="text-heading-18-m text-primary-500">
                            뒤로가기
                        </span>
                    </Button>

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

export default StoreVerificationPage
