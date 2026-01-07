import type { AdminProductButtonGroup } from '../type/adminProductActionType'

export const ADMIN_PRODUCT_BUTTON_GROUPS: AdminProductButtonGroup[] = [
    {
        label: '상품',
        buttons: [
            {
                label: '상품추가',
                action: 'ADMIN_PRODUCT_ADD',
                disabled: false,
            },
            {
                label: '상품수정',
                action: 'ADMIN_PRODUCT_EDIT',
                disabled: false,
            },
            {
                label: '상품삭제',
                action: 'ADMIN_PRODUCT_DELETE',
                disabled: false,
            },
        ],
    },
    {
        label: '상품옵션',
        buttons: [
            {
                label: '상품옵션삭제',
                action: 'ADMIN_OPTION_DELETE',
                disabled: false,
            },
            {
                label: '품절',
                action: 'ADMIN_OPTION_OUT_OF_STOCK',
                disabled: false,
            },
            {
                label: '재고증가',
                action: 'ADMIN_OPTION_INCREASE_STOCK',
                disabled: false,
            },
        ],
    },
]
