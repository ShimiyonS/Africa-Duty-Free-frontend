import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';


const AddEditBrandDrawer = ({ mode, brandData }) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const { apiRequest, generateSlug } = Common()
    const [childrenDrawer, setChildrenDrawer] = useState(false);

    const handleSlug = (value, placeArea) => {
        const slug = generateSlug(value);
        form.setFieldsValue({ [placeArea]: slug })
    }

    const toggleDrawer = () => {
        setChildrenDrawer(!childrenDrawer);
    };

    //for showing edit datas in input fields
    useEffect(() => {
        if (mode === "edit" && brandData) {
            form.setFieldsValue({
                brand: brandData?.name,
                brandSlug: brandData?.slug,
                description: brandData?.description,
                uploadImage: brandData?.images?.[0],
            });
        } else {
            form.resetFields();
        }
    }, [mode, brandData, form]);

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const data = await apiRequest("POST", "/products/add", values)
            toast.success("Brand added successfully");
            form.resetFields();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false)
        }
    }
    // checking upload image
    const normFile = (e) => Array.isArray(e) ? e : e?.fileList;

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
                                    <Input placeholder="Please enter Brand name" onBlur={(e) => { handleSlug(e.target.value,"brandSlug")}} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="brandSlug"
                                    label={mode === "edit" ? "Edit Slug" : " Slug"}
                                    rules={[{ required: true, message: 'Please enter slug' }]}
                                >
                                    <Input placeholder="Please enter slug"  onBlur={(e) => { handleSlug(e.target.value,"brandSlug")}}  />
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
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    label={mode === "edit" ? "Edit Image" : "Upload Image"}
                                    rules={[{ required: true, message: 'Please upload image' }]}
                                >
                                    <Upload accept=".jpg,.png,.jpeg,.png" beforeUpload={() => { return false; }} className="antd-custom-btn">
                                        <Button icon={<UploadOutlined />} type="primary">Upload</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
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
export default AddEditBrandDrawer