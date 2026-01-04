import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { settlementsAction } from 'src/features/settlements/settlementsReducer'

const TaxInvoice = () => {
    const dispatch = useAppDispatch()
    const { taxInvoices } = useAppSelector(
        ({ settlementsReducer }) => ({
            taxInvoices: settlementsReducer.taxInvoices,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(
            settlementsAction.getTaxInvoices({
                limit: 10,
                skip: 0,
            }),
        )
    }, [dispatch])

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">세금계산서 조회</h1>
            <div className="mt-4">
                {taxInvoices?.data ? (
                    <div>세금계산서 목록이 여기에 표시됩니다.</div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default TaxInvoice

