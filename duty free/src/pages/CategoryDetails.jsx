import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/commonComponents/BreadCrumb'
import CategoryBanner from '../components/commonComponents/CategoryBanner'
import BrandSwiper from '../components/commonComponents/BrandSwiper'
import CategoryCard from '../components/commonComponents/CategoryCard'
import categoryimage1 from "../assets/categoryimage1.jpg"
import categoryimage2 from "../assets/categoryimage2.jpg"
import categoryimage3 from "../assets/categoryimage3.jpg"
import categoryimage4 from "../assets/categoryimage4.jpg"
import SaleBannerOneFirst from "../assets/salebanner1.jpg"
import SaleBannerOneTwo from "../assets/salebanner2.jpg"
import SaleBannerOneThree from "../assets/salebanner3.jpg"
import NewProducts from '../components/commonComponents/NewProducts'
import Products from '../components/commonComponents/Products'
import { apiRequest } from '../commonMethod/common'
import SaleCard from '../components/commonComponents/SaleCard'

const CategoryDetails = ({ breadNavigation, bannerDetails }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await apiRequest("GET", "/products", { page: 1 });
            setProducts(data?.products)
        };
        fetchProducts();
    }, [])
    const saleFirst = [
        {
            image: SaleBannerOneFirst,
            text: "This week only",
            des: "Lancome Idole gift sets 20 % less"
        },
        {
            image: SaleBannerOneTwo,
            text: "This week only 40% of",
            des: ""
        }
    ]
    const saleSecond = [
        {
            image: SaleBannerOneFirst,
            text: "Travel exclusives",
            des: ""
        },
        {
            image: SaleBannerOneThree,
            text: "Members only offers",
            des: ""
        }
    ]
    return (
        <div className=''>
            <BreadCrumb navigation={breadNavigation} />
            <CategoryBanner bannerDetails={bannerDetails} />
            <BrandSwiper />
            <div className='d-flex align-items-center flex-wrap container'>
                <div className='p-5 col-12 col-md-6 col-lg-3'>
                    <CategoryCard image={categoryimage1} text={"Fragrance"} />
                </div>
                <div className='p-5 col-12 col-md-6 col-lg-3'>
                    <CategoryCard image={categoryimage2} text={"Skincare"} />
                </div>
                <div className='p-5 col-12 col-md-6 col-lg-3'>
                    <CategoryCard image={categoryimage3} text={"Gift Sets"} />
                </div>
                <div className='p-5 col-12 col-md-6 col-lg-3'>
                    <CategoryCard image={categoryimage4} text={"Accesoires"} />
                </div>
            </div>
            <Products data={products} />
            <SaleCard data={saleFirst} imageClass={"small-image"} />
            <NewProducts />
            <SaleCard data={saleSecond} headingClass={"text-center"} imageClass={"big-image"} />

        </div>
    )
}

export default CategoryDetails