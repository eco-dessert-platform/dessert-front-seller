import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { settlementsAction } from 'src/features/settlements/settlementsReducer'

const VatReport = () => {
    const dispatch = useAppDispatch()
    const { vatReports } = useAppSelector(
        ({ settlementsReducer }) => ({
            vatReports: settlementsReducer.vatReports,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(
            settlementsAction.getVatReports({
                limit: 10,
                skip: 0,
            }),
        )
    }, [dispatch])

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">부가세 신고내역</h1>
            <div className="mt-4">
                {vatReports?.data ? (
                    <div>부가세 신고내역이 여기에 표시됩니다.</div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default VatReport

