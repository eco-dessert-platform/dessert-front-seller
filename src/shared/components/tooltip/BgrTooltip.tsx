import clsx from 'clsx'
import { ReactNode } from 'react'

interface BgrTooltipProps {
    children: ReactNode
    content: string | ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
    className?: string
}

const BgrTooltip = ({
    children,
    content,
    position = 'top',
    className = '',
}: BgrTooltipProps) => {
    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-black/70 border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-black/70 border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-black/70 border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-black/70 border-t-transparent border-b-transparent border-l-transparent',
    }

    return (
        <div className={clsx('relative inline-block group', className)}>
            {children}
            <div
                className={clsx(
                    'absolute z-50 hidden group-hover:block',
                    'bg-black/70 text-white text-body-10-r',
                    'px-2 py-1.5 rounded-[4px]',
                    'max-w-[200px] whitespace-pre-wrap',
                    'shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08),0px_3px_10px_0px_rgba(0,0,0,0.1)]',
                    positionClasses[position],
                )}
                role="tooltip"
            >
                <div className="relative">
                    {typeof content === 'string' ? (
                        <p className="mb-0">{content}</p>
                    ) : (
                        content
                    )}
                    <div
                        className={clsx(
                            'absolute w-0 h-0 border-4',
                            arrowClasses[position],
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default BgrTooltip

