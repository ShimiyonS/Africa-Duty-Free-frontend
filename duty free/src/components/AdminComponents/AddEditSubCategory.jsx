import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";

const AddEditSubCategory = ({ mode, subCategoryData }) => {
    const [form] = Form.useForm();
    const { apiRequest } = Common()
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const categorys = [
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
        },
        {
            id: 2,
            name: "Beauty",
            slug: "beauty",
        },
        {
            id: 3,
            name: "Beauty",
            slug: "beauty",
        },
        {
            id: 4,
            name: "Beauty",
            slug: "beauty",
        }

    ]
    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    //for showing edit datas in input fields
    useEffect(() => {
        console.log(subCategoryData, "categorydata");

        if (mode === "edit" && subCategoryData) {
            form.setFieldsValue({
                category: subCategoryData?.title,
                categorySlug: subCategoryData?.slug,
                description: subCategoryData?.description,
                uploadImage: subCategoryData?.images?.[0],
            });
        } else {
            form.resetFields();
        }
    }, [mode, subCategoryData, form]);


    const handleSubmit = async (values) => {

        try {
            const data = await apiRequest("POST", "/products/add", values)
            toast.success("Sub Category added successfully");
            form.resetFields();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <div>
            <Button type="primary" onClick={toggleDrawer} className={`${mode === "edit" ? "p-0" : ""} antd-custom-btn`} >
                {mode === "edit" ? <CiEdit /> : "Add Sub Category"}
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
                                    name="category"
                                    label={mode === "edit" ? "Edit Name" : "Name"}
                                    rules={[{ required: true, message: 'Please enter Sub Category name' }]}
                                >
                                    <Input placeholder="Please enter Sub Category name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="categorySlug"
                                    label={mode === "edit" ? "Edit slug" : " slug"}
                                    rules={[{ required: true, message: 'Please enter slug' }]}
                                >
                                    <Input placeholder="Please enter slug" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="categories"
                                    label={mode === "edit" ? "Edit Categories" : "Categories"}
                                    rules={[{ required: true, message: 'Please choose the Sub categories' }]}
                                >
                                    <Select
                                        placeholder="Select Category"
                                        mode="multiple"
                                    >
                                        {categorys.map((cat) =>
                                            <Option key={cat.id} value={cat.id} >
                                                {cat.name}
                                            </Option>)}
                                    </Select>
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