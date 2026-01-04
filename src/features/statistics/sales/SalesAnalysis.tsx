import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { statisticsAction } from 'src/features/statistics/statisticsReducer'

const SalesAnalysis = () => {
    const dispatch = useAppDispatch()
    const { salesAnalysis, salesSummary } = useAppSelector(
        ({ statisticsReducer }) => ({
            salesAnalysis: statisticsReducer.salesAnalysis,
            salesSummary: statisticsReducer.salesSummary,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(statisticsAction.getSalesAnalysis({}))
        dispatch(statisticsAction.getSalesSummary({}))
    }, [dispatch])

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">판매분석</h1>
            <div className="mt-4">
                {salesAnalysis?.data ? (
                    <div>판매분석 데이터가 여기에 표시됩니다.</div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default SalesAnalysis

