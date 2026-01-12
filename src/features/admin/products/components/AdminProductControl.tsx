import { useEffect, useMemo, useCallback } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { adminProductsAction } from '../adminProductsReducer'
import { AdminProductSearchFilter } from '../type/adminProductFilterType'
import AdminProductControlButton from './AdminProductControlButton'
import { bgrToast } from 'src/shared/components/toast/BgrToast'

const getInitialFilterValue = (): AdminProductSearchFilter => ({
    page: 0,
    size: 10,
    keyword: '',
})

const AdminProductControl = () => {
    const dispatch = useAppDispatch()
    const {
        deleteProductsResult,
        deleteOptionsResult,
        updateStockResult,
        selectedProductIds,
        selectedOptionIds,
    } = useAppSelector(
        ({ adminProductsReducer }) => ({
            deleteProductsResult: adminProductsReducer.deleteProductsResult,
            deleteOptionsResult: adminProductsReducer.deleteOptionsResult,
            updateStockResult: adminProductsReducer.updateStockResult,
            selectedProductIds:
                adminProductsReducer.selectedProductIds as string[],
            selectedOptionIds:
                adminProductsReducer.selectedOptionIds as string[],
        }),
        shallowEqual,
    )

    const handleRefreshList = useCallback(() => {
        dispatch(
            adminProductsAction.getAdminProductList(getInitialFilterValue()),
        )
    }, [dispatch])

    // 공통 결과 처리 핸들러
    const handleResult = useCallback(
        (
            res: any,
            successMsg: string,
            actionType: Parameters<typeof adminProductsAction.initialize>[0],
        ) => {
            if (!res) return

            if (res.data?.success) {
                bgrToast.success(successMsg)
                handleRefreshList()
                dispatch(adminProductsAction.clearSelections(undefined))
                dispatch(adminProductsAction.initialize(actionType))
            } else if (res.error) {
                bgrToast.error(
                    res.errorMsg || '요청 처리 중 오류가 발생했습니다.',
                )
                dispatch(adminProductsAction.initialize(actionType))
            }
        },
        [dispatch, handleRefreshList],
    )

    // 각 요청 결과를 독립적인 Effect로 관리
    useEffect(
        () =>
            handleResult(
                deleteProductsResult,
                '상품이 성공적으로 삭제되었습니다.',
                'deleteProductsResult',
            ),
        [deleteProductsResult, handleResult],
    )
    useEffect(
        () =>
            handleResult(
                deleteOptionsResult,
                '상품 옵션이 성공적으로 삭제되었습니다.',
                'deleteOptionsResult',
            ),
        [deleteOptionsResult, handleResult],
    )
    useEffect(
        () =>
            handleResult(
                updateStockResult,
                '재고 상태가 성공적으로 변경되었습니다.',
                'updateStockResult',
            ),
        [updateStockResult, handleResult],
    )

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
                (acc: Record<string, number[]>, cur) => {
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
        // TODO: 옵션 선택 UI와 상품 단위 API 명세 간의 정합성 확인 후 구현 예정
        console.log('품절 처리 예정:', selectedOptionIds)
    }

    // 재고 증가 핸들러
    const handleOptionIncreaseStock = () => {
        // TODO: 옵션 선택 UI와 상품 단위 API 명세 간의 정합성 확인 후 구현 예정
        console.log('재고 증가 예정:', selectedOptionIds)
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
                <span className="min-w-[80px] text-right text-sm font-medium text-gray-800">
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
