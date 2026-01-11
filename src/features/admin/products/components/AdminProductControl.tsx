import { useEffect, useMemo, useCallback } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { adminProductsAction } from '../adminProductsReducer'
import { AdminProductSearchFilter } from '../type/adminProductFilterType'
import AdminProductControlButton from './AdminProductControlButton'

const getInitialFilterValue = (): AdminProductSearchFilter => ({
    page: 0,
    size: 10,
    keyword: '',
})

interface AdminProductControlProps {
    selectedProductIds: string[]
    selectedOptionIds: string[]
    onSelectionReset: () => void
}

const AdminProductControl = ({
    selectedProductIds,
    selectedOptionIds,
    onSelectionReset,
}: AdminProductControlProps) => {
    const dispatch = useAppDispatch()
    const { deleteProductsResult, deleteOptionsResult, updateStockResult } =
        useAppSelector(
            ({ adminProductsReducer }) => ({
                deleteProductsResult: adminProductsReducer.deleteProductsResult,
                deleteOptionsResult: adminProductsReducer.deleteOptionsResult,
                updateStockResult: adminProductsReducer.updateStockResult,
            }),
            shallowEqual,
        )

    const handleRefreshList = useCallback(() => {
        dispatch(
            adminProductsAction.getAdminProductList(getInitialFilterValue()),
        )
    }, [dispatch])

    // 상품 삭제 결과 처리
    useEffect(() => {
        if (deleteProductsResult?.data?.success) {
            alert('상품이 성공적으로 삭제되었습니다.')
            handleRefreshList()
            onSelectionReset()
            dispatch(adminProductsAction.initialize('deleteProductsResult'))
        } else if (deleteProductsResult?.error) {
            alert(
                deleteProductsResult.errorMsg ||
                    '요청 처리 중 오류가 발생했습니다.',
            )
            dispatch(adminProductsAction.initialize('deleteProductsResult'))
        }
    }, [deleteProductsResult, dispatch, handleRefreshList, onSelectionReset])

    // 옵션 삭제 결과 처리
    useEffect(() => {
        if (deleteOptionsResult?.data?.success) {
            alert('상품 옵션이 성공적으로 삭제되었습니다.')
            handleRefreshList()
            onSelectionReset()
            dispatch(adminProductsAction.initialize('deleteOptionsResult'))
        } else if (deleteOptionsResult?.error) {
            alert(
                deleteOptionsResult.errorMsg ||
                    '요청 처리 중 오류가 발생했습니다.',
            )
            dispatch(adminProductsAction.initialize('deleteOptionsResult'))
        }
    }, [deleteOptionsResult, dispatch, handleRefreshList, onSelectionReset])

    // 재고 업데이트 결과 처리
    useEffect(() => {
        if (updateStockResult?.data?.success) {
            alert('재고 상태가 성공적으로 변경되었습니다.')
            handleRefreshList()
            onSelectionReset()
            dispatch(adminProductsAction.initialize('updateStockResult'))
        } else if (updateStockResult?.error) {
            alert(
                updateStockResult.errorMsg ||
                    '요청 처리 중 오류가 발생했습니다.',
            )
            dispatch(adminProductsAction.initialize('updateStockResult'))
        }
    }, [updateStockResult, dispatch, handleRefreshList, onSelectionReset])

    // 상품 선택 여부 확인
    const hasSelectedProducts = useMemo(
        () => selectedProductIds.length > 0,
        [selectedProductIds.length],
    )

    // 옵션 선택 여부 확인
    const hasSelectedOptions = useMemo(
        () => selectedOptionIds.length > 0,
        [selectedOptionIds.length],
    )

    // 상품 추가 핸들러
    const handleProductAdd = () => {
        // TODO: 상품 추가 기능 구현
        console.log('상품추가:', selectedProductIds)
    }

    // 상품 수정 핸들러
    const handleProductEdit = () => {
        // TODO: 상품 수정 기능 구현
        console.log('상품수정:', selectedProductIds)
    }

    // 상품 삭제 핸들러
    const handleProductDelete = () => {
        if (selectedProductIds.length === 0) {
            alert('삭제할 상품을 선택해주세요.')
            return
        }
        if (
            window.confirm(
                `선택한 ${selectedProductIds.length}개의 상품을 삭제하시겠습니까?`,
            )
        ) {
            dispatch(
                adminProductsAction.deleteAdminProducts(
                    selectedProductIds.map(Number),
                ),
            )
        }
    }

    // 옵션 삭제 핸들러
    const handleOptionDelete = () => {
        if (selectedOptionIds.length === 0) {
            alert('삭제할 옵션을 선택해주세요.')
            return
        }
        if (
            window.confirm(
                `선택한 ${selectedOptionIds.length}개의 옵션을 삭제하시겠습니까?`,
            )
        ) {
            // ids는 "productId:optionId" 형식의 문자열 배열입니다.
            const grouped = selectedOptionIds.reduce(
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
    }

    // 품절 처리 핸들러
    const handleOptionOutOfStock = () => {
        if (selectedOptionIds.length === 0) {
            alert('품절 처리할 옵션을 선택해주세요.')
            return
        }
        if (
            window.confirm(
                `선택한 ${selectedOptionIds.length}개의 옵션을 품절 처리하시겠습니까?`,
            )
        ) {
            selectedOptionIds.forEach((id) => {
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
    }

    // 재고 증가 핸들러
    const handleOptionIncreaseStock = () => {
        if (selectedOptionIds.length === 0) {
            alert('재고를 증가시킬 옵션을 선택해주세요.')
            return
        }
        const amountStr = window.prompt('증가시킬 재고 수량을 입력하세요.', '1')
        if (amountStr === null) return
        const amount = Number(amountStr)
        if (isNaN(amount) || amount <= 0) {
            alert('올바른 수량을 입력해주세요.')
            return
        }

        selectedOptionIds.forEach((id) => {
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
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <span className="min-w-[80px] text-right text-sm font-medium text-gray-700">
                    상품
                </span>
                <div className="flex gap-2">
                    <AdminProductControlButton
                        label="상품추가"
                        onClick={handleProductAdd}
                    />
                    <AdminProductControlButton
                        label="상품수정"
                        onClick={handleProductEdit}
                        disabled={!hasSelectedProducts}
                    />
                    <AdminProductControlButton
                        label="상품삭제"
                        onClick={handleProductDelete}
                        disabled={!hasSelectedProducts}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className="min-w-[80px] text-right text-sm font-medium text-gray-700">
                    상품옵션
                </span>
                <div className="flex gap-2">
                    <AdminProductControlButton
                        label="상품옵션삭제"
                        onClick={handleOptionDelete}
                        disabled={!hasSelectedOptions}
                    />
                    <AdminProductControlButton
                        label="품절"
                        onClick={handleOptionOutOfStock}
                        disabled={!hasSelectedOptions}
                    />
                    <AdminProductControlButton
                        label="재고증가"
                        onClick={handleOptionIncreaseStock}
                        disabled={!hasSelectedOptions}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminProductControl
