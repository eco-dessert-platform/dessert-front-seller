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
    const { adminProductList, deleteProductsResult } = useAppSelector(
        ({ adminProductsReducer }) => ({
            adminProductList: adminProductsReducer.adminProductList,
            deleteProductsResult: adminProductsReducer.deleteProductsResult,
        }),
        shallowEqual,
    )

    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
    const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([])

    useEffect(() => {
        const filterValue = getInitialFilterValue()
        dispatch(adminProductsAction.getAdminProductList(filterValue))
    }, [dispatch])

    useEffect(() => {
        if (deleteProductsResult?.data?.success) {
            alert('상품이 성공적으로 삭제되었습니다.')
            dispatch(
                adminProductsAction.getAdminProductList(
                    getInitialFilterValue(),
                ),
            )
            setSelectedProductIds([])
            setSelectedOptionIds([])
            dispatch(adminProductsAction.initialize('deleteProductsResult'))
        } else if (deleteProductsResult?.error) {
            alert(
                deleteProductsResult.errorMsg ||
                    '상품 삭제 중 오류가 발생했습니다.',
            )
            dispatch(adminProductsAction.initialize('deleteProductsResult'))
        }
    }, [deleteProductsResult, dispatch])

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
                if (ids.length === 0) {
                    alert('삭제할 상품을 선택해주세요.')
                    return
                }
                if (
                    window.confirm(
                        `선택한 ${ids.length}개의 상품을 삭제하시겠습니까?`,
                    )
                ) {
                    dispatch(
                        adminProductsAction.deleteAdminProducts(
                            ids.map(Number),
                        ),
                    )
                }
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
