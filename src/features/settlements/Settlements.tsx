import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { settlementsAction } from 'src/features/settlements/settlementsReducer'

const Settlements = () => {
    const dispatch = useAppDispatch()
    const { settlements } = useAppSelector(
        ({ settlementsReducer }) => ({
            settlements: settlementsReducer.settlements,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(
            settlementsAction.getSettlements({
                limit: 10,
                skip: 0,
            }),
        )
    }, [dispatch])

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">정산내역</h1>
            <div className="mt-4">
                {settlements?.data ? (
                    <div>정산내역이 여기에 표시됩니다.</div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default Settlements

