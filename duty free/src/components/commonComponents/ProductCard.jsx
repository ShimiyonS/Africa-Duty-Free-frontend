import "../../Styles/product.css"
import { Link } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io";

const ProductCard = ({ data }) => {
    return (
        <div className='p-2'>
            <button onClick={null} className="bg-transparent border-0 heart-btn position-absolute"><IoMdHeartEmpty /></button>
            <img src={data?.thumbnail} className='p-2 product-image' />
            <Link to={`/product/${data?.id}`} className='product-title d-block text-decoration-none mb-0 pt-3 pb-2'>{data?.title}</Link>
            <span className='product-price'>${data?.price}</span>
        </div>
    )
}
export default ProductCard