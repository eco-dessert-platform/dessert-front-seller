import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { productsAction } from 'src/features/products/productsReducer'

const Products = () => {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector(
        ({ productsReducer }) => ({
            products: productsReducer.products,
        }),
        shallowEqual,
    )

    useEffect(() => {
        dispatch(
            productsAction.getProducts({
                limit: 10,
                skip: 0,
            }),
        )
    }, [dispatch])

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">상품 조회 / 수정</h1>
            <div className="mt-4">
                {products?.data ? (
                    <div>상품 목록이 여기에 표시됩니다.</div>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default Products

