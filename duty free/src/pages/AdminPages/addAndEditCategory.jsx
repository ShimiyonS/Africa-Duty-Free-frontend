import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Common from '../../commonMethod/Common.js'
import BackButton from '../../components/commonComponents/BackButton'


const AddAndEditCategory = () => {
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const { apiRequest } = Common()
    const [formData, setFormData] = useState(
        {
            name: '',
            slug: '',
            subCategory: []
        }
    )
    useEffect(() => {
        if (!id) return;
        const fetchCategory = async () => {
            try {
                const data = await apiRequest("GET", `product/${id}`, {}, {
                    Authorization: `Bearer ${token}`,
                });
                setFormData(data.data);
            } catch (error) {
                console.error("api fetching error", error)
            }
        }
        fetchCategory();
    }, [id])
    // for slug generating with hyphen
    const slugChange = (field) => {
        setFormData(prev => ({
            ...prev,
            slug: (field === "slug" ? prev.slug : prev.name)
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
        }))
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // validation for input
        if (!formData.name.trim()) {
            toast.error("name is required")
        }

        try {
            const method = id ? "PUT" : "POST"
            const url = id ? `product/${id}` : "product";

            const data = await apiRequest(method, url, { formData }, {
                Authorization: `Bearer ${token}`,
            })
            toast.success(data.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="mt-4">
            <BackButton />
            <div className="d-flex flex-column">
                <div className="d-flex mt-4">
                    <h1 className="justuspro-bold ">{id ? "Edit" : "Add"} Category</h1>
                </div >
                <form className="d-flex flex-column col-6 mt-4" onSubmit={handleSubmit}>
                    <h3 className="dmsans-bold pb-2">{id ? "Edit" : "Create"} Category</h3>
                    <label className="star-icon pb-2 position-relative dmsans-bold">Name</label>
                    <input type="text" className="admin-input" name="name" value={formData.name} onChange={handleChange}
                        onBlur={() => slugChange("name")} ></input>
                    <label className="py-2 dmsans-bold ">Slug</label>
                    <input type="text" className="admin-input" name="slug" value={formData.slug}
                        onChange={handleChange} onBlur={() => slugChange("slug")}></input>
                    <label className="py-2 dmsans-bold">Sub-Category</label>
                </form>
                <button type="submit" className="mt-5 rounded-2 text-color-secondary h-25 border-0 bg-color-gold dmsans-bold me-3 py-1 px-3 admin-submit-btn" onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    )
}

export default AddAndEditCategory