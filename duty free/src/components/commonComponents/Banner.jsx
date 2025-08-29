import React from 'react'
import HomeBanner2 from "../../assets/home-banner-2.png"
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className='position-relative'>
            <div className="home-banner ">
                <div className="col-12 col-md-7 col-lg-8 h-100">
                    <div className='d-flex flex-column justify-content-end h-100'>
                        <h3 className='text-start banner-heading justuspro-regular text-color-secondary'>duty free</h3>
                        <h3 className='text-start banner-heading justuspro-regular text-color-secondary'>30%</h3>
                        <h3 className='text-start banner-heading justuspro-regular text-color-secondary'>less <span className='text-color-secondary'>on high street prices</span></h3>
                        <Link to="/shop" className="rounded-5 text-decoration-none text-color-primary mt-3 border-0 px-4 py-2 shop-left-btn d-none button-bg-primary dmsans-medium">Shop Now</Link>
                        <img src={HomeBanner2} width={200} height={200} alt="homebanner" className='home-banner-image' />
                    </div>
                </div>
                <div className="col-12 col-md-5 col-lg-4 h-100 right-side-banner">
                    <div className='d-flex flex-column  align-items-start justify-content-center h-100'>
                        <h3 className='banner-right-heading text-color-secondary justuspro-regular'>the good life</h3>
                        <h3 className='banner-right-heading text-color-secondary justuspro-regular'>the best brands</h3>
                        <h3 className='banner-right-heading text-color-secondary justuspro-regular'>real value duty free</h3>
                        <Link to="/shop" className="rounded-5 text-decoration-none text-color-primary  mt-3 border-0 px-4 py-2 shop-btn button-bg-primary dmsans-medium">Shop Now</Link>
                    </div>
                </div>
            </div>
            <div className="wigited-buttons text-color-secondary position-absolute w-100 d-flex gap-3 justify-content-center">
                <div className="wigited-box">Exclusive for Diplomats</div>
                <div className="wigited-box">For Duty-free Operators</div>
            </div>

        </div>

    )
}

export default Banner