import React, { useEffect, useState } from 'react'
import Common from '../../commonMethod/common'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { MdManageSearch } from "react-icons/md";
import Pagination from '../../components/commonComponents/Pagination';
import DeletePopup from '../../components/commonComponents/DeletePopup';

const ViewProduct = () => {
    const { apiRequest } = Common()
    const [search, setSearch] = useState("")
    const [product, setProduct] = useState([])
    const [openMenuId, setOpenMenuId] = useState(null)
    const [deleteDetails, setDeleteDetails] = useState(null);
    const [loading, setLoading] = useState(false)

    // pagination states
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(1)

    const closePopup = () => {
        setDeleteDetails(null)
    }

    const openPopup = (data) => {
        setDeleteDetails(data)
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await apiRequest("DELETE", `/products/${id}`);
            setProduct((prev) => prev.filter((p) => p.id !== id)); // remove locally
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const skip = (page - 1) * pageSize
                const endpoint = search
                    ? `/products/search?q=${search}&limit=${pageSize}&skip=${skip}`
                    : `/products?limit=${pageSize}&skip=${skip}`;

                const data = await apiRequest("GET", endpoint);

                setProduct(data.products || [])
                setTotalPages(Math.ceil(data.total / pageSize)) // ✅ fix: based on API total
            } catch (error) {
                console.error(error)
            }
        }
        fetchProduct();
    }, [search, page, pageSize])

    return (
        <div className='table-responsive'>
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className="adminform-heading justuspro-medium mb-3">View Product List</h2>
                <Link className='text-decoration-none px-3 py-2 text-color-secondary button-bg-primary rounded-2' to={`/siteadmin/add-product`}><MdOutlineAdd /> Add Product</Link>
            </div>

            <div className='table-conatiner table-responsive'>

                {/* 🔍 Search box */}
                <div className='m-3 col-12 col-md-6 col-xl-4 search-box'>
                    <MdManageSearch className='data-search-icon' />
                    <input
                        type="text"
                        className='mb-3 admin-input'
                        placeholder='search product'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1); // reset to page 1 on new search
                        }}
                    />
                </div>

                {/* 📦 Products table */}
                <table className='container table-responsive'>
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
                                        <p className='m-0 ms-3 product-table-title'>{item.title}</p>
                                    </div>
                                </td>
                                <td>{item.price}</td>
                                <td>
                                    <div
                                        className='admin-action'
                                        onMouseLeave={() => setOpenMenuId(null)}
                                    >
                                        <button
                                            className='btn border-0 bg-transparent p-0'
                                            onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                        >
                                            <BsThreeDotsVertical size={20} />
                                        </button>

                                        {openMenuId === item.id && (
                                            <div className='admin-product-action'>
                                                <Link to={`/siteadmin/edit-product/${item.id}`} className='text-color-primary'>Edit</Link>
                                                <button onClick={() => openPopup(item)}>Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 📄 Pagination */}
                <div className="m-3">
                    <Pagination
                        currentPage={page}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onPageSizeChange={(newSize) => {
                            setPageSize(newSize);
                            setPage(1); // reset to page 1
                        }}
                    />
                </div>
            </div>

            {/* ❌ Delete confirmation popup */}
            {deleteDetails !== null && (
                <DeletePopup alertmessage={"Are you sure want to delete this product?"} handleDelete={() => handleDelete(deleteDetails.id)} data={deleteDetails} handleclose={closePopup} />
            )}
        </div>
    )
}

export default ViewProduct
