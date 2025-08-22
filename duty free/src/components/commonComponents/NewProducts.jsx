import { useEffect, useState } from 'react'
import { FreeMode, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { apiRequest } from '../../commonMethod/common';
import ProductCard from './ProductCard';
const NewProducts = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await apiRequest("GET", "/products", { page: 1 });
            setProducts(data?.products)
        };
        fetchProducts();
    }, [])
    return (
        <div className='container'>
            <p className='mb-5 linear-bg px-3 py-2 secondary-text-color'>New products</p>
            <Swiper
                slidesPerView={5}
                spaceBetween={50}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                freeMode={true}
                navigation={true}
                modules={[Autoplay, FreeMode, Navigation]}
                className="product-swiper"
            >
                {products.map((item) => {
                    return (
                        <SwiperSlide>
                            <ProductCard data={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default NewProducts