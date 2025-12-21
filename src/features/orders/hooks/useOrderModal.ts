import { useState, useCallback } from 'react'
import { MODAL_TYPE } from '../constants/orderConstants'

export type OrderModalState =
    | { type: typeof MODAL_TYPE.NO_SELECT }
    | { type: typeof MODAL_TYPE.ORDER_DETAIL; orderList: string[] }
    | { type: typeof MODAL_TYPE.REGIST_TRACKING_NUMBER }
    | {
          type: typeof MODAL_TYPE.MODIFY_TRACKING_NUMBER
          orderNumber: string
          trackingNumber?: string
          courierCompany?: string
      }
    | { type: typeof MODAL_TYPE.REFUND; rejectType: 'CANCEL' }
    | { type: typeof MODAL_TYPE.CANCEL_REFUSE; rejectType: 'CANCEL_REFUSE' }

export const useOrderModal = () => {
    const [modalState, setModalState] = useState<OrderModalState | null>(null)

    const openModal = useCallback((state: OrderModalState) => {
        setModalState(state)
    }, [])

    const closeModal = useCallback(() => {
        setModalState(null)
    }, [])

    return {
        modalState,
        openModal,
        closeModal,
    }
}

