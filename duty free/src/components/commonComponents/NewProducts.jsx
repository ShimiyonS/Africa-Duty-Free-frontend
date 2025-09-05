import { FreeMode, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from './ProductCard';
const NewProducts = ({ heading, productsdata, parentClassName, headingClassName, swiperClassName, hideWishlist = false, hidePopTool = false, hideCart = false, hideAddCartPop = false, titleclassname = "text-color-primary", priceclassname = "text-color-danger" }) => {
    return (
        <div className={`container ${parentClassName}`}>
            {/* <p className={`${headingClassName ? headingClassName : 'mb-4 justuspro-medium linear-bg-heading px-3 py-2 text-color-secondary'} `}>{heading}</p> */}
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 2700,
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
                className={`${swiperClassName ? swiperClassName : "product-swiper "}`}
            >
                {productsdata?.map((item) => {
                    return (
                        <SwiperSlide>
                            <ProductCard data={item} hideWishlist={hideWishlist} hidePopTool={hidePopTool} hideCart={hideCart} hideAddCartPop={hideAddCartPop} titleclassname={titleclassname} priceclassname={priceclassname} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default NewProducts