interface BgrFooterProps {
    variant?: 'default' | 'simple'
}

export const BgrLoginFooter = ({ variant = 'default' }: BgrFooterProps) => {
    if (variant === 'simple') {
        return (
            <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2.5 self-stretch bg-white">
                <div className="flex items-end justify-end gap-3 self-stretch bg-white p-6">
                    {/* 커스텀 버튼은 props로 받거나 children으로 처리 */}
                </div>
            </footer>
        )
    }

    return (
        <footer className="flex max-w-[1920px] min-w-[1440px] flex-col items-center gap-2 self-stretch border-t border-t-gray-200 bg-gray-100 p-6">
            <div className="flex items-center justify-center gap-2 self-stretch">
                <p className="text-body-12-b text-gray-700">빵그리의 오븐</p>
                <div className="h-3 w-[1px] bg-gray-200" />
                <p className="text-body-12-b text-gray-700">대표 : 윤예찬</p>
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
    )
}
