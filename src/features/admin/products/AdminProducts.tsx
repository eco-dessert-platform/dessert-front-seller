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
    const {
        adminProductList,
        deleteProductsResult,
        deleteOptionsResult,
        updateStockResult,
    } = useAppSelector(
        ({ adminProductsReducer }) => ({
            adminProductList: adminProductsReducer.adminProductList,
            deleteProductsResult: adminProductsReducer.deleteProductsResult,
            deleteOptionsResult: adminProductsReducer.deleteOptionsResult,
            updateStockResult: adminProductsReducer.updateStockResult,
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
        const results = [
            {
                res: deleteProductsResult,
                msg: '상품이 성공적으로 삭제되었습니다.',
                key: 'deleteProductsResult',
            },
            {
                res: deleteOptionsResult,
                msg: '상품 옵션이 성공적으로 삭제되었습니다.',
                key: 'deleteOptionsResult',
            },
            {
                res: updateStockResult,
                msg: '재고 상태가 성공적으로 변경되었습니다.',
                key: 'updateStockResult',
            },
        ]

        results.forEach(({ res, msg, key }) => {
            if (res?.data?.success) {
                alert(msg)
                dispatch(
                    adminProductsAction.getAdminProductList(
                        getInitialFilterValue(),
                    ),
                )
                setSelectedProductIds([])
                setSelectedOptionIds([])
                dispatch(adminProductsAction.initialize(key))
            } else if (res?.error) {
                alert(res.errorMsg || '요청 처리 중 오류가 발생했습니다.')
                dispatch(adminProductsAction.initialize(key))
            }
        })
    }, [deleteProductsResult, deleteOptionsResult, updateStockResult, dispatch])

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
                if (ids.length === 0) {
                    alert('삭제할 옵션을 선택해주세요.')
                    return
                }
                if (
                    window.confirm(
                        `선택한 ${ids.length}개의 옵션을 삭제하시겠습니까?`,
                    )
                ) {
                    // ids는 "productId:optionId" 형식의 문자열 배열입니다.
                    const grouped = ids.reduce(
                        (acc, cur) => {
                            const [pid, oid] = cur.split(':')
                            if (!acc[pid]) acc[pid] = []
                            acc[pid].push(Number(oid))
                            return acc
                        },
                        {} as Record<string, number[]>,
                    )

                    // 각 상품별로 옵션 삭제 API 호출
                    Object.entries(grouped).forEach(([pid, oids]) => {
                        dispatch(
                            adminProductsAction.deleteAdminProductOptions({
                                productId: Number(pid),
                                data: {
                                    removeAll: false,
                                    optionIds: oids,
                                },
                            }),
                        )
                    })
                }
                break
            case 'ADMIN_OPTION_OUT_OF_STOCK':
                if (ids.length === 0) {
                    alert('품절 처리할 옵션을 선택해주세요.')
                    return
                }
                if (
                    window.confirm(
                        `선택한 ${ids.length}개의 옵션을 품절 처리하시겠습니까?`,
                    )
                ) {
                    ids.forEach((id) => {
                        const [, oid] = id.split(':')
                        dispatch(
                            adminProductsAction.updateAdminProductStock({
                                productId: Number(oid),
                                data: {
                                    editStockFlag: 'SOLDOUT',
                                    amount: null,
                                },
                            }),
                        )
                    })
                }
                break
            case 'ADMIN_OPTION_INCREASE_STOCK':
                if (ids.length === 0) {
                    alert('재고를 증가시킬 옵션을 선택해주세요.')
                    return
                }
                const amountStr = window.prompt(
                    '증가시킬 재고 수량을 입력하세요.',
                    '1',
                )
                if (amountStr === null) return
                const amount = Number(amountStr)
                if (isNaN(amount) || amount <= 0) {
                    alert('올바른 수량을 입력해주세요.')
                    return
                }

                ids.forEach((id) => {
                    const [, oid] = id.split(':')
                    dispatch(
                        adminProductsAction.updateAdminProductStock({
                            productId: Number(oid),
                            data: {
                                editStockFlag: 'INCREASE',
                                amount: amount,
                            },
                        }),
                    )
                })
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
