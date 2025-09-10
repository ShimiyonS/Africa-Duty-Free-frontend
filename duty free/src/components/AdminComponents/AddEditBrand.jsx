import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Image, Input, Row, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';


const AddEditBrandDrawer = ({ mode, brandData }) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const { apiRequest, generateSlug } = Common()
    const [childrenDrawer, setChildrenDrawer] = useState(false);
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
                uploadImage: brandData.image
                    ? [
                        {
                            uid: '-1',
                            name: 'category-image.png',
                            status: 'done',
                            url: brandData.image,
                        },
                    ]
                    : [],
            });
        } else {
            form.resetFields();
        }
    }, [mode, brandData, form]);


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
                                    <Input placeholder="Please enter Brand name" onBlur={(e) => { handleSlug(e.target.value, "brandSlug") }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="brandSlug"
                                    label={mode === "edit" ? "Edit Slug" : " Slug"}
                                    rules={[{ required: true, message: 'Please enter slug' }]}
                                >
                                    <Input placeholder="Please enter slug" onBlur={(e) => { handleSlug(e.target.value, "brandSlug") }} />
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
export default AddEditBrandDrawer