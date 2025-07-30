'use client'

import React from 'react'
import { BoxIcon, CreditCardIcon } from 'lucide-react'
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
} from '../lib/shadcn/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../lib/shadcn/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { Button } from 'src/shared/lib/shadcn/components/ui/button.tsx'
import { useNavigate } from "react-router";

const menu = [
    {
        group: '주문 관리',
        items: [
            { title: '주문내역', href: '/orders', icon: BoxIcon },
            { title: '완료 주문 내역', href: '/orders/completed', icon: BoxIcon },
        ],
    },
    {
        group: '정산 관리',
        items: [
            { title: '정산내역', href: '/settle', icon: CreditCardIcon },
            { title: '충전금 현황', href: '/settle/credits', icon: CreditCardIcon },
            { title: '지급보류내역', href: '/settle/withheld', icon: CreditCardIcon },
            { title: '부가세신고내역', href: '/settle/vat-reports', icon: CreditCardIcon },
            { title: '세금계산서조회', href: '/settle/tax-invoices', icon: CreditCardIcon },
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
        <Sidebar>
            <SidebarHeader>
                <h2 className="p-4 text-lg font-bold">관리자 메뉴</h2>
            </SidebarHeader>
            <SidebarContent>
                {menu.map((section) => (
                    <Collapsible key={section.group} defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    {section.group}
                                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {section.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    isActive={ item.href ===  pathname}
                                                    asChild>
                                                    <div
                                                        onClick={() => {navigate(item.href)}}

                                                    >
                                                        <item.icon />
                                                        <span>{item.title}</span>
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
                <div className="p-4 text-sm text-muted-foreground">
                    © 2025 회사명
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
