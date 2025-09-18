import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Brand1 from "../../assets/banner1.png";
import Brand2 from "../../assets/banner2.png";
import Brand3 from "../../assets/banner3.png";
import Brand4 from "../../assets/banner4.png";
import Brand5 from "../../assets/banner5.png";
import Brand6 from "../../assets/banner6.png";
import Brand7 from "../../assets/banner7.png";
import Brand8 from "../../assets/banner8.png";
import Brand9 from "../../assets/banner9.png";
import Brand10 from "../../assets/banner10.png";
import Brand11 from "../../assets/banner11.png";
import Brand12 from "../../assets/banner12.png";
import Brand13 from "../../assets/banner13.png";
import Brand14 from "../../assets/banner14.png";
import Brand15 from "../../assets/banner15.png";
import Brand16 from "../../assets/banner16.png";
import Brand17 from "../../assets/banner17.png";
import common from '../../commonMethod/common';


const BrandSwiper = () => {
    const { brandItems } = common();
    const brands = [
        Brand1, Brand2, Brand3, Brand4, Brand5,
        Brand6, Brand7, Brand8, Brand9, Brand10,
        Brand11, Brand12, Brand13, Brand14, Brand15,
        Brand16, Brand17,
    ];
    return (
        <div className=''>
            <Swiper
                slidesPerView={6}
                spaceBetween={10}
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
                        slidesPerView: 8,
                        spaceBetween: 2,
                    },
                }}
                freeMode={true}
                modules={[Autoplay, FreeMode]}
                className="brand-swiper"
            >
                {brands.map((item) => {
                    return (
                        <SwiperSlide><img src={item} /></SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}

export default BrandSwiper