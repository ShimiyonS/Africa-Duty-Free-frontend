import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import Common from "../commonMethod/Common.js";
import '../Styles/product-details.css'
import { Rating } from 'react-simple-star-rating'
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
import ZoomImg from '../assets/zoom-dark.svg'
import { IoIosShareAlt } from "react-icons/io";
import { MdFullscreen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiMinimize } from "react-icons/fi";
import { saveAs } from 'file-saver';
import Products from '../components/commonComponents/Products'
import Loader from "../components/commonComponents/loader/loader.jsx";
import { GoZoomIn } from "react-icons/go";

const ProductDetails = () => {
    const { apiRequest } = Common()
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [count, setCount] = useState(1)
    const [activeTab, setActiveTab] = useState("description");
    const [rating, setRating] = useState(4)
    const [open, setOpen] = useState(false);
    const imgRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [relatedData, setRelatedData] = useState(null)
    const [loading, setLoading] = useState(false)
    const BASEURL = import.meta.env.VITE_APP_BASE_URL;
    const imageUrl = product?.images?.[0]
    const fileName = 'my-downloaded-image.jpg';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const data = await apiRequest("GET", `products/${id}`)
                const related = await apiRequest("GET", `products`)
                setRelatedData(related)
                setProduct(data);
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
    console.log(product)

    //for rating star 
    const handleRating = (rate) => {
        setRating(rate)
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

    // download img function
    const handleDownload = () => {
        saveAs(imageUrl, fileName);
    };

    const handleCount = (type) => {
        if (type == "increment") {
            setProduct((prev) => ({
                ...prev,
                ["minimumOrderQuantity"]: prev?.minimumOrderQuantity + 1
            }))
        }
        else {
            setProduct((prev) => ({
                ...prev,
                ["minimumOrderQuantity"]: prev?.minimumOrderQuantity - 1
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

    return (
        <div className="container">
            {/* pop-up-img */}
            {open && (
                <div className="popup-overlay" onClick={() => setOpen(false)}>
                    <div className="popup-wrapper" ref={imgRef} onClick={(e) => e.stopPropagation()}>
                        {/* Fullscreen button */}
                        <div className="share-icon">
                            <IoIosShareAlt />
                            <div className="share-tooltip">
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                        `${BASEURL}/product/${product.title}`
                                    )}`}
                                    target="_blank"
                                    className="share-facebook text-decoration-none p-2">
                                    Share on Facebook
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.title)}&url=${encodeURIComponent(`${BASEURL}/product/${product.title}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-twitter text-decoration-none p-2" >Tweet</a>
                                <a
                                    href={`http://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
                                        `${BASEURL}/product/${product.title}`
                                    )}&media=${encodeURIComponent(product.thumbnail)}&description=${encodeURIComponent(product.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="share-pinterest text-decoration-none p-2"
                                >
                                    Pin it
                                </a>
                                <p href="" target="_blank" className="share--download text-decoration-none p-2 text-black" onClick={handleDownload}>Download image</p>
                            </div>
                        </div>
                        <button className="fullscreen-btn" onClick={isFullscreen ? handleExitFullscreen : handleFullscreen}>
                            {!isFullscreen ? <MdFullscreen /> : <FiMinimize />}
                        </button>
                        <button className="close-btn" onClick={() => setOpen(false)}><IoMdClose /></button>
                        <div className="popup-wrapper" >
                            <div className="popup-content">
                                <img src={product?.images?.[0]} alt="pop-up-img" />
                            </div>
                            <p className="pt-5 product-title-end text-center">{product?.title}</p>
                        </div>
                    </div>
                </div>
            )}
            <>
                {loading ?
                    <Loader /> :
                    <>
                        <div className="d-flex flex-wrap align-items-center justify-content-center product-wrapper pb-5 ">
                            <div className="col-12 col-md-8 col-lg-6 position-relative" >
                                <img src={product?.thumbnail} alt={product?.title} className="product-img w-100" />
                            </div>
                            <div className="col-12 col-md-4 col-lg-6">
                                <div className="position-relative mb-3">
                                    <h2 className="product-page-title  text-color-primary  justuspro-medium">{product?.title}</h2>
                                    <div className="position-absolute zoom-wrapper  " onClick={() => setOpen(true)}>
                                        <GoZoomIn className="zoom-img" />
                                    </div>
                                </div>
                                <p className="pb-2 product-price text-break justuspro-regular">${count * product?.price}</p>
                                <p className="product-description text-break">{product?.description}</p>
                                <div className="d-flex flex-wrap gap-3">
                                    <div className="d-flex rounded-5 increment-wrapper align-items-center flex-wrap ">
                                        <button onClick={() => handleCount("increment")} className="decrement-btn border-0 text-center p-0 bg-transparent" disabled={count === 0}>-</button>
                                        <input type="number" name="minimumOrderQuantity" onChange={(e) => { handleChange(e) }} min={"1"} className="border-0 text-center p-0 input-hide-arrow" value={product?.minimumOrderQuantity} />
                                        <button onClick={() => handleCount("increment")} className="increment-btn border-0 text-center p-0 bg-transparent" >+</button>
                                    </div>
                                    <div className="">
                                        <button type="submit" name="add-to-cart" className="add-cart rounded-5 border-0 position-relative" >Add to cart</button>
                                        <img src={Bag} alt="bag" className="product-bag" />
                                    </div>

                                </div>


                                <div className="d-flex align-items-md-center flex-column flex-md-row pt-5 gap-3">
                                    <div className="rounded-5 wishlist p-2 d-flex justify-content-center align-items-center py-3">
                                        <span type="submit" name="add-to-cart" className="add-wishlist rounded-5 border-0 px-4 py-2" >Add to wishlist</span> <CiHeart size={30} />
                                    </div>
                                    <div className="position-relative share-content" >
                                        <div className="gap-3 share-emoji p-3 rounded-5"><SlSocialFacebook /><TfiTwitter /><FaGooglePlusG /><FaPinterestP /><FaLinkedinIn /><ImStumbleupon /><FaWhatsapp /><FaGetPocket /><BsEnvelopePaperFill /><FaRegPaperPlane /></div>
                                        <span className="pe-2 ">Share</span>
                                        <BsShare />
                                    </div>
                                </div>

                                <div className="d-flex gap-4  align-items-center pt-4 ">
                                    <h4>Categories</h4>
                                    <div className="d-flex align-items-center">
                                        {Array.isArray(product?.category) ? (
                                            product.category.map((cat, index) => (
                                                <span key={index}>
                                                    {cat}{index !== product.category.length - 1 && ", "}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="product-category">{product?.category}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <span class="posted_in">Brand: <a href="" rel="tag" className="text-decoration-none brand-anker-tag">{product?.brand}</a></span>
                                </div>
                            </div>

                        </div>
                        <div className="container pt-5 ">
                            <div className="product-description-bottom rounded-5 overflow-hidden col-sm-12 col-md-12 col-lg-12">
                                <div className="product-description-inner d-flex justify-content-center">
                                    <div className="d-flex gap-5">
                                        <h5
                                            className={`py-3 review-and-description ${activeTab === "description" ? "fw-bold active-tab m-0" : ""}`}
                                            onClick={() => setActiveTab("description")}
                                        >
                                            Description
                                        </h5>
                                        <h5
                                            className={`py-3 review-and-description ${activeTab === "review" ? "fw-bold active-tab m-0" : ""}`}
                                            onClick={() => setActiveTab("review")}
                                        >
                                            Review
                                        </h5>
                                    </div>
                                </div>

                                {activeTab === "review" &&
                                    <div className="text-center product-description-details p-5">
                                        <div className="pb-4 ">
                                            <h2 className="review-header">Be the first to Review “Veuve Clicquot Yellow Label Brut White 0.75L”</h2>
                                            <p className=" m-0 text-start product-email-content">Your email address will not be published. Required fields are marked *</p>
                                            <div className="d-flex pt-5 gap-3">
                                                <p className="fw-bold text-start ">Your Rating</p>
                                                <Rating onClick={handleRating} initialValue={rating} size={20} fillColor="var(--color-red)" />
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
                                                        className="px-5 py-2 rounded-5 product-submit "
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
                                                <h3>Reviews</h3>
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
                        <Products data={relatedData?.products} headingText="Related Products" className="pt-5" />
                    </>}
            </>
        </div >
    )
}
export default ProductDetails