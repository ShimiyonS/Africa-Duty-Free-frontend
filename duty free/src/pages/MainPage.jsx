import React, { useEffect, useState } from 'react'
import NewProducts from '../components/commonComponents/NewProducts'
import Common from '../commonMethod/Common'

const MainPage = () => {
      const { apiRequest } = Common()
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await apiRequest("GET", "/products", { page: 1 });
            setProducts(data?.products)
        };
        fetchProducts();
    }, [])
    return (
        <div>
            <NewProducts hideWishlist heading={"Most Popular"} productsdata={products} parentClassName={"mt-5"} headingClassName={"product-heading"} swiperClassName="product-swiper most-popular" />
        </div>
    )
}

export default MainPage