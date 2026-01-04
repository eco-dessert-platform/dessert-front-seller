import { useState } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { productsAction } from 'src/features/products/productsReducer'

const ProductRegister = () => {
    const dispatch = useAppDispatch()
    const { createProductResult } = useAppSelector(
        ({ productsReducer }) => ({
            createProductResult: productsReducer.createProductResult,
        }),
        shallowEqual,
    )

    const handleSubmit = () => {
        // TODO: 상품 등록 로직 구현
        const formData = new FormData()
        // formData.append(...)
        // dispatch(productsAction.createProduct(formData))
    }

    return (
        <div className="w-full">
            <h1 className="text-heading-24-b text-gray-900">상품등록</h1>
            <div className="mt-4">
                <form onSubmit={handleSubmit}>
                    {/* TODO: 상품 등록 폼 구현 */}
                    <div>상품 등록 폼이 여기에 표시됩니다.</div>
                </form>
            </div>
        </div>
    )
}

export default ProductRegister

