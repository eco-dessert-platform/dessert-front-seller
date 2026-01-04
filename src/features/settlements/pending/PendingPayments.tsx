import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { settlementsAction } from 'src/features/settlements/settlementsReducer'

const PendingPayments = () => {
    const dispatch = useAppDispatch()
    const { pendingPayments } = useAppSelector(
        ({ settlementsReducer }) => ({
            pendingPayments: settlementsReducer.pendingPayments,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(
            settlementsAction.getPendingPayments({
                limit: 10,
                skip: 0,
            }),
        )
    }, [dispatch])

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">지급 보류 내역</h1>
            <div className="mt-4">
                {pendingPayments?.data ? (
                    <div>지급 보류 내역이 여기에 표시됩니다.</div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default PendingPayments

