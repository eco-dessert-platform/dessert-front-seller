import { useEffect } from 'react'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/global/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { productsAction } from './productsReducer'
import { ProductSearchFilter } from './type/productFilterType'

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

    return <></>
}

export default Products
