import { useEffect, useState } from "react"
import Common from '../../commonMethod/common'
import Select from 'react-select';
import { useParams } from "react-router-dom";

const AddEditProducts = () => {
    const { apiRequest } = Common()
    const { id } = useParams()
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
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
                const data = await apiRequest("PUT", `/products/${id}`, formdata)
            } else {
                const data = await apiRequest("POST", "/products/add", formdata)
            }


        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await apiRequest("GET", "/products/categories");
                console.log(data);

                setCategory([{ name: "whirpool", Id: 1 }, { name: "Sumsang", Id: 2 }, { name: "LG", Id: 3 }, { name: "Realme", Id: 4 }])
            } catch (error) {
                console.error(error)
            }
        }
        const fetchSubCategory = async () => {
            try {
                const data = await apiRequest("GET", "/products/categories");
                setSubCategory([{ name: "Mobile", id: 1 }, { name: "Laptop", id: 2 }, { name: "Tablet", id: 3 }, { name: "Ac", id: 4 }])
            } catch (err) {
                console.error(err);
            }
        }

        const fetchproduct = async () => {
            try {
                const data = await apiRequest("GET", `/products/${id}`);
                setFormdata({ productname: "Testproduct", productslug: "Testproductslug", productprice: "200", productimage: "", productcatagories: {value:1,label:"Whirpool"}, productsubcatagories: [{value:2,label:"Laptop"},{value:3,label:"Tablet"}], productdescription: "test description" })
            } catch (err) {
                console.error(err);
            }
        }
        if(id){
            fetchproduct()
        }
        fetchCategory();
        fetchSubCategory();
    }, [])


    return (
        <div>
            <>
                <h2 className="adminform-heading justuspro-medium mb-3">{id ? "Edit Product" : "Add Product"}</h2>
                <form className='container' onSubmit={handleSubmit}>
                    <div className='row mb-3'>
                        <div className="col-12 col-md-6">
                            <label htmlFor="ProductName" className='admin-label required'>Product Name</label>
                            <input type="text" className='admin-input' id="ProductName" name="productname" value={formdata.productname} onChange={(e) => { handleChange(e) }} />
                        </div>
                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                            <label htmlFor="productslug" className='admin-label required'>Product Slug</label>
                            <input type="text" className='admin-input' id="Productslug" name="productslug" value={formdata.productslug} onChange={(e) => { handleChange(e) }} />
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
                            <label htmlFor="Catagories" className='admin-label required'>Catagories</label>
                            <Select
                                value={formdata.productcatagories}
                                name="productcatagories"
                                options={category.map((Item, Index) => ({ label: Item.name, value: Item.Id }))}
                                className="admin-select"
                                onChange={(selectedOption) =>
                                    setFormdata((prev) => ({
                                        ...prev,
                                        productcatagories: selectedOption,
                                        selectedcatagories: selectedOption.value

                                    }))
                                }
                            />
                        </div>
                        <div className="col-12 col-md-6 mt-3 mt-md-0">
                            <label htmlFor="SubCatagories" className='admin-label required'>Sub-Catagories</label>
                            <Select
                                value={formdata.productsubcatagories}
                                isMulti
                                name="productsubcatagories"
                                options={subCategory.map((Item, Index) => ({ label: Item.name, value: Item.id }))}
                                onChange={(selectedOptions) =>
                                    setFormdata((prev) => ({
                                        ...prev,
                                        productsubcatagories: selectedOptions,
                                        selectedsubcategories: selectedOptions.map((item) => item.value)
                                    }))
                                }
                            />
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

export default AddEditProducts