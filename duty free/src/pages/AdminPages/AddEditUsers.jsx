import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import Common from '../../commonMethod/common'
import { useParams } from "react-router-dom";


const AddEditUsers = () => {
    const { apiRequest } = Common()
    const { id } = useParams()
    const [formdata, setFormdata] = useState({ productname: "", productslug: "", productprice: "", productimage: "", productcatagories: 1, productsubcatagories: [], productdescription: "" })

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target
        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                const data = await apiRequest("PUT", `/users/${id}`, formdata)
                toast.success("User Updated successfully")
            } else {
                const data = await apiRequest("POST", "/users/add", formdata)
                toast.success("user added successfully")
                setFormdata({ productname: "", productslug: "", productprice: "", productimage: "", productcatagories: 1, productsubcatagories: [], productdescription: "" })
            }


        } catch (err) {
            console.error(err);
            toast.error("something went wrong")
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await apiRequest("GET", `/users/${id}`);
                setFormdata({ productname: "Testproduct", productslug: "Testproductslug", productprice: "200", productimage: "", productcatagories: { value: 1, label: "Whirpool" }, productsubcatagories: [{ value: 2, label: "Laptop" }, { value: 3, label: "Tablet" }], productdescription: "test description" })
            } catch (err) {
                console.error(err);
            }
        }
        if (id) {
            fetchUser()
        }
    }, [])
    return (
        <div>
            <>
                <h2 className="adminform-heading justuspro-medium mb-3">{id ? "Edit User" : "Add User"}</h2>
                <form className='container' onSubmit={handleSubmit}>
                    <div className='row mb-3'>
                        <div className="col-12 col-md-6">
                            <label htmlFor="ProductName" className='admin-label required'>Product Name</label>
                            <input type="text" className='admin-input' id="ProductName" name="productname" value={formdata.productname} onChange={(e) => { handleChange(e) }} onBlur={() => slugChange("productname")} />
                        </div>
                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                            <label htmlFor="productslug" className='admin-label required'>Product Slug</label>
                            <input type="text" className='admin-input' id="Productslug" name="productslug" value={formdata.productslug} onChange={(e) => { handleChange(e) }} onBlur={() => slugChange("productslug")} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="col-12 col-md-6">
                            <label htmlFor="ProductPrice" className='admin-label required'>Product Price</label>
                            <input type="number" className='admin-input' id="ProductPrice" name="productprice" value={formdata.productprice} onChange={(e) => { handleChange(e) }} />
                        </div>
                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                            <label htmlFor="Productimage" className='admin-label required'>Upload Product Image</label>
                            <input type="file" className='admin-input' id="Productimage" name="productimage" value={formdata.productimage} onChange={(e) => { handleChange(e) }} />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="col-12 col-md-6">
                            <label htmlFor="productDescription" className='admin-label required'>Product Description</label>
                            <textarea type="text" className='admin-input' id="ProductDescription" name="productdescription" value={formdata.productdescription} onChange={(e) => { handleChange(e) }} />
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className="button-text-primary button-bg-primary border-0 px-3 py-2 rounded-2" type="submit">Submit</button>
                    </div>
                </form>
            </>
        </div>
    )
}

export default AddEditUsers