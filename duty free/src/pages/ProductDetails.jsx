import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import { apiRequest } from "../commonMethod/common.js";
import '../Styles/product-details.css'


const ProductDetails = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

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
    return (
        <div className="container">
            <div className="d-flex flex-wrap justify-content-center  pb-5 ">
                <div className="col-sm-12 col-md-12 col-lg-6" >
                    <img src={product?.images?.[0]} alt={product?.title} className="product-img" />
                </div>

                <div className="col-sm-12 col-md-12 col-lg-6 product-side-content ">
                    <h3 className="pt-5 pb-5">{product?.title}</h3>
                    <span className="pb-2 product-price">${product?.price}</span>
                    <p className="pt-3 product-description d-flex flex-wrap">{product?.description}</p>
                    <div className="d-flex gap-3">
                        <input type="number" value="1" className="input-box rounded-5" />
                        <button type="submit" name="add-to-cart" className="add-cart rounded-5" >Add to cart</button>
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
                <div className="product-description-bottom  rounded-5  overflow-hidden col-sm-12 col-md-12 col-lg-12">
                    <div className="product-description-inner d-flex justify-content-center">
                        <h5 className="py-3 text-white">Description</h5>
                    </div>
                    <div className="product-description-details d-flex justify-content-center py-5">
                        <p>{product?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails