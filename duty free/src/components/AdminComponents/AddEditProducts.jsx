import { useState, useEffect, useCallback } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Upload, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/Common'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';
import AddEditCategory from './AddEditCategory.jsx';
import AddEditSubCategory from './AddEditSubCategory.jsx';

const AddEditProducts = ({ mode, productData }) => {
    const [loading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const { Option } = Select;
    const { apiRequest, generateSlug } = Common()
    const [form] = Form.useForm();
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const [categories, setCategories] = useState([]);
    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    const handleSlug = (value, placeArea) => {
        const slug = generateSlug(value);
        form.setFieldsValue({ [placeArea]: slug })
    }

    const handleSubmit = async (values) => {
        if (mode == "edit") {
            try {
                const fileList = values?.uploadImage || []
                let imageUrlToUse = productData?.imageUrl || null;
                const filesToUpload = fileList.filter((f) => !!f.originFileObj);
                if (filesToUpload.length > 0) {
                    const formData = new FormData();
                    filesToUpload.forEach((file) => formData.append("file", file.originFileObj));
                    const imageURL = await apiRequest("POST", "/upload/product", formData)
                    imageUrlToUse = imageURL?.url;
                } else if (fileList.length > 0 && fileList[0]?.url) {
                    imageUrlToUse = fileList[0].url;
                }

                const productDetail = {
                    subCategoryIds: values.subCategories,
                    productName: values.product,
                    slug: values.productSlug,
                    price: values.productPrice,
                    description: values.description,
                    imageUrl: imageUrlToUse,
                }
                const response = await apiRequest("PUT", `/product/${productData?.id}`, productDetail)
                console.log(response.message)
                toast.success(response?.message)
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }

        } else {
            const fileList = values?.uploadImage
            let formData;
            if (fileList.length > 0) {
                formData = new FormData();
                fileList.forEach((file) =>
                    formData.append("file", file.originFileObj)
                );
            }
            const imageURL = await apiRequest("POST", "/upload/product", formData)
            values.uploadImage = imageURL?.url;

            const productDetail = {
                subCategoryIds: values.subCategories,
                productName: values.product,
                slug: values.productSlug,
                price: values.productPrice,
                description: values.description,
                imageUrl: values.uploadImage,
            }
            try {
                const data = await apiRequest("POST", "/product/create", productDetail)

                if (data.status) {
                    toast.success(data.message);
                    form.resetFields();
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.message);
            }
        }
    }
    // select option for categories and sub categories 
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        const selected = categories.find((cat) => cat?.id === value);
        setSubCategories(selected?.subCategories || []);
        form.setFieldsValue({ subCategories: [] });
    };


    const validateNumberInput = (e) => {
        const { value } = e.target;

        // 🔹 For keydown event
        if (e.type === "keydown") {
            if (e.key === '-' || e.key === 'e' || e.key === '+') {
                e.preventDefault();
            }
            if (e.key === '0' && value.length === 0) {
                e.preventDefault();
            }
        }

        // 🔹 For input/paste event
        if (e.type === "input") {
            if (value.startsWith('0')) {
                e.target.value = value.replace(/^0+/, '');
            }
            if (Number(value) < 0) {
                e.target.value = '';
            }
        }
    };


    //for showing edit datas in input fields
    useEffect(() => {
        if (mode === "edit" && productData && categories?.length > 0) {
            const categoryId = productData?.subCategory?.category?.id;
            const initialSubCategoryIds = Array.isArray(productData?.subCategoryIds)
                ? productData.subCategoryIds
                : (productData?.subCategoryIds ? JSON.parse(productData.subCategoryIds) : [productData?.subCategoryId || productData?.subCategory?.id].filter(Boolean));

            if (categoryId) {
                setSelectedCategory(categoryId);
                const selected = categories.find((cat) => cat?.id === categoryId);
                setSubCategories(selected?.subCategories || []);
            }

            setSelectedSubCategory(initialSubCategoryIds);

            form.setFieldsValue({
                product: productData?.productName,
                productSlug: productData?.slug,
                productPrice: productData?.price,
                uploadImage: [
                    {
                        uid: "existing-image-uid",
                        name: "existing_image.png",
                        status: "done",
                        url: productData?.imageUrl
                    }
                ],
                categories: categoryId,
                subCategories: initialSubCategoryIds,
                description: productData?.description,
            });
        } else if (mode === "add") {
            form.resetFields();
            setSelectedCategory(null);
            setSelectedSubCategory(null);
            setSubCategories([]);
        }
    }, [mode, productData, categories, form]);

    const fetchCategories = useCallback(async () => {
        try {
            const data = await apiRequest("GET", "/category")
            setCategories(data?.categories)
        } catch (error) {
            console.error(error);
        }
    }, [apiRequest])

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories]);

    const isCategory = Form.useWatch("categories", form)

    // / checking upload image
    const normFile = (e) => Array.isArray(e) ? e : e?.fileList;
    return (
        <div>
            <Button
                type={mode === "edit" ? "link" : "primary"}
                onClick={toggleDrawer}
                className={`antd-custom-btn`}
            >
                {mode === "edit" ? <FaRegEdit size={19} className='text-color-warning' /> : "Add Product"}
            </Button>
            <>
                <Drawer title={
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div >
                            <span className="justuspro-bold">{mode === "add" ? "Add Product" : "Edit Product"}</span>
                        </div>

                        <Row gutter={16}>
                            {/* calling component category and subCategory */}
                            <Col>
                                <AddEditCategory />
                            </Col>
                            <Col>
                                <AddEditSubCategory />
                            </Col>
                        </Row>
                    </div>
                } open={childrenDrawer}
                    onClose={toggleDrawer}
                    className="justuspro-bold" width={800} closable={true}>
                    <div>


                        <Form layout="vertical" form={form} onFinish={handleSubmit}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="product"
                                        label={mode === "add" ? "Product Name" : "Edit Name"}
                                        rules={[{ required: true, message: 'Please enter product name' }]}
                                    >
                                        <Input placeholder="Please enter product name" onBlur={(e) => { handleSlug(e.target.value, "productSlug") }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="productSlug"
                                        label={mode === "edit" ? "Edit Slug" : "Product Slug"}
                                        rules={[{ required: true, message: 'Please enter slug' }]}
                                    >
                                        <Input placeholder="Please enter slug" onBlur={(e) => { handleSlug(e.target.value, "productSlug") }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="productPrice"
                                        label={mode === "edit" ? "Edit Price" : "Product Price"}
                                        rules={[{ required: true, message: 'Please enter price' }]}
                                    >
                                        <Input type="number" className='ant-disable-control' placeholder="Please enter price"
                                            onKeyDown={validateNumberInput}
                                            onInput={validateNumberInput} />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        name="uploadImage"
                                        valuePropName="fileList"
                                        getValueFromEvent={normFile}
                                        label={mode === "edit" ? "Edit Image" : "Upload Image"}
                                        rules={[{ required: true, message: 'Please upload image' }]}
                                    >
                                        <Upload style={{ width: "100%" }} accept=".jpg,.png,.jpeg,.png" className="antd-custom-btn" beforeUpload={() => false}>
                                            <Button icon={<UploadOutlined />} type="primary">Upload</Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="categories"
                                        label={mode === "edit" ? "Edit Categories" : "Categories"}
                                        rules={[{ required: true, message: 'Please choose the categories' }]}
                                    >
                                        <Select
                                            placeholder="Select Category"
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                        >
                                            {categories.map((cat) => (
                                                <Option key={cat.id} value={cat.id}>
                                                    {cat.categoryName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="subCategories"
                                        label="Sub Categories"
                                        rules={[{ required: true, message: 'Please choose the sub categories' }]}
                                    >
                                        <Select
                                            placeholder="Select Subcategory"
                                            value={selectedSubCategory}
                                            onChange={(value) => setSelectedSubCategory(value)}
                                            mode="multiple"
                                            disabled={!isCategory}
                                        >
                                            {subCategories.map((sub) => (
                                                <Option key={sub.id} value={sub.id}>
                                                    {sub?.subcategoryName}
                                                </Option>
                                            ))}
                                        </Select>

                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="description"
                                        label={mode === "edit" ? "Edit Description" : "Description"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'please enter description',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} placeholder="please enter description" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <Button type="primary" htmlType="submit" className="antd-custom-btn" loading={loading}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Drawer>

            </>
        </div >
    )
}

export default AddEditProducts