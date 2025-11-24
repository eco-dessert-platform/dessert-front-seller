import WhLayout from 'src/shared/layout/WhLayout.tsx'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/app/store/redux/reduxHooks.tsx'
import { shallowEqual } from 'react-redux'
import { useEffect } from 'react'
import { sampleAction } from 'src/features/sample/sampleReducer.ts'
import SSspin from 'src/shared/components/loading/SSspin.tsx'
import SampleId from 'src/features/sample/[id]/SampleId.tsx'

const SampleIdPage = () => {
    const { pathname, product, productLoading } = useAppSelector(
        ({ routerReducer, sampleReducer,  }) => ({
            pathname: routerReducer.location.path,
            product: sampleReducer.product.data,
            productLoading: sampleReducer.product.loading,

        }),
        shallowEqual,
    )

    const dispatch = useAppDispatch()

    useEffect(() => {
        const id = pathname.split('/').pop()
        dispatch(sampleAction.getProduct(id))
    }, [dispatch, pathname])

    useEffect(() => {
        if (product) console.log(product)
    }, [product])

    return (
        <WhLayout title={product?.title}>
            <SSspin loading={productLoading}>
                <SampleId product={product} />
            </SSspin>
        </WhLayout>





    )
}

export default SampleIdPage