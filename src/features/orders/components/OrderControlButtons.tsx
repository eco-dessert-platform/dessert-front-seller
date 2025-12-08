import { ButtonGroup } from 'src/shared/lib/shadcn/components/ui/button-group'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import type { TabCategory } from '../type/orderStatusType'
import type { ActionType, ButtonConfig } from '../type/orderActionType'
import type { OrderControlButtonsProps } from '../type/orderModalType'

const BUTTONS_BY_TAB = {
    ALL: [],
    PAID: [
        { label: '발주확인', action: 'ORDER_CONFIRMED', disabled: false },
        { label: '주문취소', action: 'CANCEL_APPROVED', disabled: false },
    ],
    CHECKED: [
        { label: '주문취소', action: 'CANCEL_APPROVED', disabled: false },
        { label: '반품', action: 'RETURN_APPROVED', disabled: false },
    ],
    SHIPPED: [
        { label: '반품', action: 'RETURN_APPROVED', disabled: false },
        { label: '교환', action: 'EXCHANGE_APPROVED', disabled: false },
    ],
    DELIVERED: [
        { label: '반품', action: 'RETURN_APPROVED', disabled: false },
        { label: '교환', action: 'EXCHANGE_APPROVED', disabled: false },
    ],
    PAYMENT_COMPLETED: [
        { label: '취소승인', action: 'CANCEL_APPROVED', disabled: false },
        { label: '취소거절', action: 'CANCEL_REJECTED', disabled: false },
    ],
    REFUND: [
        [
            { label: '반품승인', action: 'RETURN_APPROVED', disabled: false },
            { label: '반품거절', action: 'RETURN_REJECTED', disabled: false },
        ],
        [
            { label: '반품완료', action: 'RETURN_COMPLETED', disabled: true },
            { label: '반품반려', action: 'RETURN_RETURNED', disabled: true },
            { label: '반품보류', action: 'RETURN_ON_HOLD', disabled: true },
        ],
    ],
    CHANGE: [
        [
            { label: '반품승인', action: 'RETURN_APPROVED', disabled: false },
            { label: '반품거절', action: 'RETURN_REJECTED', disabled: false },
        ],
        [
            { label: '반품완료', action: 'RETURN_COMPLETED', disabled: true },
            { label: '반품반려', action: 'RETURN_RETURNED', disabled: true },
            { label: '반품보류', action: 'RETURN_ON_HOLD', disabled: true },
        ],
    ],
} satisfies Record<TabCategory, ButtonConfig[] | ButtonConfig[][]>

function checkIsButtonGroup(
    buttons: ButtonConfig[] | ButtonConfig[][],
): buttons is ButtonConfig[][] {
    return buttons.length > 0 && Array.isArray(buttons[0])
}

const OrderControlButtons = ({
    activeTab,
    onClick,
}: OrderControlButtonsProps) => {
    const buttons = BUTTONS_BY_TAB[activeTab]

    if (!buttons || buttons.length === 0) return null

    const isGrouped = checkIsButtonGroup(buttons)

    if (isGrouped) {
        return (
            <div className="flex gap-2">
                {buttons.map((group, groupIndex) => (
                    <ButtonGroup key={groupIndex}>
                        {group.map((button, buttonIndex) => (
                            <Button
                                key={buttonIndex}
                                onClick={() => onClick(button.action)}
                                disabled={button.disabled}
                                className="text-12 h-[30px] min-w-[61px] border border-gray-200 bg-white p-0 font-medium"
                            >
                                {button.label}
                            </Button>
                        ))}
                    </ButtonGroup>
                ))}
            </div>
        )
    }

    return (
        <div className="flex gap-2">
            {buttons.map((button, buttonIndex) => (
                <Button
                    key={buttonIndex}
                    variant="outline"
                    onClick={() => onClick(button.action)}
                    disabled={button.disabled}
                    className="text-12 h-[30px] min-w-[61px] border border-gray-200 p-0"
                >
                    {button.label}
                </Button>
            ))}
        </div>
    )
}

export default OrderControlButtons
