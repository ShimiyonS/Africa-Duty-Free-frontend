import React, { useEffect, useState } from 'react'
import Common from '../commonMethod/Common'
import ProductCard from '../components/commonComponents/ProductCard'

const Wishlist = () => {
    const [products, setproducts] = useState([])
    const { apiRequest } = Common()
    useEffect(() => {
        const fetchproducts = async () => {
            const data = await apiRequest("GET", `/products`);
            setproducts(data?.products)
        };
        fetchproducts();
    }, [])
    console.log(products);

    return (
        <div>
            <div className="product-grid container mx-auto">
                {products?.map((Item, index) => (
                   <ProductCard gridplacement={"product-grid"} hidePagnation={true} hidePopTool={true} imageheight={250} data={Item} />
                ))}
            </div>
        </div>
    )
}

export default Wishlist