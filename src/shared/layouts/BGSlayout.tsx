import BgSside from 'src/shared/layouts/BGSside.tsx'
import {
    SidebarProvider,
    SidebarTrigger,
} from '../lib/shadcn/components/ui/sidebar'
import React from 'react'

const BgSlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <BgSside />
            <main>
                <SidebarTrigger />
                {children}
            {/*   todo  타이틀 처리 */}
            </main>
        </SidebarProvider>
    )
}

export default BgSlayout
