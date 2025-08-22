import "../../Styles/category.css"
import { Link } from 'react-router-dom'
const CategoryCard = ({ image, text, link }) => {
    return (
        <div className='card-category linear-bg shadow-lg'>
            <img src={image} className='category-image w-100' />
            <Link to={`/africa-best-buy/product-category/${link}`} className='d-block  category-nav text-center text-decoration-none'>{text}</Link>
        </div>
    )
}
export default CategoryCard