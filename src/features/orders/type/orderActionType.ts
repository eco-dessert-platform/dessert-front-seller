export type ActionType =
    | 'ORDER_CONFIRMED'
    | 'CANCEL_APPROVED'
    | 'CANCEL_REJECTED'
    | 'RETURN_APPROVED'
    | 'RETURN_REJECTED'
    | 'RETURN_COMPLETED'
    | 'RETURN_RETURNED'
    | 'RETURN_ON_HOLD'
    | 'EXCHANGE_APPROVED'

export type ButtonConfig = {
    label: string
    action: ActionType
    disabled: boolean
}
