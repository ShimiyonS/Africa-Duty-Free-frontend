import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import Common from "../commonMethod/Common.js";
import '../Styles/product-details.css'


const ProductDetails = () => {
    const { apiRequest } = Common()
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [count, setCount] = useState(1)
    const [activeTab, setActiveTab] = useState("description");

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

    console.log("product", product);
    console.log("data", product?.reviews?.[0]?.comment);
    return (
        <div className="container">
            <div className="d-flex flex-wrap justify-content-center  pb-5 ">
                <div className="col-sm-12 col-md-12 col-lg-6" >
                    <img src={product?.images?.[0]} alt={product?.title} className="product-img" />
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 product-side-content ">
                    <h3 className="pt-5 pb-5">{product?.title}</h3>
                    <span className="pb-2 product-price">${count * product?.price}</span>
                    <p className="pt-3 product-description d-flex flex-wrap">{product?.description}</p>
                    <div className="d-flex gap-3">
                        <div className="rounded-5 text-black count-div d-flex align-items-center gap-3 p-2">
                            <button onClick={() => count > 1 && (setCount(count - 1))} className="decrement-btn" disabled={count === 0}>-</button>
                            <h5 className="m-0">{count}</h5>
                            <button onClick={() => setCount(count + 1)} className="increment-btn" >+</button>
                        </div>
                        <button type="submit" name="add-to-cart" className="add-cart rounded-5 border-0" >Add to cart</button>
                    </div>

                    <div className="d-flex gap-5 align-items-center pt-5">
                        <div className="rounded-5 wishlist p-2 w-50 d-flex justify-content-center align-items-center py-3">
                            <p className="m-0">Add To Wishlist</p>
                        </div>
                        <div className="">
                            <span>share</span>
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
                                <span className="text-muted">{product?.category}</span>
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
                                className={`py-3 text-white ${activeTab === "description" ? "fw-bold" : ""}`}
                                onClick={() => setActiveTab("description")}
                            >
                                Description
                            </h5>
                            <h5
                                className={`py-3 text-white ${activeTab === "review" ? "fw-bold" : ""}`}
                                onClick={() => setActiveTab("review")}
                            >
                                Review
                            </h5>
                        </div>
                    </div>

                    <div className="product-description-details py-5 text-center">
                        {activeTab === "description" ? (
                            <p>{product?.description}</p>
                        ) : (
                            <div>
                                {product?.reviews?.length > 0 ? (
                                    product.reviews.map((rev, i) => (
                                        <p key={i}> {rev.rating} – {rev.comment}</p>
                                    ))
                                ) : (
                                    <p>No data</p>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetails