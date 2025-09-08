import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Upload, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';


const AddEditBrandDrawer = ({ mode, BrandData }) => {
    const [form] = Form.useForm();
    const { apiRequest } = Common()
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    //for showing edit datas in input fields
    useEffect(() => {

        if (mode === "edit" && BrandData) {
            form.setFieldsValue({
                brand: BrandData?.name,
                brandSlug: BrandData?.slug,
                description: BrandData?.description,
                uploadImage: BrandData?.images?.[0],
            });
        } else {
            form.resetFields();
        }
    }, [mode, BrandData, form]);

    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
    };


    const handleSubmit = async (values) => {
        try {
            const data = await apiRequest("POST", "/products/add", values)
            toast.success("Brand added successfully");
            console.log("values", values);

            form.resetFields();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <div>
            <Button type={mode === "edit" ? "link" : "primary"} onClick={toggleDrawer} className="antd-custom-btn">
                {mode === "edit" ? <FaRegEdit size={19} className="text-color-warning" /> : "Add Brand"}
            </Button>
            <>
                <Drawer
                    title={<div className="d-flex align-items-center justify-content-between w-100">
                        <div>
                            <span> {mode === "edit" ? "Edit Brand" : "Add Brand"}</span>
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
                                    name="brand"
                                    label={mode === "edit" ? "Edit Name" : "Name"}
                                    rules={[{ required: true, message: 'Please enter Brand name' }]}
                                >
                                    <Input placeholder="Please enter Brand name" onBlur={(e) => { const slug = generateSlug(e.target.value); form.setFieldsValue({ brandSlug: slug }) }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="brandSlug"
                                    label={mode === "edit" ? "Edit slug" : " slug"}
                                    rules={[{ required: true, message: 'Please enter slug' }]}
                                >
                                    <Input placeholder="Please enter slug" onBlur={(e) => { const updatedSlug = generateSlug(e.target.value); form.setFieldsValue({ brandSlug: updatedSlug }) }} />
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
                                    <Upload style={{ width: "100%" }} accept=".jpg,.png,.jpeg,.png" beforeUpload={() => { return false; }} className="antd-custom-btn">
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

export default AddEditBrandDrawer