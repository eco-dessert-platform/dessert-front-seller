import clsx from 'clsx'
import BGRHeader_logo from 'src/assets/logo/BGR-header-logo.svg?react'

interface Props {
    borderBottom?: boolean
}

const BgrHeader = ({ borderBottom = true }: Props) => {
    return (
        <header
            className={clsx(
                'flex h-[80px] w-[1440px] max-w-[1920px] shrink-0 items-center gap-[82px] bg-white px-6 py-2.5',
                borderBottom && 'border-b border-b-gray-300',
            )}
        >
            <div className="flex flex-1 items-start gap-[38px]">
                <BGRHeader_logo className="flex items-center justify-center gap-[9px]" />
            </div>
        </header>
    )
}

export default BgrHeader
