import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { productsAction } from './productsReducer'
import { ProductSearchFilter } from './type/productFilterType'
import ProductTable from './components/ProductTable'

const getInitialFilterValue = (): ProductSearchFilter => ({
    page: 0,
    size: 10,
    keyword: '',
})

const Products = () => {
    const dispatch = useAppDispatch()
    const { productList } = useAppSelector(
        ({ productsReducer }) => ({
            productList: productsReducer.productList,
        }),
        shallowEqual,
    )

    useEffect(() => {
        const filterValue = getInitialFilterValue()
        dispatch(productsAction.getProductList(filterValue))
    }, [dispatch])

    return (
        <div className="w-full rounded-lg border border-gray-300 bg-white">
            <ProductTable />
        </div>
    )
}

export default Products
