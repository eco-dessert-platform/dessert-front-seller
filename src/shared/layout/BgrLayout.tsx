import React from 'react'
import BGRheader from 'src/shared/layout/BgrHeader.tsx'
import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area.tsx'
import BGRside from 'src/shared/layout/BGRside.tsx'

const BgrLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={'bg-background flex h-screen w-screen flex-col'}>
            <BGRheader />

            <div className="flex h-[calc(100vh-80px)] w-full flex-row">
                <BGRside />

                <main className={'h-full w-[calc(100vw-240px)] bg-gray-50'}>
                    <ScrollArea className={`h-full w-full px-[90px] py-[40px]`}>
                        {children}
                    </ScrollArea>
                </main>
            </div>
        </div>
    )
}

export default BgrLayout
