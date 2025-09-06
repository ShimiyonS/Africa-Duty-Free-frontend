import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import 'swiper/css';
import Common from "../commonMethod/Common.js";
import '../Styles/product-details.css'
import { CiHeart } from "react-icons/ci";
import Bag from '../assets/product-bag.png'
import { BsShare } from "react-icons/bs";
import { SlSocialFacebook } from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";
import { FaGooglePlusG } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { ImStumbleupon } from "react-icons/im";
import { FaWhatsapp } from "react-icons/fa";
import { FaGetPocket } from "react-icons/fa";
import { BsEnvelopePaperFill } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa6";
import { IoIosShareAlt } from "react-icons/io";
import { MdFullscreen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiMinimize } from "react-icons/fi";
import Products from '../components/commonComponents/Products'
import Loader from "../components/commonComponents/loader/loader.jsx";
import { GoZoomIn } from "react-icons/go";
import { Link } from 'react-router-dom'
import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";
import BreadCrumb from "../components/commonComponents/BreadCrumb.jsx";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

const ProductDetails = () => {
    const { apiRequest } = Common()
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [activeTab, setActiveTab] = useState("description");
    const [open, setOpen] = useState(false);
    const imgRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [relatedData, setRelatedData] = useState(null)
    const [loading, setLoading] = useState(false)
    const BASEURL = import.meta.env.VITE_APP_BASE_URL;
    const [rating, setRating] = useState(false)
    const [mainImg, setMainImg] = useState('')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const data = await apiRequest("GET", `products/${id}`)
                const related = await apiRequest("GET", `products`)
                setRelatedData(related)
                setProduct(data);
                setMainImg(data.images[0])
                setLoading(false)
            } catch (error) {
                console.error("api fetching error", error)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct();
    }, [id])

    const handleMainimgChange = (img) => {
        setMainImg(img)
    }

    // Fullscreen function
    const handleFullscreen = () => {
        if (imgRef.current) {
            if (imgRef.current.requestFullscreen) {
                imgRef.current.requestFullscreen();
            } else if (imgRef.current.webkitRequestFullscreen) {
                imgRef.current.webkitRequestFullscreen();
            } else if (imgRef.current.msRequestFullscreen) {
                imgRef.current.msRequestFullscreen();
            }
        }
    };

    // Exit fullscreen function
    const handleExitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    // fullscreen change detect
    useEffect(() => {
        const handleChange = () => {
            if (document.fullscreenElement) {
                setIsFullscreen(true);
            } else {
                setIsFullscreen(false);
            }
        };

        document.addEventListener("fullscreenchange", handleChange);
        document.addEventListener("webkitfullscreenchange", handleChange);
        document.addEventListener("msfullscreenchange", handleChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleChange);
            document.removeEventListener("webkitfullscreenchange", handleChange);
            document.removeEventListener("msfullscreenchange", handleChange);
        };
    }, []);


    const handleCount = (type) => {
        if (type == "increment") {
            setProduct((prev) => ({
                ...prev,
                ["minimumOrderQuantity"]: Number(prev?.minimumOrderQuantity) + 1
            }))
        }
        else {
            setProduct((prev) => ({
                ...prev,
                ["minimumOrderQuantity"]: Number(prev?.minimumOrderQuantity) - 1
            }))
        }

    }

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    //download image in popup
    const handleDownloadImage = (downloadImage) => {
        if (!downloadImage) return;
        fetch(downloadImage)
            .then((res) => res.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${product?.title || "product-image"}.png`;
                a.click();
                window.URL.revokeObjectURL(url);
            });
    };

    return (
        <div className="container">
            {/* pop-up-img */}
            {open && (
                <div className="popup-overlay" onClick={() => setOpen(false)}>
                    <div className="popup-wrapper" ref={imgRef} onClick={(e) => e.stopPropagation()}>
                        {/* Fullscreen button */}
                        <div className="share-icon">
                            <IoIosShareAlt />
                            <div className="share-tooltip bg-color-primary">
                                <Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)}`} className="share-facebook text-decoration-none p-2">
                                    Share on Facebook
                                </Link>
                                <Link to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product?.id)}&url=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)}`} className="share-twitter text-decoration-none p-2">                                    Tweet</Link>
                                <Link to={`http://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)} `} className="share-pinterest text-decoration-none p-2">
                                    Pin it
                                </Link>
                                <p className="share--download text-decoration-none p-2 text-black" onClick={() => handleDownloadImage(mainImg)} >
                                    Download image
                                </p>
                            </div>
                        </div>
                        <button className="fullscreen-btn" onClick={isFullscreen ? handleExitFullscreen : handleFullscreen}>
                            {!isFullscreen ? <MdFullscreen /> : <FiMinimize />}
                        </button>
                        <button className="close-btn" onClick={() => setOpen(false)}><IoMdClose /></button>
                        <div className="popup-wrapper" >
                            <div className="popup-content">
                                <img src={mainImg} alt="pop-up-img" />
                            </div>
                            <p className="pt-5 text-color-secondary text-center">{product?.title}</p>
                        </div>
                    </div>
                </div>
            )
            }
            <>
                {loading ?
                    <Loader /> :
                    <>
                        <BreadCrumb navigation={[{ key: "home", nav: "/" }, { key: `${product?.category}`, nav: `/product-category/${product?.category}` }]} />
                        <div className="d-flex flex-wrap align-items-center justify-content-center product-wrapper pb-5 ">
                            
                            <div className="col-12 col-md-8 col-lg-6 d-flex flex-column" >
                                <div className="position-relative">
                                    <img src={mainImg} alt={product?.title} className="product-img w-100" />
                                    <div className="position-absolute zoom-wrapper  " onClick={() => setOpen(true)}>
                                        <GoZoomIn className="zoom-img" />
                                    </div>
                                </div>

                                {product?.images?.length > 4 ?
                                    <div className="container mx-auto">
                                        <Swiper
                                            slidesPerView={4}

                                            freeMode={true}
                                            navigation={true}
                                            modules={[FreeMode, Navigation]}
                                            className={`${"product-swiper"}`}
                                        >
                                            {product?.images?.map((item, index) => {
                                                return (
                                                    <SwiperSlide>
                                                        <div className=""><img onMouseEnter={() => handleMainimgChange(item)} src={item} alt={product?.title} className="product-gallary-img w-100" /></div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                        </Swiper>
                                    </div>
                                    :
                                    <>
                                        <div className="d-flex flex-wrap">
                                            {product?.images?.map((item, index) => (
                                                <div className="col-3"><img onMouseEnter={() => handleMainimgChange(item)} src={item} alt={product?.title} className="product-gallary-img w-100" /></div>
                                            ))}
                                        </div>
                                    </>
                                }
                            </div>
                            
                            <div className="col-12 col-md-4 col-lg-6">
                                <div className="mb-3">
                                    <h2 className="product-page-title justuspro-bold">{product?.title}</h2>
                                </div>
                                <p className="pb-2 product-single-price text-color-danger text-break dmsans-bold">${product?.price}</p>
                                <p className="product-description text-break">{product?.description}</p>
                                <div className="d-flex flex-wrap gap-3">
                                    <div className="d-flex rounded-5 increment-wrapper align-items-center flex-wrap ">
                                        <button onClick={() => handleCount("")} className=" border-0 text-center p-0 bg-transparent text-color-gold" disabled={product?.minimumOrderQuantity === 1}>-</button>
                                        <input type="number" name="minimumOrderQuantity" onChange={(e) => { handleChange(e) }} min={1} className="border-0 text-center p-0 input-hide-arrow dmsans-bold" value={Number(product?.minimumOrderQuantity)} />
                                        <button onClick={() => handleCount("increment")} className=" border-0 text-center p-0 bg-transparent text-color-gold" disabled={product?.minimumOrderQuantity === 100}>+</button>
                                    </div>
                                    <div >
                                        <button type="submit" name="add-to-cart" className="add-cart rounded-5 border-0 button-bg-gold d-flex justify-content-center align-items-center" ><span className="text-color-secondary pe-4 dmsans-bold">Add to cart</span>  <img src={Bag} alt="bag" className="product-bag " /></button>

                                    </div>

                                </div>


                                <div className="d-flex align-items-md-center flex-column flex-md-row pt-5 gap-3">
                                    <div className="rounded-5 wishlist p-2 d-flex justify-content-center align-items-center py-3">
                                        <span type="submit" name="add-to-cart" className="add-wishlist rounded-5 border-0 px-4 py-2 dmsans-bold" >Add to wishlist</span> <CiHeart size={30} />
                                    </div>
                                    <div className="position-relative share-content" >
                                        <div className="gap-3 share-emoji  p-3 rounded-5"><Link to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)}`}><SlSocialFacebook /></Link>
                                            <Link to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product?.id)}&url=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)}`}><TfiTwitter /></Link>
                                            <Link to={`https://plus.google.com/share?url=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)}`}> <FaGooglePlusG /></Link>
                                            <Link to={`http://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)} `}><FaPinterestP /></Link>
                                            <Link to={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)} `}><FaLinkedinIn /></Link>
                                            <Link to={`http://www.stumbleupon.com/submit?url=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)} `}><ImStumbleupon /></Link>
                                            <Link to={`whatsapp://send?text=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)} `}><FaWhatsapp /></Link>
                                            <Link to={`https://getpocket.com/save?url${encodeURIComponent(`${BASEURL}/product/${product?.id}`)} `}><FaGetPocket /></Link>
                                            <Link to={`mailto:?subject=${encodeURIComponent(product?.id)}&body=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)}`}><BsEnvelopePaperFill /> </Link>
                                            <Link to={`tg://msg?text=${encodeURIComponent(`${BASEURL}/product/${product?.id}`)}`}><FaRegPaperPlane /></Link>
                                        </div>
                                        <span className="pe-2 dmsans-bold">Share</span>
                                        <BsShare />
                                    </div>
                                </div>

                                <div className="d-flex gap-4  align-items-center pt-4 ">
                                    <h4 className="justuspro-bold ">Categories</h4>
                                    <div className="d-flex align-items-center">
                                        {Array.isArray(product?.category) ? (
                                            product.category.map((cat, index) => (
                                                <Link to={`/product-category/${product?.category}`} className="text-decoration-none" key={index}>
                                                    {cat}{index !== product.category.length - 1 && ", "}
                                                </Link>
                                            ))
                                        ) : (
                                            <Link to={`/product-category/${product?.category}`} className="text-decoration-none text-color-muted">{product?.category}</Link>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex gap-1">
                                    <span class="posted_in">Brand:</span> <Link to={`/brand/${product?.brand}`} className="text-decoration-none text-color-danger dmsans-bold">{product?.brand ? product?.brand : "no brand"}</Link>
                                </div>
                            </div>

                        </div>
                        <div className="container pt-5 ">
                            <div className="product-description-bottom rounded-5 overflow-hidden col-sm-12 col-md-12 col-lg-12">
                                <div className=" bg-color-gold  d-flex justify-content-center">
                                    <div className="d-flex gap-5">
                                        <h5
                                            className={`py-3 text-color-secondary justuspro-regular ${activeTab === "description" ? " active-tab m-0" : ""}`}
                                            onClick={() => setActiveTab("description")}
                                        >
                                            Description
                                        </h5>
                                        <h5
                                            className={`py-3 text-color-secondary justuspro-regular${activeTab === "review" ? " active-tab m-0" : ""}`}
                                            onClick={() => setActiveTab("review")}
                                        >
                                            Review
                                        </h5>
                                    </div>
                                </div>

                                {activeTab === "review" &&
                                    <div className="text-center product-description-details p-5">
                                        <div className="pb-4 ">
                                            <h2 className="review-header justuspro-medium">Be the first to Review “Veuve Clicquot Yellow Label Brut White 0.75L”</h2>
                                            <p className=" m-0 text-start product-email-content text-color-muted">Your email address will not be published. Required fields are marked *</p>
                                            <div className="d-flex pt-5 gap-3">
                                                <p className="text-start dmsans-bold ">Your Rating</p>
                                                <div className="flex gap-2 text-2xl">
                                                    {[1, 2, 3, 4, 5].map((num) => (
                                                        <span key={num} onClick={() => setRating(num)}>
                                                            {num <= rating ? (
                                                                <IoStar className="text-color-danger" />
                                                            ) : (
                                                                <IoStarOutline className="text-color-danger" />
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-main-div">
                                            <form className="  rounded-4 pb-3">
                                                <div className="row mb-3">
                                                    <div className="col-md-6 mb-3 mb-md-0">
                                                        <input
                                                            type="text"
                                                            placeholder="Name *"
                                                            className="form-control product-text-input p-3 rounded-5"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <input
                                                            type="email"
                                                            placeholder="Email *"
                                                            className="form-control product-text-input p-3 rounded-5"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <textarea
                                                        placeholder="Your review *"
                                                        className="form-control product-text-area p-3 rounded-4"
                                                        rows="6"
                                                        required

                                                    ></textarea>
                                                </div>

                                                <div className="text-end">
                                                    <button
                                                        type="submit"
                                                        className="px-5 py-2 rounded-5 product-submit text-color-secondary button-bg-gold  dmsans-bold"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                            <hr className="border-dark  opacity-100" />
                                        </div>
                                    </div>
                                }

                                <div className="review-section ps-4 ps-md-5 mb-5">
                                    {activeTab === "description" ? (
                                        <p className="ps-0 ps-md-5 pt-3">{product?.description}</p>
                                    ) : (
                                        <div className=" ps-0 ps-md-5">
                                            <div >
                                                <h3 className="justuspro-bold">Reviews</h3>
                                                {product?.reviews?.length > 0 ? (
                                                    product.reviews.map((rev, i) => (
                                                        <div key={i} className="pb-3">
                                                            <p>Rating : {rev.rating}</p>
                                                            <p>Comment : {rev.comment}</p>
                                                            <p>Date : {rev.date}</p>
                                                            <p>name : {rev.reviewerName}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No data</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <Products data={relatedData?.products?.slice(0, 4)} hidePagnation={true} headingText="Related Products" paraClassName="justuspro-bold text-center text-color-primary related-single-post-heading" gridplacement="product-grid-4" imageheight={325} hidePopTool={true} />
                        </div>
                    </>}
            </>
        </div >
    )
}
export default ProductDetails