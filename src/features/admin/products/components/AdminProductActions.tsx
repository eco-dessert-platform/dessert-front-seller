import { useMemo } from 'react'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import type { AdminProductActionType } from '../type/adminProductActionType'
import { ADMIN_PRODUCT_BUTTON_GROUPS } from '../data/adminProductButtons'

interface AdminProductActionsProps {
    selectedProductIds: string[]
    selectedOptionIds: string[]
    onAction: (action: AdminProductActionType, ids: string[]) => void
}

const AdminProductActions = ({
    selectedProductIds,
    selectedOptionIds,
    onAction,
}: AdminProductActionsProps) => {
    const hasSelectedProducts = useMemo(
        () => selectedProductIds.length > 0,
        [selectedProductIds.length],
    )

    const hasSelectedOptions = useMemo(
        () => selectedOptionIds.length > 0,
        [selectedOptionIds.length],
    )

    // 액션이 상품 액션인지 확인
    const isProductAction = (action: AdminProductActionType): boolean => {
        return (
            action === 'ADMIN_PRODUCT_ADD' ||
            action === 'ADMIN_PRODUCT_EDIT' ||
            action === 'ADMIN_PRODUCT_DELETE'
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {ADMIN_PRODUCT_BUTTON_GROUPS.map((group) => (
                <div key={group.label} className="flex items-center gap-3">
                    <span className="min-w-[80px] text-right text-sm font-medium text-gray-700">
                        {group.label}
                    </span>
                    <div className="flex gap-2">
                        {group.buttons.map((button) => {
                            const isProduct = isProductAction(button.action)
                            const isDisabled =
                                (isProduct
                                    ? !hasSelectedProducts
                                    : !hasSelectedOptions) || button.disabled
                            const selectedIds = isProduct
                                ? selectedProductIds
                                : selectedOptionIds

                            return (
                                <Button
                                    key={button.action}
                                    variant="outline"
                                    size="sm"
                                    className="border-gray-400 bg-white text-gray-900 hover:bg-gray-50"
                                    disabled={isDisabled}
                                    onClick={() => {
                                        if (!isDisabled) {
                                            onAction(button.action, selectedIds)
                                        }
                                    }}
                                >
                                    {button.label}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminProductActions
