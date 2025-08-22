import { useLocation } from 'react-router-dom';
import { firstLetterCapital } from '../../commonMethod/common';

const CategoryBanner = ({ bannerDetails }) => {
    const location = useLocation();
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    const category = segments[segments.length - 1];
    return (
        <div className='container'>
            <h1 className='mid-heading my-3'>{firstLetterCapital(category)}</h1>
            <div className='category-banner' style={{ backgroundImage: `url(${bannerDetails?.image})` }}>
                <p className='banner-des'>{bannerDetails?.description}</p>
            </div>
        </div>
    )
}
export default CategoryBanner