import BgSside from 'src/shared/layouts/BGSside.tsx'
import { SidebarTrigger, SidebarProvider } from '../lib/shadcn/components/ui/sidebar'
import React from 'react'

const BgSlayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <BgSside />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default BgSlayout