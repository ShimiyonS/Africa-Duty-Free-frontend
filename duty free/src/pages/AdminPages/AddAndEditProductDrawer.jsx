import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";


const AddProductDrawer = ({ mode, productData }) => {
    const { Option } = Select;
    const { apiRequest } = Common()
    const [form] = Form.useForm();

    const token = localStorage.getItem("token")

    const props = {
        name: 'file',
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        headers: {
            authorization: `Bearer ${token}`,
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const handleSubmit = async (values) => {
        try {

            const data = await apiRequest("POST", "/products/add", values)
            toast.success("Product added successfully");
            form.resetFields();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }
    useEffect(() => {
        if (mode === "edit" && productData) {
            form.setFieldsValue({
                Product: productData?.title,
                ProductSlug: productData?.slug,
                ProductPrice: productData?.price,
                UploadImage: productData?.images?.[0],
                categories: productData?.category,
                subCategories: productData?.subCategory,
                description: productData?.description,
            });
        } else {
            form.resetFields();
        }
    }, [mode, productData, form]);

    return (
        <div>
            <>
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="Product"
                                label={mode === "add" ? "Product Name" : "Edit name"}
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="Please enter product name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="ProductSlug"
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
                                name="ProductPrice"
                                label={mode === "edit" ? "Edit Price" : "Product Price"}
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <Input type="number" placeholder="Please enter price" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="UploadImage"
                                label={mode === "edit" ? "Edit Image" : "Upload Image"}
                                rules={[{ required: true, message: 'Please upload image' }]}
                            >
                                <Upload style={{ width: "100%" }}
                                    {...props}
                                    listType="picture"
                                    maxCount={1}
                                    onChange={(info) => {
                                        if (info.file.status === 'done') {
                                            const url = info.file.response.url;
                                            form.setFieldsValue({ UploadImage: url });
                                        }
                                    }}
                                >
                                    <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                                        Click to Upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="categories"
                                label={mode === "edit" ? "Edit Categories" : "categories"}
                                rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <Select placeholder="Please choose the categories">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="subCategories"
                                label={mode === "edit" ? "Edit Sub Categories" : "sub Categories"}
                                rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <Select placeholder="Please choose the sub categories">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
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
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </>
        </div>
    )
}

export default AddProductDrawer