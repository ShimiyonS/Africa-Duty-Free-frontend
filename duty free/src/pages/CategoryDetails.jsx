import { useEffect, useState } from 'react'
import BreadCrumb from '../components/commonComponents/BreadCrumb'
import CategoryBanner from '../components/commonComponents/CategoryBanner'
import BrandSwiper from '../components/commonComponents/BrandSwiper'
import NewProducts from '../components/commonComponents/NewProducts'
import Products from '../components/commonComponents/Products'
import { apiRequest } from '../commonMethod/common'
import SaleCard from '../components/commonComponents/SaleCard'
import BestBuy from '../components/commonComponents/BestBuy'
import { useParams } from 'react-router-dom'
import { banner } from '../Files/data'

const CategoryDetails = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState([])

    const bannerDetails = banner?.find((item) => item?.name === slug);

    useEffect(() => {
        const fetchCategory = async () => {
            const data = await apiRequest("GET", `/products/category/${slug}`, { page: 1 });
            setCategory(data?.products)
        };
        fetchCategory();
    }, [])
    return (
        <div className=''>
            <BreadCrumb navigation={[{ key: "home", nav: "/" }, { key: "products", nav: "/shop" }, { key: `${slug}`, nav: "" }]} />
            <CategoryBanner bannerDetails={bannerDetails} />
            <BrandSwiper />
            <BestBuy />
            <Products data={category} />
            <SaleCard data={0} imageClass={"small-image"} />
            <NewProducts />
            <SaleCard data={1} headingClass={"text-center"} imageClass={"big-image"} />
        </div>
    )
}

export default CategoryDetails