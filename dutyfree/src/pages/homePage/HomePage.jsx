import React from 'react'
import Banner from '../../components/commonComponents/Banner'
import BrandSwiper from '../../components/commonComponents/BrandSwiper'
import BestBuy from '../../components/commonComponents/BestBuy'
import OfferBanner from '../../components/OfferBanner'
import { useLocation } from 'react-router-dom'
import TitleComponent from '../../components/TitleComponent'
import DiscountComponent from '../../components/commonComponents/DiscountComponent'
import SwiperComponent from '../../components/commonComponents/swiperComponent'

const HomePage = () => {
    const location = useLocation()
    const slug = location.pathname
    console.log(slug)
    const categorys = [
        {
            categoryName: "liquor",
            descriptions: "Indulge in your favorite spirits with exclusive duty- free.",
            image: ""
        },
        {
            categoryName: "fragrances",
            descriptions: "Discover Scents That Elevate Your Journey.",
            image: ""
        },
        {
            categoryName: "cosmetics",
            descriptions: "Indulge in your favorite spirits with exclusive duty- free.",
            image: ""
        },
        {
            categoryName: "accesoires",
            descriptions: "Indulge in your favorite spirits with exclusive duty- free",
            image: ""
        }
    ]
    return (
        <>
            <div className='container'>
                <Banner />
                <BrandSwiper />
                <div>
                    <BestBuy data={categorys} itemClassName={`p-3 col-12 col-md-6 col-lg-3`} slug={"beauty"} />
                </div>
                <div className="pagebody">
                    <TitleComponent heading={"Most Popular"} />
                    {/* <NewProducts heading={"Most Popular"} productsdata={products} parentClassName={"mt-2"} hidePopTool={true} /> */}
                    <div className="container py-4 row justify-content-center gap-5">
                        <OfferBanner type={1} />
                    </div>

                    <DiscountComponent />
                    {slug === "" && <SwiperComponent />}
                </div>
            </div>
        </>
    )
}

export default HomePage