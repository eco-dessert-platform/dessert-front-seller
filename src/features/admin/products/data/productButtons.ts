import type { ProductButtonGroup } from '../type/productActionType'

export const PRODUCT_BUTTON_GROUPS: ProductButtonGroup[] = [
    {
        label: '상품',
        buttons: [
            { label: '상품추가', action: 'PRODUCT_ADD', disabled: false },
            { label: '상품수정', action: 'PRODUCT_EDIT', disabled: false },
            { label: '상품삭제', action: 'PRODUCT_DELETE', disabled: false },
        ],
    },
    {
        label: '상품옵션',
        buttons: [
            { label: '상품옵션삭제', action: 'OPTION_DELETE', disabled: false },
            { label: '품절', action: 'OPTION_OUT_OF_STOCK', disabled: false },
            {
                label: '재고증가',
                action: 'OPTION_INCREASE_STOCK',
                disabled: false,
            },
        ],
    },
]
