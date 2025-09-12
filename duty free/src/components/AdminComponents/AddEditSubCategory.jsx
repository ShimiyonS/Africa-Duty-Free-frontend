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

    const categorys = [
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
        },
        {
            id: 2,
            name: "Fog",
            slug: "fog",
        },
        {
            id: 3,
            name: "Whine",
            slug: "whine",
        },
        {
            id: 4,
            name: "LG",
            slug: "lg",
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
            const data = await apiRequest("POST", "/products/add", values)
            toast.success("Sub Category added successfully");
            form.resetFields();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        finally {
            setLoading(false)
        }
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
                                    name="subCategory"
                                    label={mode === "edit" ? "Edit Name" : "Name"}
                                    rules={[{ required: true, message: 'Please enter Sub Category name' }]}
                                >
                                    <Input placeholder="Please enter Sub Category name" onBlur={(e) => { handleSlug(e.target.value, "subCategorySlug") }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="subCategorySlug"
                                    label={mode === "edit" ? "Edit Slug" : " Slug"}
                                    rules={[{ required: true, message: 'Please enter slug' }]}
                                >
                                    <Input placeholder="Please enter slug" onBlur={(e) => { handleSlug(e.target.value, "subCategorySlug") }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="categories"
                                    label={mode === "edit" ? "Edit Categories" : "Categories"}
                                    rules={[{ required: true, message: 'Please choose the Sub categories' }]}
                                >
                                    <Select
                                        placeholder="Select Category"
                                    >
                                        {categorys.map((cat) =>
                                            <Option key={cat.id} value={cat.id} >
                                                {cat.name}
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