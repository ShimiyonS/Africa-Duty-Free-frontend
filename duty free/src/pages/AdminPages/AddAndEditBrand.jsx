import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Common from '../../commonMethod/Common.js'
import BackButton from '../../components/commonComponents/BackButton'
import uploadImage from '../../assets/uploadImg.jpg'

const AddAndEditBrand = () => {
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const { apiRequest } = Common()
    const [imageState, setImageState] = useState(null)
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
    const handleChangeImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageState(file)
            e.target.value = null
        }
    }
    const handleRemove = () => {
        setImageState(null)
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
            <div className="d-flex justify-content-between mt-4">
                <h1 className="justuspro-bold ">{id ? "Edit" : "Add"} Brand</h1>
                <button type="submit" className="rounded-2 text-color-secondary h-25 border-0 bg-color-gold dmsans-bold me-3 py-1 px-3 " onClick={handleSubmit}>Submit</button>
            </div>
            <form className="d-flex flex-column col-6 mt-4" onSubmit={handleSubmit}>
                <h3 className="dmsans-bold pb-2">{id ? "Edit" : "Create"} Brand</h3>
                <label className="star-icon pb-2 position-relative dmsans-bold">Name</label>
                <input type="text" className="admin-input" name="name" value={formData.name} onChange={handleChange}
                    onBlur={() => slugChange("name")} ></input>
                <label className="py-2 dmsans-bold ">Slug</label>
                <input type="text" className="admin-input" name="slug" value={formData.slug}
                    onChange={handleChange} onBlur={() => slugChange("slug")}></input>

                <div className="form-group d-flex">
                    <div>
                        <label htmlFor="uploadImg">
                            <p>upload Image</p>
                            <img src={uploadImage} alt="categoryImg" className="uploadImage " />
                            {id &&
                                <img
                                    src={formData.image}
                                    alt="no image"
                                    className="uploadImage d-block"
                                />
                            }
                        </label>
                    </div>
                    <div className="ms-5">
                        <p>&nbsp;</p>
                        {imageState && (<div >
                            <img src={URL.createObjectURL(imageState)} alt="categoryImg" className="uploadImage" />
                            <span><button type="button" onClick={handleRemove} >x</button></span>
                        </div>)}
                        <input type="file" id="uploadImg" className="d-none" accept="image/png, image/gif, image/jpeg" onChange={handleChangeImage} />
                    </div>
                </div>
                <button type="submit" className="w-25 mt-5 dmsans-bold bg-color-gold border-0 rounded-3">
                    {id ? "update  " : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default AddAndEditBrand