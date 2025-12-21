import { BgrDialog } from 'src/shared/components/dialog/BgrDialog'
import OrderDetailModal from './orderModals/components/OrderDetailModal'
import TrackingNumberModal from './TrackingNumberModal'
import RejectModal from './RejectModal'
import { MODAL_TYPE, UI_TEXT } from '../constants/orderConstants'
import type { OrderModalState } from '../type/orderModalState'

interface OrderModalsProps {
    modalState: OrderModalState | null
    onClose: () => void
}

const OrderModals = ({ modalState, onClose }: OrderModalsProps) => {
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

        case MODAL_TYPE.REGIST_TRACKING_NUMBER:
            return (
                <TrackingNumberModal
                    type="register"
                    onCancel={onClose}
                    onConfirm={onClose}
                />
            )

        case MODAL_TYPE.MODIFY_TRACKING_NUMBER:
            return (
                <TrackingNumberModal
                    type="modify"
                    trackingNumber={modalState.trackingNumber}
                    courierCompany={modalState.courierCompany}
                    onCancel={onClose}
                    onConfirm={onClose}
                />
            )

        case MODAL_TYPE.REFUND:
            return (
                <RejectModal
                    rejectType={modalState.rejectType}
                    title="주문취소 사유"
                    onConfirm={onClose}
                    onCancel={onClose}
                />
            )

        case MODAL_TYPE.CANCEL_REFUSE:
            return (
                <RejectModal
                    rejectType={modalState.rejectType}
                    title="교환 거절 사유"
                    onConfirm={onClose}
                    onCancel={onClose}
                />
            )

        default:
            return null
    }
}

export default OrderModals

