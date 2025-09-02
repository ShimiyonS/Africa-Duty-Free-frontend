import { useState, useEffect } from 'react'
import Common from '../../commonMethod/Common.js'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiExportOutline } from "react-icons/ti";
import defaultImage from '../../assets/user-default-profile.jpg'

const ListAllCategories = () => {
    const [data, setData] = useState([])
    const { apiRequest } = Common()
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const token = localStorage.getItem("token")
    const [hideBtn, setHideBtn] = useState(false)

    // list all data
    const fetchData = async () => {
        try {
            const res = await apiRequest("GET", `/products`)
            setData(res.products)
        }
        catch (error) {
            console.error("api fetching error", error);
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
            <h1 className="justuspro-bold pb-4">All Brands</h1>
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
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Brand</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td className="d-flex gap-3">
                                    {item.images ? (
                                        <div className="d-flex gap-4">
                                            <img src={item.images} alt="categoryimg" className="uploadImage" />
                                        </div>
                                    ) : (
                                        <img src={defaultImage} alt={item.title} className="categoryImg" />
                                    )}
                                    <div className="texthide">
                                        <Link to={`/product/${item.id}`} target="_self" className="text-decoration-none text-color-primary dmsans-bold">
                                            {item.title}
                                            <TiExportOutline />
                                        </Link>
                                    </div>
                                </td>
                                <td className="position-relative action-cell">
                                    <BsThreeDotsVertical className="threeDot" />

                                    <div className="position-absolute hidebtn">
                                        <FaEdit className="" />
                                        <Link
                                            to={`/siteadmin/editbrand/${item.id}`}
                                            className="ms-1 pb-2 text-decoration-none text-color-primary dmsans-bold"
                                        >

                                            Edit
                                        </Link>
                                        <br />
                                        <button
                                            onClick={() => handleDeleteClick(item.id)}
                                            className="dmsans-bold border-0 rounded-2 mt-3 bg-transparent  p-0"
                                        >
                                            <RiDeleteBin6Line className="" />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListAllCategories