import { Button } from 'src/shared/lib/shadcn/components/ui/button'

interface AdminProductControlButtonProps {
    label: string
    onClick: () => void
    disabled?: boolean
}

const AdminProductControlButton = ({
    label,
    onClick,
    disabled = false,
}: AdminProductControlButtonProps) => {
    return (
        <Button
            variant="outline"
            size="sm"
            className="border-gray-400 bg-white text-gray-900 hover:bg-gray-50"
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </Button>
    )
}

export default AdminProductControlButton

