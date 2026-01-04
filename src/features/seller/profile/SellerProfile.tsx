import { useEffect, useState } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { sellerAction } from 'src/features/seller/sellerReducer'

const SellerProfile = () => {
    const dispatch = useAppDispatch()
    const { sellerProfile, updateSellerProfileResult } = useAppSelector(
        ({ sellerReducer }) => ({
            sellerProfile: sellerReducer.sellerProfile,
            updateSellerProfileResult: sellerReducer.updateSellerProfileResult,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(sellerAction.getSellerProfile())
    }, [dispatch])

    const handleSubmit = () => {
        // TODO: 판매자 정보 수정 로직 구현
        // dispatch(sellerAction.updateSellerProfile({ ... }))
    }

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">판매자 정보 변경</h1>
            <div className="mt-4">
                {sellerProfile?.data ? (
                    <form onSubmit={handleSubmit}>
                        {/* TODO: 판매자 정보 수정 폼 구현 */}
                        <div>판매자 정보 수정 폼이 여기에 표시됩니다.</div>
                    </form>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default SellerProfile

