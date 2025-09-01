import React, { useEffect, useState } from 'react'
import Common from '../../commonMethod/common'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";

const ViewProduct = () => {
    const { apiRequest } = Common()
    const [product, setProduct] = useState([])
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await apiRequest("GET", "/products");
                setProduct(data.products)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProduct();
    }, [])
    console.log(product);
    return (
        <div>
            <h2 className="adminform-heading justuspro-medium mb-3">View Product List</h2>
            <table className='container table-responsive'>
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product</th>
                        <th>Product Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index) => (
                        <tr key={item.id || index}>
                            <td>{item.id}</td>
                            <td>
                                <div className='d-flex'>
                                    <img src={item.images[0]} className='admin-product-view' alt="product-img" />
                                    <p>{item.title}</p>
                                </div>
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <div className='admin-action'>
                                    <BsThreeDotsVertical />
                                    <div className='admin-product-action'>
                                        <Link to={`/siteadmin/edit-product/${item.id}`} > Edit </Link>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            
        </div>
    )
}

export default ViewProduct