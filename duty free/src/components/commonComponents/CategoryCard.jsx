import "../../Styles/category.css"
import { Link } from 'react-router-dom'
const CategoryCard = ({ image, text, link, desc }) => {
    return (
        <div className='card-category linear-bg shadow-lg'>
            <img src={image} className='category-image w-100' />
            <div className="p-2">
                <Link to={`/product-category/${link}`} className='d-block justuspro-regular category-nav pb-0 text-center text-decoration-none'>{text}</Link>
                <p className="text-color-secondary text-center m-0 category-desc dmsans-bold">{desc}</p>
            </div>
        </div>
    )
}
export default CategoryCard