export type ProductActionType =
    | 'PRODUCT_ADD'
    | 'PRODUCT_EDIT'
    | 'PRODUCT_DELETE'
    | 'OPTION_DELETE'
    | 'OPTION_OUT_OF_STOCK'
    | 'OPTION_INCREASE_STOCK'

export type ProductButtonConfig = {
    label: string
    action: ProductActionType
    disabled?: boolean
}

export type ProductButtonGroup = {
    label: string
    buttons: ProductButtonConfig[]
}
