import "../../Styles/product.css"
import { Link } from 'react-router-dom'
const ProductCard = ({ data }) => {
    return (
        <div className='p-2'>
            <img src={data?.thumbnail} className='p-2 product-image' />
            <Link to={`/product/${data?.title}`} className='product-title d-block text-decoration-none mb-0 pt-3 pb-2'>{data?.title}</Link>
            <span className='product-price'>${data?.price}</span>
        </div>
    )
}
export default ProductCard