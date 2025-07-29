import BgSside from 'src/shared/layout/ShadcnSide.tsx'
import { SidebarProvider } from '../lib/shadcn/components/ui/sidebar.tsx'
import React from 'react'
import ShadcnHeader from 'src/shared/layout/ShadcnHeader.tsx'

const ShadcnLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <BgSside />
            <div className="flex h-full w-full flex-col">
                <ShadcnHeader />
                <main className="p-4">{children}</main>
            </div>
        </SidebarProvider>
    )
}

export default ShadcnLayout
