import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from 'src/shared/lib/shadcn/lib/utils.ts'
import { ReactNode } from 'react'

function BgrTabs({
                  className,
                  ...props
              }: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    )
}

function BgrTabsList({
                      className,
                      ...props
                  }: React.ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                'text-muted-foreground inline-flex h-[45px] w-fit items-center justify-center rounded-lg  space-x-[10px]',
                className,
            )}
            {...props}
        />
    )
}

interface BgrTabsTriggerProps
    extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
    children: ReactNode
    number?: number
}

function BgrTabsTrigger({
                            children,
                            className,
                            number,
                            ...props
                        }: BgrTabsTriggerProps) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-300 px-[16px] py-[8px] text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                "bg-background",
                "data-[state=active]:bg-primary-500 data-[state=active]:border-primary-500 data-[state=active]:text-primary-foreground",
                className,
            )}
            {...props}
        >
            {children}
            {number !== undefined && (
                <span className="ml-2 text-xs data-[state=active]:text-white  text-primary-500">{number}</span>
            )}
        </TabsPrimitive.Trigger>
    )
}
function BgrTabsContent({
                         className,
                         ...props
                     }: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('flex-1 outline-none', className)}
            {...props}
        />
    )
}

export { BgrTabs, BgrTabsList, BgrTabsTrigger, BgrTabsContent }
