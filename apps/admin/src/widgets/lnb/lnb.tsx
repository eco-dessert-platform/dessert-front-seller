import { LogOutIcon } from '@dessert/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@dessert/ui'
import { Link, useLocation } from 'react-router'

import { useLogout } from '@/features/auth'
import { ROUTES } from '@/shared/constant/routes'
import { cn } from '@/shared/libs/utils'

const MENU_LIST = [
  {
    group: '스토어 관리',
    items: [
      { title: '회원가입 승인', href: ROUTES.STORE.MEMBER_APPROVAL },
      { title: '스토어명 변경 승인', href: ROUTES.STORE.NAME_CHANGE_APPROVAL },
      { title: '스토어 등록', href: ROUTES.STORE.REGISTRATION },
    ],
  },
  {
    group: '상품 관리',
    items: [
      { title: '업로드 상품 승인', href: ROUTES.PRODUCTS.UPLOAD_APPROVAL },
      { title: '전체 상품 관리', href: ROUTES.PRODUCTS.ALL },
    ],
  },
  {
    group: '홈페이지 관리',
    items: [{ title: '공지사항 관리', href: ROUTES.HOMEPAGE.NOTICE }],
  },
]

export function Lnb() {
  return (
    <nav
      aria-label="관리자 메뉴"
      className="relative flex h-[calc(100vh-80px)] w-[240px] shrink-0 flex-col border-r border-border"
    >
      <div className="flex-1 overflow-y-auto px-10 py-16">
        <Accordion type="multiple" className="gap-10">
          {MENU_LIST.map((menu) => (
            <AccordionItem value={menu.group} key={menu.group}>
              <AccordionTrigger>
                <span className="typo-title-16-sb text-gray-800">
                  {menu.group}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {menu.items.map((item) => (
                  <MenuItemLink
                    key={item.href}
                    title={item.title}
                    href={item.href}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <LogoutButton />
    </nav>
  )
}

function MenuItemLink({ href, title }: { href: string; title: string }) {
  const { pathname } = useLocation()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)
  return (
    <div className="px-8 py-4">
      <Link
        to={href}
        className={cn(
          'flex w-full items-center rounded-10 border border-transparent p-12',
          '[&]:no-underline',
          isActive && 'border-gray-200 bg-gray-100',
        )}
      >
        <span className="text-left typo-title-16-r text-gray-800">{title}</span>
      </Link>
    </div>
  )
}

function LogoutButton() {
  const { onLogout, isPending } = useLogout()

  return (
    <button
      type="button"
      className="flex h-[49px] w-full cursor-pointer items-center justify-start border-t border-gray-300 px-4 text-left"
      onClick={onLogout}
      disabled={isPending}
    >
      <LogOutIcon className="mr-2 size-20" />
      <span className="typo-title-16-m text-gray-800">로그아웃</span>
    </button>
  )
}
