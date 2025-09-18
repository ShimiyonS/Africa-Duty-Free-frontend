import React, { useEffect, useState } from 'react'
import Common from '../commonMethod/Common';
import BreadCrumb from '../components/commonComponents/BreadCrumb';
import Products from '../components/commonComponents/Products';
import BestBuy from '../components/commonComponents/BestBuy';
import BrandSwiper from '../components/commonComponents/BrandSwiper';
import CategoryBanner from '../components/commonComponents/CategoryBanner';
import NewProducts from '../components/commonComponents/NewProducts';
import { banner } from '../Files/data';
import SaleCard from '../components/commonComponents/SaleCard';
import TitleComponent from '../components/TitleComponent';

const ShopDetails = () => {
    const [shop, setShop] = useState([])
    const bannerDetails = banner?.find((item) => item?.name === "shop");
    const { apiRequest } = Common()
    useEffect(() => {
        const fetchShop = async () => {
            const data = await apiRequest("GET", `/products/`);
            setShop(data?.products)
        };
        fetchShop();
    }, [])

    return (
        <div className='container'>
            <BreadCrumb navigation={[{ key: "home", nav: "/" }, { key: "products", nav: "/shop" }, { key: `${"shop"}`, nav: "" }]} />
            <CategoryBanner bannerDetails={bannerDetails} />
            <BrandSwiper />
            <BestBuy />
            <Products data={shop} headingText={"Welcome to Our Shop"} paraClassName={'ps-4 linear-bg-heading text-color-secondary'} gridplacement={"product-grid"} imageheight={300} hidePopTool={true} />
            <SaleCard data={0} imageClass={"small-image"} />
            <TitleComponent heading={"New Products"} />
            <NewProducts productsdata={shop} hidePopTool={true} parentClassName={"mt-4"} />
            <SaleCard data={1} headingClass={"text-center"} imageClass={"big-image"} />
        </div>
    )
}

export default ShopDetails