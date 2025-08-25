import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import { apiRequest } from "../commonMethod/common.js";
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

const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [count, setCount] = useState(1)
    const [activeTab, setActiveTab] = useState("description");
    const [rating, setRating] = useState(4)
    const [open, setOpen] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiRequest("GET", `products/${id}`)
                setProduct(data);
            } catch (error) {
                console.error("api fetching error", error)
            }
        }
        fetchProduct();
    }, [id])

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

    return (
        <div className="container">
            <div className="d-flex flex-wrap justify-content-center  pb-5 ">
                <div className="col-sm-12 col-md-6 col-lg-6 position-relative" >
                    <img ref={imgRef} src={product?.images?.[0]} alt={product?.title} className="product-img" />
                    <img src={ZoomImg} alt="zoom-img" className="position-absolute zoom-img" onClick={() => setOpen(true)} />
                </div>

                {/* pop-up-img */}
                {open && (
                    <div className="popup-overlay" onClick={() => setOpen(false)}>
                        {/* Fullscreen button */}
                        <button className="fullscreen-btn" onClick={handleFullscreen}>
                            ⛶
                        </button>
                        <button className="close-btn" onClick={() => setOpen(false)}>x</button>
                        <div className="popup-content">
                            <img src={product?.images?.[0]} alt="pop-up-img" />

                        </div>
                    </div>
                )}

                <div className="col-sm-12 col-md-6 col-lg-6 product-side-content ">
                    <h2 className="pt-5 pb-5 product-page-title">{product?.title}</h2>
                    <span className="pb-2 product-price">${count * product?.price}</span>
                    <p className="pt-3 product-description d-flex flex-wrap">{product?.description}</p>
                    <div className="d-flex gap-3">
                        <div className="rounded-5 count-div d-flex align-items-center gap-3 p-2">
                            <button onClick={() => count > 1 && (setCount(count - 1))} className="decrement-btn" disabled={count === 0}>-</button>
                            <h5 className="m-0">{count}</h5>
                            <button onClick={() => setCount(count + 1)} className="increment-btn" >+</button>
                        </div>
                        <div className="position-relative">
                            <button type="submit" name="add-to-cart" className="add-cart rounded-5 border-0 position-relative" >Add to cart</button>
                            <img src={Bag} alt="bag" className="product-bag position-absolute" />
                        </div>
                    </div>

                    <div className="d-flex align-items-center pt-5 gap-3">
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

                    <div className="review-section ps-4 ps-md-5">
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
        </div>
    )
}
export default ProductDetails