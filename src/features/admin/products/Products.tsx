import { useEffect, useState } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { productsAction } from './productsReducer'
import { ProductSearchFilter } from './type/productFilterType'
import type { ProductActionType } from './type/productActionType'
import ProductTable from './components/ProductTable'
import ProductActions from './components/ProductActions'

const getInitialFilterValue = (): ProductSearchFilter => ({
    page: 0,
    size: 10,
    keyword: '',
})

const Products = () => {
    const dispatch = useAppDispatch()
    const { productList } = useAppSelector(
        ({ adminProductsReducer }) => ({
            productList: adminProductsReducer.productList,
        }),
        shallowEqual,
    )

    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([])

    useEffect(() => {
        const filterValue = getInitialFilterValue()
        dispatch(productsAction.getProductList(filterValue))
    }, [dispatch])

    const handleSelectionChange = (data: {
        selectedProductIds: string[]
        selectedOptionIds: string[]
    }) => {
        setSelectedProductIds(data.selectedProductIds)
        setSelectedOptionIds(data.selectedOptionIds)
    }

    const handleAction = (action: ProductActionType, ids: string[]) => {
        switch (action) {
            case 'PRODUCT_ADD':
                // TODO: 상품 추가 기능 구현
                console.log('상품추가:', ids)
                break
            case 'PRODUCT_EDIT':
                // TODO: 상품 수정 기능 구현
                console.log('상품수정:', ids)
                break
            case 'PRODUCT_DELETE':
                // TODO: 상품 삭제 기능 구현
                console.log('상품삭제:', ids)
                break
            case 'OPTION_DELETE':
                // TODO: 상품옵션 삭제 기능 구현
                console.log('상품옵션삭제:', ids)
                break
            case 'OPTION_OUT_OF_STOCK':
                // TODO: 품절 처리 기능 구현
                console.log('품절:', ids)
                break
            case 'OPTION_INCREASE_STOCK':
                // TODO: 재고증가 기능 구현
                console.log('재고증가:', ids)
                break
            default:
                console.warn('Unknown action:', action)
        }
    }

    return (
        <div className="w-full rounded-lg border border-gray-300 bg-white">
            <div className="flex flex-col gap-4 p-4">
                <ProductActions
                    selectedProductIds={selectedProductIds}
                    selectedOptionIds={selectedOptionIds}
                    onAction={handleAction}
                />
                <ProductTable
                    data={productList?.result}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    )
}

export default Products
