import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import common from '../../commonMethod/common';
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';


const AddEditCategory = ({ setShareValue, mode, categoryData }) => {
    const [form] = Form.useForm();
    const { apiRequest, generateSlug } = common()
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    const handleSlug = (value, placeArea) => {
        const slug = generateSlug(value);
        form.setFieldsValue({ [placeArea]: slug })
    }

    //for showing edit datas in input fields
    useEffect(() => {

        console.log("categoryData", categoryData)
        if (mode === "edit" && categoryData) {
            form.setFieldsValue({
                category: categoryData?.categoryName,
                categorySlug: categoryData?.slug,
                description: categoryData?.description,
                uploadImage: categoryData?.image,
            });
        } else {
            form.resetFields();
        }
    }, [mode, categoryData, form]);


    const handleSubmit = async (values) => {
        try {
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
            const categoryData = {
                categoryName: values.category,
                slug: values.categorySlug,
                description: values.description,
                image: imageURL?.url,
            }
            await apiRequest("POST", "/category/create", categoryData)
            toast.success("Category added successfully");
            setShareValue(values)
            form.resetFields();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <div>
            <Button type={mode === "edit" ? "link" : "primary"} onClick={toggleDrawer} className="antd-custom-btn">
                {mode === "edit" ? <FaRegEdit size={19} className="text-color-warning" /> : "Add Category"}
            </Button>
            <>
                <Drawer
                    title={<div className="d-flex align-items-center justify-content-between w-100">
                        <div>
                            <span> {mode === "edit" ? "Edit Category" : "Add Category"}</span>
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
                                    name="category"
                                    label={mode === "edit" ? "Edit Name" : "Name"}
                                    rules={[{ required: true, message: 'Please enter Category name' }]}
                                >
                                    <Input placeholder="Please enter Category name" onBlur={(e) => { handleSlug(e.target.value, "categorySlug") }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="categorySlug"
                                    label={mode === "edit" ? "Edit Slug" : " Slug"}
                                    rules={[{ required: true, message: 'Please enter slug' }]}
                                >
                                    <Input placeholder="Please enter slug" onBlur={(e) => { handleSlug(e.target.value, "categorySlug") }} />
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
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="uploadImage"
                                    label={mode === "edit" ? "Edit Image" : "Upload Image"}
                                    rules={[{ required: true, message: 'Please upload image' }]}
                                >
                                    <Upload accept=".jpg,.png,.jpeg,.png" className="antd-custom-btn" beforeUpload={() => false}>
                                        <Button icon={<UploadOutlined />} type="primary">Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                            <Button type="primary" htmlType="submit" className="antd-custom-btn" >
                                {mode === "edit" ? "Update" : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </Drawer>

            </>
        </div>
    )
}

export default AddEditCategory