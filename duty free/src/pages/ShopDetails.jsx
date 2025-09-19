import React, { useEffect, useState } from 'react'
import Common from '../commonMethod/common.js';
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
    const [category, setCategory] = useState([])
    const bannerDetails = banner?.find((item) => item?.name === "shop");
    const { apiRequest } = Common()
    useEffect(() => {
        const fetchShop = async () => {
            const data = await apiRequest("GET", `/product`, { limit: 100 } );
            const category = await apiRequest("GET", "/subcategory");
            setShop(data?.products)
            setCategory(Array.from(new Map(category?.subCategories.map(item => [item?.slug, item])).values()))
        };
        fetchShop();
    }, [])

    return (
        <div className='container'>
            <BreadCrumb navigation={[{ key: "home", nav: "/" }, { key: "products", nav: "/shop" }, { key: `${"shop"}`, nav: "" }]} />
            <CategoryBanner bannerDetails={bannerDetails} />
            <BrandSwiper />
            <BestBuy data={category} />
            <Products data={shop} headingText={"Welcome to Our Shop"} paraClassName={'ps-4 linear-bg-heading text-color-secondary'} gridplacement={"product-grid"} imageheight={300} hidePopTool={true} />
            <SaleCard data={0} imageClass={"small-image"} />
            <TitleComponent heading={"New Products"} />
            <NewProducts productsdata={shop} hidePopTool={true} parentClassName={"mt-4"} />
            <SaleCard data={1} headingClass={"text-center"} imageClass={"big-image"} />
        </div>
    )
}

export default ShopDetails