import { ScrollArea } from 'src/shared/lib/shadcn/components/ui/scroll-area.tsx'

const BGRside = () => {
    return (
        <nav className={'border-border h-full w-[240px] border-r'}>
            <ScrollArea className={`h-full w-full`}></ScrollArea>
        </nav>
    )
}

export default BGRside
