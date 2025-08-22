import BreadCrumb from '../components/commonComponents/BreadCrumb'
import { useParams } from 'react-router-dom'
import CategoryBanner from '../components/commonComponents/CategoryBanner'
import { useEffect, useState } from 'react'
import BrandSwiper from '../components/commonComponents/BrandSwiper'
import BestBuy from '../components/commonComponents/BestBuy'
import Products from '../components/commonComponents/Products'
import NewProducts from '../components/commonComponents/NewProducts'
import SaleCard from '../components/commonComponents/SaleCard'

const BrandDetails = () => {
    const { slug } = useParams()

    const [brand, setBrands] = useState([])
    useEffect(() => {
        const fetchBrand = async () => {
            const data = await apiRequest("GET", `/products/category/${slug}`);
            setBrands(data?.products)
        };
        fetchBrand();
    }, [])
    return (
        <div>
            <BreadCrumb navigation={[{ key: "home", nav: "/" }, { key: "products", nav: "/shop" }, { key: `${slug}`, nav: "" }]} />
            <CategoryBanner bannerDetails={{ image: "", description: "" }} />
            <BrandSwiper />
            <BestBuy />
            <Products data={brand} />
            <SaleCard data={0} imageClass={"small-image"} />
            <NewProducts />
            <SaleCard data={1} headingClass={"text-center"} imageClass={"big-image"} />
        </div>
    )
}

export default BrandDetails