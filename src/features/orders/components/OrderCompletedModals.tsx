import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import OrderDetailModal from './orderModals/components/OrderDetailModal'
import { MODAL_TYPE, UI_TEXT } from '../constants/orderConstants'
import type { OrderModalState } from '../hooks/useOrderModal'

interface OrderCompletedModalsProps {
    modalState: OrderModalState | null
    onClose: () => void
}

const OrderCompletedModals = ({
    modalState,
    onClose,
}: OrderCompletedModalsProps) => {
    if (!modalState) {
        return null
    }

    switch (modalState.type) {
        case MODAL_TYPE.NO_SELECT:
            return (
                <BgrDialog
                    open
                    type="alert"
                    title={UI_TEXT.VALIDATION.NO_SELECT}
                    description={UI_TEXT.VALIDATION.NO_SELECT_DESCRIPTION}
                    onOpenChange={onClose}
                />
            )

        case MODAL_TYPE.ORDER_DETAIL:
            return (
                <OrderDetailModal
                    orderList={modalState.orderList}
                    onClose={onClose}
                />
            )

        default:
            return null
    }
}

export default OrderCompletedModals

