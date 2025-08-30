import React, { useEffect, useState } from 'react'
import "../Styles/main.css"
import NewProducts from '../components/commonComponents/NewProducts'
import Common from '../commonMethod/Common'
import Banner1 from "../assets/homebanner1.jpeg"
import Banner2 from "../assets/homebanner2.jpeg"
import Banner3 from "../assets/homebanner3.jpeg"
import AdBanner1 from "../assets/mainpagead1.jpg"
import AdBanner2 from "../assets/mainpagead2.webp"
import Video from "../assets/mainpagevideo.mp4"
import Women from "../assets/women.png"
import BlinkOne from "../assets/blinkfragence.png"
import BlinkTwo from "../assets/blinkbottle.png"
import BlinkThree from "../assets/blinkbottlesmall.png"
import BlinkFour from "../assets/blinkbottlelarge.png"
import { Link } from 'react-router-dom'
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
            <div class="video-background container">
                <img src={BlinkOne} className='zoom-fade' />
                <img src={BlinkTwo} className='zoom-fade' />
                <img src={BlinkThree} className='zoom-fade' />
                <img src={BlinkFour} className='zoom-fade' />

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={Video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div class="d-flex flex-wrap h-100 align-items-center">
                    <div className="col-12 col-md-4 col-lg-4 p-3 p-lg-5 h-100 d-flex main-banner-item align-items-start">
                        <div>
                            <p className=' text-color-secondary main-banner-heading justuspro-regular'>30% vs high street prices shop duty free & pick up at our airport locations</p>
                            <Link to="/shop" className='d-inline-block text-decoration-none d-md-none  mt-3 offer-link  mt-5  text-color-secondary rounded-5'>Shop Now</Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 h-100 main-banner-item d-flex align-items-end ">
                        <img src={Women} className='w-100 d-block align-self-end' />
                    </div>
                    <div className="col-12 col-md-4 col-lg-4  h-100  main-banner-item d-flex align-items-end p-3 p-lg-5">
                        <div>
                            <p className=' text-color-secondary  main-banner-heading justuspro-regular'>30% vs high street prices shop duty free & pick up at our airport locations</p>
                            <Link to="/shop" className='d-inline-block text-decoration-none mt-3 offer-link bg-color-danger dmsans-bold mt-5  text-color-secondary rounded-5'>Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>

            <NewProducts hideWishlist heading={"Most Popular"} productsdata={products} parentClassName={"mt-5"} headingClassName={"product-heading"} swiperClassName="product-swiper  rounded-5 most-popular" />
            <div className='d-flex flex-wrap align-items-center col-12 col-lg-7 mx-auto my-5 '>
                <div className='col-12 col-md-6 col-lg-4 p-2 '>
                    <div className='bg-color-secondary main-category-wrapper overflow-hidden'>
                        <img src={Banner1} className='w-100 main-category-image' />
                        <div className='p-4'>
                            <p className='main-home-category text-color-secondary'>Discover Scents That Elevate Your Journey.</p>
                            <h4 className=' main-home-category-heading justuspro-medium text-color-secondary'>Fragrances</h4>
                            <Link to="/africa-best-buy/product-category/fragrances" className='text-decoration-none  d-inline-block  text-color-secondary main-page-category-link dmsans-bold'>Shop now</Link>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-4 p-2'>
                    <div className='bg-color-secondary main-category-wrapper overflow-hidden'>
                        <img src={Banner2} className='w-100 main-category-image' />
                        <div className='p-4'>
                            <p className='main-home-category text-color-secondary'>Radiance Redefined with Duty-Free Cosmetics.</p>
                            <h4 className=' main-home-category-heading justuspro-medium text-color-secondary'>Cosmetics</h4>
                            <Link to="/africa-best-buy/product-category/cosmetics" className='text-decoration-none  d-inline-block  text-color-secondary main-page-category-link dmsans-bold'>Shop now</Link>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-4 p-2 '>
                    <div className='bg-color-secondary main-category-wrapper overflow-hidden'>
                        <img src={Banner3} className='w-100 main-category-image' />
                        <div className='p-4'>
                            <p className='main-home-category text-color-secondary'>Indulge in your favorite spirits with exclusive duty-free.</p>
                            <h4 className='  main-home-category-heading justuspro-medium text-color-secondary'>Liqueur</h4>
                            <Link to="/africa-best-buy/product-category/liqueur" className='text-decoration-none  d-inline-block  text-color-secondary main-page-category-link dmsans-bold'>Shop now</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container p-0 ad-left'>
                <div className='d-flex mt-5 flex-wrap align-items-center'>
                    <div className="col-12 col-md-6 col-lg-6 ">
                        <div className=''>
                            <h1 className='px-3 pt-5 main-offer-heading justuspro-bold  '>Great value offers</h1>
                            <p className='px-3 main-offer-sub-heading'>Shop your favourite brands at great prices</p>
                            <img src={AdBanner1} className=' w-100 main-offer-image-left' />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 ">
                        <p className='main-page-ad-right' >Fragrance from £19.95</p>
                        <p className='main-page-ad-right'>Up to 40% off Selected Fragrance vs the Average South Africa High Street Price</p>
                        <p className='main-page-ad-right'>Great value savings on watches and jewellery</p>
                        <p className='main-page-ad-right'>Sweets and treats</p>
                    </div>
                </div>
            </div>
            <div className='container p-0 ad-right'>
                <div className='d-flex mb-5 flex-wrap align-items-center '>
                    <div className="col-12 col-md-6 col-lg-6 p-4">
                        <div className=''>
                            <p className='main-page-ad-right border-0 m-0' >Up to 20% off Sunglasses</p>
                            <p className='main-page-ad-right border-0 m-0' >Enjoy great savings vs the RRP on a range of designer shades including Ray-Ban, Oakley and Prada.</p>
                            <Link to="/product-category/accessories" className='text-decoration-none offer-link mt-5  text-color-secondary bg-color-danger dmsans-bold rounded-5'>Shop Savings</Link>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 ">
                        <img src={AdBanner2} className=' w-100 main-offer-image-right' />
                    </div>
                </div>
            </div>
            <NewProducts hideWishlist heading={"Only for travellers"} productsdata={products} parentClassName={"mt-5"} headingClassName={"product-heading"} swiperClassName="product-swiper  rounded-5 most-popular" hideAddCartPop />
            <div className='container my-5 py-5'>
                <div className='d-flex align-items-center flex-wrap '>
                    <div className="col-12 col-lg-3 col-md-6 py-2 d-flex justify-content-md-center align-items-center our-wrapper  ">
                        <div className=' '>
                            <p className='our-style mb-0  text-start  text-color-primary justuspro-bold'>Secure Payment</p>
                            <p className='our-style-sub mb-0 text-start '>All Cards Accepted</p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-md-6 py-2 d-flex justify-content-md-center align-items-center our-wrapper   ">
                        <div className=' '>
                            <p className='our-style mb-0  text-start  text-color-primary justuspro-bold'>Collect</p>
                            <p className='our-style-sub mb-0 text-start' >On All Orders</p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-md-6 py-2 d-flex  justify-content-md-center align-items-center our-wrapper   ">
                        <div className=' '>
                            <p className='our-style mb-0 text-start  text-color-primary justuspro-bold'>Online Support</p>
                            <p className='our-style-sub mb-0 text-start '>Technical 24/7</p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-md-6 py-2 d-flex justify-content-md-center align-items-center our-wrapper   ">
                        <div className=' '>
                            <p className='our-style mb-0  text-start  text-color-primary justuspro-bold'>Big Saving</p>
                            <p className='our-style-sub mb-0 text-start'>Weekend Sales</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default MainPage