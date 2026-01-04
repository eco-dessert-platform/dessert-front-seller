import { useEffect } from 'react'
import { useParams } from 'react-router'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { productsAction } from 'src/features/products/productsReducer'

const ProductEdit = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const { product, updateProductResult } = useAppSelector(
        ({ productsReducer }) => ({
            product: productsReducer.product,
            updateProductResult: productsReducer.updateProductResult,
        }),
        shallowEqual,
    )

    useEffect(() => {
        if (id) {
            dispatch(productsAction.getProduct(Number(id)))
        }
    }, [dispatch, id])

    const handleSubmit = () => {
        if (!id) return
        // TODO: 상품 수정 로직 구현
        const formData = new FormData()
        // formData.append(...)
        // dispatch(productsAction.updateProduct({ id: Number(id), data: formData }))
    }

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">상품 수정</h1>
            <div className="mt-4">
                {product?.data ? (
                    <form onSubmit={handleSubmit}>
                        {/* TODO: 상품 수정 폼 구현 */}
                        <div>상품 수정 폼이 여기에 표시됩니다.</div>
                    </form>
                ) : (
                    <div>로딩 중...</div>
                )}
            </div>
        </div>
    )
}

export default ProductEdit

