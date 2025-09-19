import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Image, Input, Row, Select, Upload, } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';

const AddEditSubCategory = ({ mode, subCategoryData }) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const { apiRequest, generateSlug } = Common()
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [category, setCategory] = useState([])

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const getBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });


    const handleSlug = (value, placeArea) => {
        const slug = generateSlug(value);
        form.setFieldsValue({ [placeArea]: slug })
    }

    const fetchCategories = async () => {
        try {
            const data = await apiRequest("GET", "/category")
            console.log(data?.categories, "categories")
            setCategory(data?.categories)
        } catch (error) {
            console.error(error);
        }
    }
    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    //for showing edit datas in input fields
    useEffect(() => {
        fetchCategories()
        if (mode === "edit" && subCategoryData) {
            form.setFieldsValue({
                subCategory: subCategoryData?.name,
                subCategorySlug: subCategoryData?.slug,
                categories: subCategoryData?.categories,
                description: subCategoryData?.description,
                uploadImage: subCategoryData.image
                    ? [
                        {
                            uid: '-1',
                            name: 'category-image.png',
                            status: 'done',
                            url: subCategoryData.image,
                        },
                    ]
                    : [],
            });
        } else {
            form.resetFields();
        }
    }, [mode, subCategoryData, form]);


    // Handle image preview
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };


    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            let formData;
            if (values.uploadImage?.fileList.length > 0) {
                formData = new FormData();
                values.uploadImage?.fileList.forEach((file) =>
                    formData.append("file", file.originFileObj)
                );
            }
            const imageURL = await apiRequest("POST", "/upload/product", formData)
            values.uploadImage = imageURL?.url;
            const subCategoryData = {
                subcategoryName: values.subcategoryName,
                slug: values.slug,
                description: values.description,
                image: imageURL?.url,
            }
            const data = await apiRequest("POST", `/subcategory/create/${values.category}`, subCategoryData)
            if (data?.status) {
                toast.success("Sub Category added successfully");
            } else {
                toast.error(data?.message);
            }
            form.resetFields();

        } catch (error) {
            console.error(error);
            toast.error(error?.message);
        }
        finally {
            setLoading(false)
        }
    }

    const getCategoryId = (categoryName) => {
        const selectedCategory = category.find((cat) => cat.categoryName === categoryName);
        return selectedCategory?.id;
    }

    // checking upload imageflas
    const normFile = (e) => Array.isArray(e) ? e : e?.fileList;

    return (
        <div>
            <Button type={mode === "edit" ? "link" : "primary"} onClick={toggleDrawer} className={`${mode === "edit" ? "p-0" : ""} antd-custom-btn`} >
                {mode === "edit" ? <FaRegEdit size={19} className="text-color-warning" /> : "Add Sub Category"}
            </Button>
            <>
                <Drawer
                    title={<div className="d-flex align-items-center justify-content-between w-100">
                        <div>
                            <span> {mode === "edit" ? "Edit Sub Category" : "Add Sub Category"}</span>
                        </div>
                    </div>}
                    width={800}
                    closable={true}
                    onClose={toggleDrawer}
                    open={childrenDrawer}
                >
                    <Form layout="vertical" form={form} onFinish={handleSubmit}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="subcategoryName"
                                    label={mode === "edit" ? "Edit Name" : "Name"}
                                    rules={[{ required: true, message: 'Please enter Sub Category name' }]}
                                >
                                    <Input placeholder="Please enter Sub Category name" onBlur={(e) => { handleSlug(e.target.value, "subCategorySlug") }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="slug"
                                    label={mode === "edit" ? "Edit slug" : " slug"}
                                    rules={[{ required: true, message: 'Please enter slug' }]}
                                >
                                    <Input placeholder="Please enter slug" onBlur={(e) => { handleSlug(e.target.value, "subCategorySlug") }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="category"
                                    label={mode === "edit" ? "Edit Categories" : "Categories"}
                                    rules={[{ required: true, message: 'Please choose the categorie' }]}
                                >
                                    <Select
                                        placeholder="Select Category"
                                    >
                                        {category.map((cat) =>
                                            <Option key={cat.id} value={getCategoryId(cat?.categoryName)} >
                                                {cat.categoryName}
                                            </Option>)}
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
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    name="uploadImage"
                                    label={mode === 'edit' ? 'Edit Images' : 'Upload Images'}
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    rules={[{ required: true, message: 'Please upload at least 1 image' }]}
                                >
                                    <Upload
                                        listType="picture-card"
                                        accept=".jpg,.png,.jpeg"
                                        beforeUpload={() => false} // prevent auto upload
                                        onPreview={handlePreview}
                                        maxCount={1}
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    </Upload>
                                </Form.Item>

                            </Col>
                        </Row>
                        {previewImage && (
                            <Image
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: visible => setPreviewOpen(visible),
                                    afterOpenChange: visible => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                        <div className="d-flex justify-content-end">
                            <Button type="primary" htmlType="submit" className="antd-custom-btn" loading={loading}>
                                {mode === "edit" ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </Drawer>

            </>
        </div>
    )
}

export default AddEditSubCategory