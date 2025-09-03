import { useState, useEffect } from 'react'
import Common from '../../commonMethod/Common.js'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiExportOutline } from "react-icons/ti";
import Loader from '../../components/commonComponents/loader/loader'

const ListAllCategories = () => {
    const [data, setData] = useState([])
    const { apiRequest } = Common()
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const token = localStorage.getItem("token")
    const [status, setStatus] = useState(false)

    // list all data
    const fetchData = async () => {
        try {
            setStatus(true)
            const res = await apiRequest("GET", `/products`)
            setData(res.products)
            setStatus(false)
        }
        catch (error) {
            console.error("api fetching error", error);
            setStatus(false)
        }
        finally {
            setStatus(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(data);


    const handleDeleteClick = (id) => {
        setConfirmDeleteId(id);
    }

    // handle delete 
    const handleDelete = async () => {
        try {
            const res = await apiRequest("DELETE", `products/${confirmDeleteId}`, {}, {
                Authorization: `Bearer ${token}`
            })
            toast.success(res.data.message)
            fetchData()
            setConfirmDeleteId(null)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Delete failed")
        }
    }
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1 className="justuspro-bold pb-4 text-center">All Categories</h1>
                <Link to="/siteadmin/addcategory" className="addLink dmsans-bold py-0 py-sm-2">Add Category</Link>
            </div>
            <div>
                {confirmDeleteId && (
                    <div className="custom-popup-overlay">
                        <div className="custom-popup">
                            <h4>Delete Category</h4>
                            <p>Are you sure you want to delete this category?</p>
                            <div className="popup-buttons">
                                <button onClick={() => setConfirmDeleteId(null)} className="btn btn-secondary">
                                    No
                                </button>
                                <button onClick={handleDelete} className="btn btn-danger">
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {status ? <Loader /> : <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? <><tr>
                                <td colSpan="3" className="text-center">
                                    No Sub Categories Found
                                </td>
                            </tr></> : <>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>
                                            <Link to={`/product/${item.id}`} target="_self" className="text-decoration-none text-color-primary dmsans-bold">
                                                {item.title}
                                                <TiExportOutline />
                                            </Link>
                                        </td>
                                        <td className="position-relative action-cell">
                                            <BsThreeDotsVertical className="threeDot" />

                                            <div className="position-absolute hidebtn">
                                                <Link
                                                    to={`/siteadmin/editcategory/${item.id}`}
                                                    className="ms-1 pb-2 text-decoration-none text-color-primary dmsans-bold d-block w-100"
                                                >
                                                    <FaEdit className="me-2" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(item.id)}
                                                    className="dmsans-bold border-0 rounded-2 mt-3 bg-transparent  p-0"
                                                >
                                                    <RiDeleteBin6Line className="me-2" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>}
                        </tbody>
                    </table>
                </>}
            </div>
        </div>
    )
}

export default ListAllCategories