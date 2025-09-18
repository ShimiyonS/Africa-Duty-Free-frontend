import "../../Styles/category.css"
import { Link } from 'react-router-dom'
const CategoryCard = ({ item, image, text, link }) => {
    return (
        <div className='card-category linear-bg shadow-lg'>
            <img src={image} className='category-image w-100' />
            <Link to={`/product-category/${link}`} className='d-block justuspro-medium category-nav text-center text-decoration-none'>{text}</Link>
            <div className="category-des text-center px-4 pb-3">{item?.des}</div>
        </div>
    )
}
export default CategoryCard