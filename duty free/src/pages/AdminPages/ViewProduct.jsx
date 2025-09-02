import React, { useEffect, useState } from 'react'
import Common from '../../commonMethod/common'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import Loader from '../../components/commonComponents/loader/Loader';

const ViewProduct = () => {
    const { apiRequest } = Common()
    const [search, setSearch] = useState("")
    const [product, setProduct] = useState([])
    const [openMenuId, setOpenMenuId] = useState(null)
    const [showPopupDetails, setShowPopupDetails] = useState({ open: false, id: null });
    const [loading, setLoading] = useState(false)

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            const data = await apiRequest("DELETE", `/products/${id}`);
            console.log(data);
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const endpoint = search ? `/products/search?q=${search}` : `/products`;
                const data = await apiRequest("GET", endpoint);
                setProduct(data.products)
            } catch (error) {
                console.error(error)
            }
        }
        fetchProduct();
    }, [search])

    return (
        <div className='table-responsive'>
            <h2 className="adminform-heading justuspro-medium mb-3">View Product List</h2>
            <div className='table-conatiner'>
                <div className='m-3 col-12 col-md-6 col-xl-4'>
                    <input type="text" className='mb-3 admin-input' placeholder='search product' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <table className='container'>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Details</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{item.id}</td>
                                <td>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <img src={item.images[0]} className='admin-product-view' alt="product-img" />
                                        <p className='m-0 ms-3 product-title'>{item.title}</p>
                                    </div>
                                </td>
                                <td>{item.price}</td>
                                <td>
                                    <div
                                        className='admin-action'
                                        onMouseLeave={() => setOpenMenuId(null)}
                                    >
                                        <button className='btn border-0 bg-transparent p-0' onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}>
                                            <BsThreeDotsVertical size={20} />
                                        </button>

                                        {openMenuId === item.id && (
                                            <div className='admin-product-action'>
                                                <Link to={`/siteadmin/edit-product/${item.id}`} className='text-color-primary'>Edit</Link>
                                                <button onClick={() => setShowPopupDetails({ open: true, id: item.id })}>Delete</button>
                                            </div>
                                        )}
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopupDetails.open && showPopupDetails.id !== null && (
                <div className='delete-popup'>
                    <div className='delete-popup-content'>
                        {loading === false ? <>
                            <p className='fw-bold'>Are you sure want to delete this product?</p>
                            <button className='px-3 py-2 border-0 button-bg-primary text-color-secondary rounded-2' onClick={() => setShowPopupDetails({ open: false, id: null })}>Cancel</button>
                            <button className='ms-4 px-3 py-2 border-0 button-bg-danger text-color-secondary rounded-2' onClick={() => handleDelete(showPopupDetails.id)}> Delete</button>
                        </> : <Loader />}
                    </div>
                </div>
            )}


        </div>
    )
}

export default ViewProduct