interface TextDividerProps {
    className?: string
}

const TextDivider = ({ className = '' }: TextDividerProps) => {
    return (
        <div
            className={`flex flex-col items-start gap-2.5 self-stretch py-1 ${className}`}
        >
            <div className="h-[1px] w-full bg-gray-300" />
        </div>
    )
}

export default TextDivider
