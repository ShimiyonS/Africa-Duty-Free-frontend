import { FreeMode, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import swipperImg1 from '../../assets/swipper1.png'
import swipperImg2 from '../../assets/swipper2.png'
import swipperImg3 from '../../assets/swipper3.png'
import swipperImg4 from '../../assets/swipper1.png'
import swipperImg5 from '../../assets/swipper1.png'
import swipperImg6 from '../../assets/swipper1.png'
import swipperImg7 from '../../assets/swipper1.png'

const SwiperComponent = () => {
    const brands = [
        { img: swipperImg1, heading: "Gift from Helena Rubinstein", para: "exclusive festive offers & receive a 5-pc exclusive festive gift set * when you spend S$1,850 or more", stock: "While stock" },
        { img: swipperImg2, heading: "Mascara 30% less", para: "exclusive festive offers & receive a 5-pc exclusive festive gift set * when you spend S$1,850 or more", stock: "While stock" },
        { img: swipperImg3, heading: "Versace new line", para: "exclusive festive offers & receive a 5-pc exclusive festive gift set * when you spend S$1,850 or more", stock: "While stock" },
        { img: swipperImg4, heading: "Gift from Helena Rubinstein", para: "exclusive festive offers & receive a 5-pc exclusive festive gift set * when you spend S$1,850 or more", stock: "While stock" },
        { img: swipperImg5, heading: "Gift from Helena Rubinstein", para: "exclusive festive offers & receive a 5-pc exclusive festive gift set * when you spend S$1,850 or more", stock: "While stock" },
        { img: swipperImg6, heading: "Gift from Helena Rubinstein", para: "exclusive festive offers & receive a 5-pc exclusive festive gift set * when you spend S$1,850 or more", stock: "While stock" },
        { img: swipperImg7, heading: "Gift from Helena Rubinstein", para: "exclusive festive offers & receive a 5-pc exclusive festive gift set * when you spend S$1,850 or more", stock: "While stock" }
    ]

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-between mb-3 offer-swipper">
                <h3 className="justuspro-medium">Special offers</h3>
                <h3 className="justuspro-medium d-none d-md-block">Special Billing Beauty Product</h3>
            </div>
            <div className="offer-banner-swiper">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
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
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    freeMode={true}
                    navigation={true}
                    modules={[Autoplay, FreeMode, Navigation]}
                    className=""
                >
                    {brands.map((item) => {
                        return (
                            <SwiperSlide className="new-swipper">
                                <div className="pb-3 d-flex justify-content-center flex-column align-items-center ">
                                    <img src={item.img} alt="slider-img" className="slider-main-image" />
                                    <div className="mt-2 ps-4">
                                        <h5 className="dmsans-bold text-color-danger m-0">{item.heading}</h5>
                                        <p className="text-color-danger m-0 swipper-paragraph">{item.para}</p>
                                        <span className="text-color-danger stock-font" >{item.stock}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div >
    )
}

export default SwiperComponent