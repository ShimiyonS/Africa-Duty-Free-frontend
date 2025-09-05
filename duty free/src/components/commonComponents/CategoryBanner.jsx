import { useLocation, useParams } from 'react-router-dom';
import Common from '../../commonMethod/Common';

const CategoryBanner = ({ bannerDetails }) => {
    const {subslug } = useParams();
    const location = useLocation();
    const { firstLetterCapital } = Common()
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    const category = segments[segments.length - 1];
    return (
        <div className='container'>
            <h1 className='mid-heading justuspro-regular mb-2 text-color-danger'>{firstLetterCapital(category)}</h1>
            <div className='category-banner' style={{ backgroundImage: `url(${bannerDetails?.image})` }}>
                {!subslug && <p className='banner-des text-color-secondary justuspro-regular'>{bannerDetails?.description}</p>}
            </div>
        </div>
    )
}
export default CategoryBanner