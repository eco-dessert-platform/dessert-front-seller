import { useEffect, useState } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { adminProductsAction } from './adminProductsReducer'
import { AdminProductSearchFilter } from './type/adminProductFilterType'
import type { AdminProductActionType } from './type/adminProductActionType'
import AdminProductTable from './components/AdminProductTable'
import AdminProductActions from './components/AdminProductActions'

const getInitialFilterValue = (): AdminProductSearchFilter => ({
    page: 0,
    size: 10,
    keyword: '',
})

const AdminProducts = () => {
    const dispatch = useAppDispatch()
    const { adminProductList } = useAppSelector(
        ({ adminProductsReducer }) => ({
            adminProductList: adminProductsReducer.adminProductList,
        }),
        shallowEqual,
    )

    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([])

    useEffect(() => {
        const filterValue = getInitialFilterValue()
        dispatch(adminProductsAction.getAdminProductList(filterValue))
    }, [dispatch])

    const handleSelectionChange = (data: {
        selectedProductIds: string[]
        selectedOptionIds: string[]
    }) => {
        setSelectedProductIds(data.selectedProductIds)
        setSelectedOptionIds(data.selectedOptionIds)
    }

    const handleAction = (action: AdminProductActionType, ids: string[]) => {
        switch (action) {
            case 'ADMIN_PRODUCT_ADD':
                // TODO: 상품 추가 기능 구현
                console.log('상품추가:', ids)
                break
            case 'ADMIN_PRODUCT_EDIT':
                // TODO: 상품 수정 기능 구현
                console.log('상품수정:', ids)
                break
            case 'ADMIN_PRODUCT_DELETE':
                // TODO: 상품 삭제 기능 구현
                console.log('상품삭제:', ids)
                break
            case 'ADMIN_OPTION_DELETE':
                // TODO: 상품옵션 삭제 기능 구현
                console.log('상품옵션삭제:', ids)
                break
            case 'ADMIN_OPTION_OUT_OF_STOCK':
                // TODO: 품절 처리 기능 구현
                console.log('품절:', ids)
                break
            case 'ADMIN_OPTION_INCREASE_STOCK':
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
                <AdminProductActions
                    selectedProductIds={selectedProductIds}
                    selectedOptionIds={selectedOptionIds}
                    onAction={handleAction}
                />
                <AdminProductTable
                    data={adminProductList?.data?.result}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
        </div>
    )
}

export default AdminProducts
