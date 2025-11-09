import { Button } from 'src/shared/lib/shadcn/components/ui/button'

interface BgrUploadButtonProps {
    onClick?: () => void
    disabled?: boolean
    label?: string
}

const BgrUploadButton = ({
    onClick,
    disabled = false,
    label = '업로드',
}: BgrUploadButtonProps) => {
    return (
        <Button
            className="flex min-w-[90px] items-center justify-center rounded-[10px] border border-gray-300 bg-gray-300 px-4 py-2 disabled:opacity-50"
            onClick={onClick}
            disabled={disabled}
        >
            <span className="text-title-16-m text-white">{label}</span>
        </Button>
    )
}

export default BgrUploadButton
