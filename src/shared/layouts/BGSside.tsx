'use client'

import React from 'react'
import { BoxIcon, ChevronDown, CreditCardIcon } from 'lucide-react'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from 'src/app/store/redux/reduxStore.tsx'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '../lib/shadcn/components/ui/sidebar'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from 'src/shared/lib/shadcn/components/ui/collapsible'
import { useNavigate } from 'react-router'

const menu = [
    {
        group: '주문 관리',
        items: [
            { title: '주문내역', href: '/orders', icon: BoxIcon },
            {
                title: '완료 주문 내역',
                href: '/orders/completed',
                icon: BoxIcon,
            },
        ],
    },
    {
        group: '정산 관리',
        items: [
            { title: '정산내역', href: '/settle', icon: CreditCardIcon },
            {
                title: '충전금 현황',
                href: '/settle/credits',
                icon: CreditCardIcon,
            },
            {
                title: '지급보류내역',
                href: '/settle/withheld',
                icon: CreditCardIcon,
            },
            {
                title: '부가세신고내역',
                href: '/settle/vat-reports',
                icon: CreditCardIcon,
            },
            {
                title: '세금계산서조회',
                href: '/settle/tax-invoices',
                icon: CreditCardIcon,
            },
        ],
    },
]

export default function BGSside() {
    const { pathname } = useSelector(
        (state: RootState) => ({
            pathname: state.routerReducer.location.path,
        }),
        shallowEqual,
    )

    const navigate = useNavigate()

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex items-center justify-center p-4">
                {/* 펼쳐진 상태 */}
                <div className="w-full flex justify-between group-data-[state=collapsed]:hidden">
                    <h2
                        className="cursor-pointer text-lg font-bold"
                        onClick={() => navigate('/')}
                    >
                        관리자 메뉴
                    </h2>
                    <SidebarTrigger />
                </div>

                {/* 접힌 상태 */}
                <div className="hidden group-data-[state=collapsed]:block">
                    <SidebarTrigger />
                </div>
            </SidebarHeader>
            <SidebarContent>
                {menu.map((section) => (
                    <Collapsible
                        key={section.group}
                        defaultOpen
                        className="group/collapsible"
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    {section.group}
                                    <ChevronDown
                                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {section.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    isActive={
                                                        item.href === pathname
                                                    }
                                                    asChild
                                                    tooltip={item.title}
                                                >
                                                    <div
                                                        onClick={() => {
                                                            navigate(item.href)
                                                        }}
                                                    >
                                                        <item.icon />
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <div className="text-muted-foreground p-4 text-sm">
                    © 2025 회사명
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}