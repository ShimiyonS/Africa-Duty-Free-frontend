import { useState, useEffect } from 'react'
import Common from '../../commonMethod/Common.js'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"

const listAllCategories = () => {
    const [data, setData] = useState([])
    const { apiRequest } = Common()
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const token = localStorage.getItem("token")

    // list all data
    const fetchData = async () => {
        try {
            const res = await apiRequest("GET", `products`)
            setData(res)
        }
        catch (error) {
            console.error("api fetching error", error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(data);

    const openDeleteModal = (id) => {
        setSelectedId(id)
        setShowModal(true)
    }

    // handle delete 
    const handleDelete = async () => {
        try {
            const res = await apiRequest("delete", `products/${selectedId}`, {}, {
                Authorization: `Bearer ${token}`
            })
            toast.success(res.data.message)
            setShowModal(false);
            fetchData()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Delete failed")
        }
    }
    return (
        <div>
            <div>
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Are you sure you want to delete?</h3>
                            <div className="modal-buttons">
                                <button onClick={handleDelete}>Yes</button>
                                <button onClick={() => setShowModal(false)}>No</button>
                            </div>
                        </div>
                    </div>
                )}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Slug</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(() => (
                            <tr>
                                <th scope="row">{data._id}</th>
                                <td>{data.name}</td>
                                <td>{data.slug}</td>
                                <td>  <button onClick={() => openDeleteModal(data._id)}>Delete</button><Link to="/edit">edit</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default listAllCategories