import React, { useEffect, useState } from 'react'
import NewProducts from '../components/commonComponents/NewProducts'
import Common from '../commonMethod/Common'
import Banner1 from "../assets/homebanner1.jpeg"
const MainPage = () => {
    const { apiRequest } = Common()
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await apiRequest("GET", "/products", { page: 1 });
            setProducts(data?.products)
        };
        fetchProducts();
    }, [])
    return (
        <div>
            <NewProducts hideWishlist heading={"Most Popular"} productsdata={products} parentClassName={"mt-5"} headingClassName={"product-heading"} swiperClassName="product-swiper most-popular" />
            <div className='d-flex align-items-center col-12 col-lg-6 mx-auto '>
                <div className='col-12 col-md-6 col-lg-4 rounded-5 overflow-hidden'>
                    <div className='secondary-bg'>
                        <img src={Banner1} className='w-100' />
                        <div className='p-3'>
                            <p className='main-home-category secondary-text-color'>Discover Scents That Elevate Your Journey.</p>
                            <h4 className='secondary-text-color main-home-category-heading'>Fragrances</h4>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-4'></div>
                <div className='col-12 col-md-6 col-lg-4'></div>
            </div>
        </div>
    )
}

export default MainPage