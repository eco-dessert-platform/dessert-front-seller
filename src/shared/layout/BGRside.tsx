import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area.tsx'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from 'src/shared/lib/shadcn/components/ui/accordion'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'src/global/store/redux/reduxHooks.tsx'
import { authAction } from 'src/features/auth/authReducer.ts'

const BGRside = () => {
    const menu = [
        {
            group: '상품 관리',
            items: [
                {
                    title: '상품등록',
                    href: '/products/register',
                },
                {
                    title: '상품 조회/수정',
                    href: '/products',
                },
            ],
        },
        {
            group: '주문 관리',
            items: [
                { title: '주문내역', href: '/orders' },
                {
                    title: '완료 주문 내역',
                    href: '/orders/completed',
                },
            ],
        },
        {
            group: '정산 관리',
            items: [
                { title: '정산내역', href: '/settlements' },
                {
                    title: '충전금 현황',
                    href: '/settlements/charge',
                },
                {
                    title: '지급보류내역',
                    href: '/settlements/pending',
                },
                {
                    title: '부가세신고내역',
                    href: '/settlements/vat-report',
                },
                {
                    title: '세금계산서조회',
                    href: '/settlements/tax-invoice',
                },
            ],
        },
        {
            group: '통계',
            items: [
                {
                    title: '판매분석',
                    href: '/statistics/sales',
                },
            ],
        },
        {
            group: '판매자 정보',
            items: [
                {
                    title: '판매자 정보 변경',
                    href: '/seller/profile',
                },
            ],
        },
    ]

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(authAction.logout({}))
        navigate('/login', { replace: true })
    }

    return (
        <nav className={'border-border flex h-full w-[240px] flex-col border-r'}>
            <ScrollArea className={`min-h-0 flex-1 w-full`}>
                <div className="px-[10px] py-[16px]">
                    <Accordion type="multiple">
                        {menu.map((section) => (
                            <AccordionItem
                                value={section.group}
                                key={section.group}
                            >
                                <AccordionTrigger className="text-bold text-18 h-[53px] w-[208px] px-[8px] text-gray-800 no-underline hover:no-underline">
                                    {section.group}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {section.items.map((item) => (
                                        <div
                                            className="h-[63px] w-[208px] px-[8px] py-[4px]"
                                            key={item.title}
                                        >
                                            <Button
                                                variant="ghost"
                                                className="text-18 h-full w-full justify-start px-[12px] text-left text-gray-800"
                                                onClick={() => navigate(item.href)}
                                            >
                                                {item.title}
                                            </Button>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </ScrollArea>
            <div className="border-border flex shrink-0 items-center gap-[8px] border-t px-[16px] py-[10px]">
                <svg
                    className="size-[24px] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                        stroke="#424242"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <button
                    onClick={handleLogout}
                    className="font-medium text-18 text-gray-800"
                >
                    로그아웃
                </button>
            </div>
        </nav>
    )
}

export default BGRside
