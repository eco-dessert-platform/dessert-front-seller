import clsx from 'clsx'

interface ImagePlaceholderProps {
    className?: string
}

const ImagePlaceholder = ({ className = '' }: ImagePlaceholderProps) => {
    return (
        <div
            className={clsx(
                'flex-1 items-center self-stretch rounded-[20px] bg-amber-100',
                className,
            )}
        />
    )
}

export default ImagePlaceholder
