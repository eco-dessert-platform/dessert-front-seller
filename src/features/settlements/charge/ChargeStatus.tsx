import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { settlementsAction } from 'src/features/settlements/settlementsReducer'

const ChargeStatus = () => {
    const dispatch = useAppDispatch()
    const { chargeStatus } = useAppSelector(
        ({ settlementsReducer }) => ({
            chargeStatus: settlementsReducer.chargeStatus,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(settlementsAction.getChargeStatus({}))
    }, [dispatch])

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">충전금 현황</h1>
            <div className="mt-4">
                {chargeStatus?.data ? (
                    <div>충전금 현황이 여기에 표시됩니다.</div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default ChargeStatus

