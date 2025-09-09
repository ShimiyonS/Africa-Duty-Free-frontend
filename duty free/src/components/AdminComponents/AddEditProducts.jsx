import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';
import AddEditCategory from './AddEditCategory.jsx';
import AddEditSubCategory from './AddEditSubCategory.jsx';

const AddEditProducts = ({ mode, productData }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const { Option } = Select;
    const { apiRequest } = Common()
    const [form] = Form.useForm();
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [shareValue, setShareValue] = useState(null)

    const [categories, setCategories] = useState([]);
    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    const handleSubmit = async (values) => {
        if (mode == "edit") {

        } else {
            const fileList = values?.uploadImage?.fileList
            let formData;
            if (fileList.length > 0) {
                formData = new FormData();
                fileList.forEach((file) =>
                    formData.append("file", file.originFileObj)
                );
            }
            const imageURL = await apiRequest("POST", "/upload/product", formData)
            values.uploadImage = imageURL?.url;
            console.log(values.subCategories)

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

    //for showing edit datas in input fields
    useEffect(() => {
        if (mode === "edit" && productData) {
            console.log(productData?.imageUrl)
            form.setFieldsValue({
                product: productData?.productName,
                productSlug: productData?.slug,
                productPrice: productData?.price,
                uploadImage: productData?.imageUrl,
                categories: productData?.subCategory?.category?.categoryName,
                subCategories: productData?.subCategory?.subcategoryName,
                description: productData?.description,
            });
        } else {
            form.resetFields();
        }
    }, [mode, productData, form]);

    useEffect(() => {
        if (shareValue) {
            setCategories((prev) => [
                ...prev, {
                    id: prev.length + 1,
                    name: shareValue.category,
                    slug: shareValue.categorySlug,
                    description: shareValue.description
                }
            ])
        }

    }, [shareValue]);


    const fetchCategories = async () => {
        try {
            const data = await apiRequest("GET", "/category")
            setCategories(data?.categories)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    const getCategoryId = (categoryName) => {
        const selectedCategory = categories.find((cat) => cat.categoryName === categoryName);
        // setSubCategories(selectedCategory?.subCategories || [])
        return selectedCategory?.id;
    }

    const getSubCategoryId = (subCategoryName) => {
        const selectedSubCategory = subCategories.find((sub) => sub.subcategoryName === subCategoryName);
        return selectedSubCategory?.id;
    }

    const isCategory = Form.useWatch("categories", form)
    return (
        <div>
            <Button
                type={mode === "edit" ? "link" : "primary"}
                onClick={toggleDrawer}
                className={`antd-custom-btn`}
            >
                {mode === "edit" ? <FaRegEdit size={19} /> : "Add Product"}
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
                                <AddEditCategory setShareValue={setShareValue} />
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
                                        label={mode === "add" ? "Product Name" : "Edit name"}
                                        rules={[{ required: true, message: 'Please enter product name' }]}
                                    >
                                        <Input placeholder="Please enter product name" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="productSlug"
                                        label={mode === "edit" ? "Edit Slug" : "Product Slug"}
                                        rules={[{ required: true, message: 'Please enter slug' }]}
                                    >
                                        <Input placeholder="Please enter slug" />
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
                                        <Input type="number" placeholder="Please enter price" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        name="uploadImage"
                                        label={mode === "edit" ? "Edit Image" : "Upload Image"}
                                        rules={[{ required: true, message: 'Please upload image' }]}
                                    >
                                        <Upload style={{ width: "100%" }} accept=".jpg,.png,.jpeg,.png" beforeUpload={() => false} className="antd-custom-btn">
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
                                                <Option key={cat.id} value={getCategoryId(cat?.categoryName)}>
                                                    {cat.categoryName}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="subCategories"
                                        label="subCategories"
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
                                                <Option key={sub.id} value={getSubCategoryId(sub?.subcategoryName)}>
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
                                <Button type="primary" htmlType="submit" className="antd-custom-btn">
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