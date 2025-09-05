import { useLocation } from 'react-router-dom';
import Common from '../../commonMethod/Common';

const CategoryBanner = ({ bannerDetails }) => {
    const location = useLocation();
    const { firstLetterCapital } = Common()
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    const category = segments[segments.length - 1];
    return (
        <div className='container'>
            <h1 className='mid-heading my-1'>{firstLetterCapital(category)}</h1>
            <div className='category-banner' style={{ backgroundImage: `url(${bannerDetails?.image})` }}>
                <img src='' alt='' />
                <p className='banner-des'>{bannerDetails?.description}</p>
            </div>
        </div>
    )
}
export default CategoryBanner