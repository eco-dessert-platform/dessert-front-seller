import { useState, useCallback } from 'react'
import type { OrderModalState } from '../type/orderModalState'

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

