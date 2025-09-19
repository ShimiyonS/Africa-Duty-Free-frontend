import React, { useEffect, useState } from 'react'
import Common from '../commonMethod/common'
import ProductCard from '../components/commonComponents/ProductCard'
import DiscountComponent from '../components/commonComponents/DiscountComponent'
import { Link } from 'react-router-dom'

const Wishlist = () => {
    const { wishlistItems } = Common()
    return (
        <>
            {wishlistItems?.length === 0 ?
                <>
                    <div className='container p-5'>
                        <p className='justuspro-medium'>Your wishlist is currently empty.</p>
                        <Link className='justuspro-medium text-color-danger text-decoration-none' to={`/shop`}>Return to shop</Link>
                    </div>
                </> :
                <>
                    <div className="product-grid container mx-auto my-5">
                        {wishlistItems?.map((Item, index) => (
                            <ProductCard gridplacement={"product-grid"} hidePagnation={true} hidePopTool={true} imageheight={250} data={Item} />
                        ))}
                    </div>
                    <DiscountComponent />
                </>}
        </>
    )
}

export default Wishlist