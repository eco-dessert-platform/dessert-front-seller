import clsx from 'clsx'

interface BgrThumbnailProps {
    src?: string
    alt?: string
    size?: 'sm' | 'md' | 'lg'
    showPagination?: boolean
    paginationText?: string
    showSoldOut?: boolean
    soldOutText?: string
    className?: string
    onClick?: () => void
}

const BgrThumbnail = ({
    src,
    alt = '썸네일',
    size = 'md',
    showPagination = false,
    paginationText,
    showSoldOut = false,
    soldOutText = 'Sold Out',
    className = '',
    onClick,
}: BgrThumbnailProps) => {
    const sizeClasses = {
        sm: 'w-[60px] h-[60px]',
        md: 'w-[80px] h-[80px]',
        lg: 'w-[120px] h-[120px]',
    }

    return (
        <figure
            className={clsx(
                'relative overflow-hidden rounded-[8px] border border-gray-100',
                sizeClasses[size],
                onClick && 'cursor-pointer',
                className,
            )}
            onClick={onClick}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-body-12-r text-gray-400">
                        이미지 없음
                    </span>
                </div>
            )}

            {showPagination && paginationText && (
                <div className="absolute bottom-[15px] right-[15px] bg-black/60 px-2.5 py-0.5 rounded-[50px]">
                    <span className="text-title-14-m text-white">
                        {paginationText}
                    </span>
                </div>
            )}

            {showSoldOut && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-title-14-m text-gray-200">
                        {soldOutText}
                    </span>
                </div>
            )}
        </figure>
    )
}

export default BgrThumbnail

