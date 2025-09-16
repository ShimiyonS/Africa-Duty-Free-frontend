import React, { useEffect, useState } from 'react'
import Common from '../commonMethod/common'
import ProductCard from '../components/commonComponents/ProductCard'
import DiscountComponent from '../components/commonComponents/DiscountComponent'
import { Link } from 'react-router-dom'

const Wishlist = () => {
    const [products, setproducts] = useState([])
    const { apiRequest, wishlistItems } = Common()
    const userId = 1
    // const getWishList = async () => {
    //     try {
    //         const wishlist = await apiRequest("GET", `/auth/${userId}/wishlist`)
    //         setproducts(wishlist?.products)
    //         console.log(wishlist?.products)
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
    const getWishList = async () => {
        setproducts(wishlistItems)
    }


    useEffect(() => {
        getWishList();
    }, [wishlistItems])

    return (
        <>
            {products?.length === 0 ?
                <>
                    <div className='container p-5'>
                        <p className='justuspro-medium'>Your wishlist is currently empty.</p>
                        <Link className='justuspro-medium text-color-danger text-decoration-none' to={`/shop`}>Return to shop</Link>
                    </div>
                </> :
                <>
                    <div className="product-grid container mx-auto my-5">
                        {products.map((Item, index) => (
                            <ProductCard gridplacement={"product-grid"} hidePagnation={true} hidePopTool={true} imageheight={250} data={Item} />
                        ))}
                    </div>
                    <DiscountComponent />
                </>}
        </>
    )
}

export default Wishlist