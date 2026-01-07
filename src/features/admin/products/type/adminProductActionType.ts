export type AdminProductActionType =
    | 'ADMIN_PRODUCT_ADD'
    | 'ADMIN_PRODUCT_EDIT'
    | 'ADMIN_PRODUCT_DELETE'
    | 'ADMIN_OPTION_DELETE'
    | 'ADMIN_OPTION_OUT_OF_STOCK'
    | 'ADMIN_OPTION_INCREASE_STOCK'

export type AdminProductButtonConfig = {
    label: string
    action: AdminProductActionType
    disabled?: boolean
}

export type AdminProductButtonGroup = {
    label: string
    buttons: AdminProductButtonConfig[]
}
