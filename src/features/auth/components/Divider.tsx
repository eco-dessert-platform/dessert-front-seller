import clsx from 'clsx'

interface DividerProps {
    orientation?: 'horizontal' | 'vertical'
    className?: string
}

const Divider = ({
    orientation = 'horizontal',
    className = '',
}: DividerProps) => {
    return (
        <div
            className={clsx(
                'bg-gray-200',
                orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-3 w-[1px]',
                className,
            )}
        />
    )
}

export default Divider
