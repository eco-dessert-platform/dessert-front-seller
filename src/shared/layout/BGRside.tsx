import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area.tsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/shared/lib/shadcn/components/ui/accordion'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import { useNavigate } from 'react-router'

const BGRside = () => {
    const menu = [
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
                { title: '정산내역', href: '/settle' },
                {
                    title: '충전금 현황',
                    href: '/settle/credits',
                },
                {
                    title: '지급보류내역',
                    href: '/settle/withheld',
                },
                {
                    title: '부가세신고내역',
                    href: '/settle/vat-reports',
                },
                {
                    title: '세금계산서조회',
                    href: '/settle/tax-invoices',
                },
            ],
        },
    ]

    const navigate = useNavigate()

    return (
        <nav className={'border-border h-full w-[240px] border-r'}>
            <ScrollArea className={`h-full w-full py-[24px] px-[16px]`}>
                <Accordion type="multiple" >
                    {menu.map((section) => (
                        <AccordionItem value={section.group} key={section.group}>
                            <AccordionTrigger className="w-[208px] h-[53px] no-underline hover:no-underline px-[8px]">
                                {section.group}
                            </AccordionTrigger>
                            <AccordionContent>
                                {section.items.map((item) => (
                                    <div className="w-[208px] h-[63px]" key={item.title}>
                                        <Button variant="ghost" className="    w-full bg-red-500/10 h-full text-left justify-start" onClick={() => navigate(item.href)}>
                                            {item.title}
                                        </Button>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </nav>
    )
}

export default BGRside