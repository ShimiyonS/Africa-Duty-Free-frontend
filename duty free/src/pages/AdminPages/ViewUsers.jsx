import React, { useEffect, useState } from 'react'
import Pagination from '../../components/commonComponents/Pagination';
import Common from '../../commonMethod/common';
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import DeletePopup from '../../components/commonComponents/DeletePopup';

const ViewUsers = () => {
    const { apiRequest } = Common()
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState([])
    const [openMenuId, setOpenMenuId] = useState(null)
    const [deleteDetails, setDeleteDetails] = useState(null);
    const [loading, setLoading] = useState(false)

    // pagination states
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [totalPages, setTotalPages] = useState(1)

    console.log(users);
    

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
        const fetchUsers = async () => {
            try {
                const skip = (page - 1) * pageSize
                const endpoint = search
                    ? `/users/search?q=${search}&limit=${pageSize}&skip=${skip}`
                    : `/users?limit=${pageSize}&skip=${skip}`;

                const data = await apiRequest("GET", endpoint);

                setUsers(data.users || [])
                setTotalPages(Math.ceil(data.total / pageSize)) // ✅ fix: based on API total
            } catch (error) {
                console.error(error)
            }
        }
        fetchUsers();
    }, [search, page, pageSize])

    return (
        <div className='table-responsive'>
            <h2 className="adminform-heading justuspro-medium mb-3">Users List</h2>
            <div className='table-conatiner table-responsive'>

                {/* 🔍 Search box */}
                <div className='m-3 col-12 col-md-6 col-xl-4'>
                    <input
                        type="text"
                        className='mb-3 admin-input'
                        placeholder='search Users'
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
                            <th>User Id</th>
                            <th>User Details</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{item.id}</td>
                                <td>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <img src={item.image} className='admin-product-view' alt="product-img" />
                                        <p className='m-0 ms-3'>{item.username}</p>
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
                <div className="my-3">
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
                <DeletePopup handleDelete={() => handleDelete(deleteDetails.id)} data={deleteDetails} handleclose={closePopup} />
            )}
        </div>
    )
}

export default ViewUsers