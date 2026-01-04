import { useParams } from 'react-router'

const ProductEditPage = () => {
    const { id } = useParams<{ id: string }>()

    return <div>상품 수정 페이지 - ID: {id}</div>
}

export default ProductEditPage

