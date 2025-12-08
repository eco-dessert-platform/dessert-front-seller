import { ButtonGroup } from 'src/shared/lib/shadcn/components/ui/button-group'
import { Button } from 'src/shared/lib/shadcn/components/ui/button'
import type { ButtonConfig } from '../type/orderActionType'
import type { OrderControlButtonsProps } from '../type/orderModalType'
import { BUTTONS_BY_TAB } from '../data/buttonsByTab'

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
