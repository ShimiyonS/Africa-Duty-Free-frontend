import { FreeMode, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';
const NewProducts = ({ heading, productsdata, parentClassName }) => {

    return (
        <div className={`container ${parentClassName}`}>
            <p className='mb-5 product-wrapper-title linear-bg px-3 py-2 secondary-text-color'>{heading}</p>
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
                    426: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    900: {
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
                {productsdata?.map((item) => {
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