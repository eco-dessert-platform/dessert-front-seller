import BgSside from 'src/shared/layouts/BGSside.tsx'
import { SidebarProvider } from '../lib/shadcn/components/ui/sidebar'
import React from 'react'
import BGSheader from 'src/shared/layouts/BGSheader.tsx'

const BgSlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <BgSside />
            <div className="flex flex-col h-full w-full">
                <BGSheader />
                <main className="p-4">{children}</main>
            </div>
        </SidebarProvider>
    )
}

export default BgSlayout