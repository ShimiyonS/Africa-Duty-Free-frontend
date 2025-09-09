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

    const [categories, setCategories] = useState([
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            subCategorys: [
                {
                    id: 3,
                    name: "Fragrances",
                    slug: "fragrances",
                    products: [{
                        name: "Dolce Gabana",
                        price: 33,
                        Description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
                    },

                    ]
                }
            ]
        },
        {
            id: 2,
            name: "dress",
            slug: "dress",
            subCategorys: [
                {
                    id: 1,
                    name: "belt",
                    slug: "fragrances",
                    products: [{
                        name: "Dolce Gabana",
                        price: 33,
                        Description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
                    },
                    {
                        name: "Dolce Gabana",
                        price: 33,
                    },
                    ]
                }, {
                    id: 2,
                    name: "watch",
                    slug: "fragrances",
                    products: [{
                        name: " Gabana",
                        price: 33,
                        // productImage: DolceGabana,
                        Description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
                    },
                    ]
                }
            ]
        }
    ]);
    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    const handleSubmit = async (values) => {
        try {
            const data = await apiRequest("POST", "/products/add", values)
            toast.success("Product added successfully");
            form.resetFields();

            // Find the category by ID
            const matchedCategory = categories.find(cat => cat.id === values.categories);
            if (Object.keys(matchedCategory).length) {
                console.error("Category not found");
                return;
            }

            values.subCategories.forEach(subCatId => {
                const matchedSubCategory = matchedCategory.categories.subCategorys.find(sub => sub.id === subCatId);
                if (matchedSubCategory) {
                    matchedSubCategory.products.push({
                        name: values.Product,
                        price: values.ProductPrice,
                        slug: values.ProductSlug,
                        image: values.UploadImage,
                        Description: values.description
                    });
                }
            });

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }
    // select option for categories and sub categories 
    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        const selected = categories.find((cat) => cat.id === value);
        setSubCategories(selected?.subCategorys || []);
        setSelectedSubCategory(null);
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
        if (mode === "edit" && productData) { 
            form.setFieldsValue({
                product: productData?.productname,
                productSlug: productData?.productSlug,
                productPrice: productData?.price,
                uploadImage: productData?.images?.[0],
                categories: productData?.productcatagory,
                subCategories: productData?.productsubcatagory,
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
        console.log("updated category", shareValue);

    }, [shareValue]);


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
                                        <Input type="number" className='ant-disable-control' placeholder="Please enter price"
                                            onKeyDown={validateNumberInput}
                                            onInput={validateNumberInput} />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        name="uploadImage"
                                        label={mode === "edit" ? "Edit Image" : "Upload Image"}
                                        rules={[{ required: true, message: 'Please upload image' }]}
                                    >
                                        <Upload accept=".jpg,.png,.jpeg,.png" className="antd-custom-btn">
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
                                                    {cat.name}
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
                                        >
                                            {subCategories.map((sub) => (
                                                <Option key={sub.id} value={sub.id}>
                                                    {sub.name}
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