import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Image, Input, Row, Select, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';
const AddEditUsers = ({ mode, userData }) => {

    const { apiRequest } = Common()
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const getBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

    // checking upload image
    const normFile = (e) => Array.isArray(e) ? e : e?.fileList;

    //popup stateopen
    const [drawerState, setDrawerState] = useState(false);

    // Drawer functions
    const toggleDrawer = () =>
        setDrawerState(!drawerState);


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

    const confirmPasswordValidator = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error("Passwords do not match!"));
        },
    });

    useEffect(() => {
        if (mode === "edit" && userData) {
            form.setFieldsValue({
                userName: userData?.username,
                email: userData?.email,
                phone: userData?.phone,
                status: userData?.status,
                uploadImage: userData?.profile
                    ? [
                        {
                            uid: '-1',
                            name: 'user-image.png',
                            status: 'done',
                            url: userData.profile,
                        },
                    ]
                    : [],
            });
        } else {
            form.resetFields();
        }
    }, [mode, userData, form]);


    // Handle image preview
    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };


    return (
        <div>
            <>
                <Button
                    type={mode === "edit" ? "link" : "primary"}
                    onClick={toggleDrawer}
                    className={`antd-custom-btn`}
                >
                    {mode === "edit" ? <FaRegEdit size={19} className='text-color-warning' /> : "Add User"}
                </Button>
                <Drawer title={
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-center gap-2">
                            <span className="justuspro-bold">{mode === "add" ? "Add User" : "Edit User"}</span>
                        </div>
                    </div>

                } className="justuspro-bold" width={800} closable={true} onClose={toggleDrawer} open={drawerState}>

                    <div>
                        <Form layout="vertical" form={form} onFinish={handleSubmit}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="userName"
                                        label="User Name"
                                        rules={[{ required: true, message: 'Please enter product name' }]}
                                    >
                                        <Input type='text' name="userName" placeholder="Please enter userName" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="email"
                                        label="Email Address"
                                        rules={[{ required: true, message: 'Please enter Email Address' }]}
                                    >
                                        <Input type='email' name="email" placeholder="Please enter Email Address" />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"
                                        rules={[{ required: true, message: 'Please enter Phone Number' }]}
                                    >
                                        <Input type="number" name="phone" className='ant-disable-control' onKeyDown={validateNumberInput} onInput={validateNumberInput} placeholder="Please enter Phone Number" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="status"
                                        label={mode === "edit" ? "Edit Status" : "Status"}
                                        rules={[{ required: true, message: 'Please choose the Sub Status' }]}
                                    >
                                        <Select placeholder="Select Status">
                                            <Option key={1} value={false} >
                                                In Active
                                            </Option>
                                            <Option key={2} value={true} >
                                                Active
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            { required: true, message: "Please enter your password" },
                                            {
                                                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
                                                message:
                                                    "Password must have 1 capital, 1 number, 1 special char and min 8 length",
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password placeholder="Enter password" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        dependencies={["password"]}
                                        hasFeedback
                                        rules={[
                                            { required: true, message: "Please confirm your password" },
                                            confirmPasswordValidator,
                                        ]}
                                    >
                                        <Input.Password placeholder="Confirm password" />
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
                                            beforeUpload={() => false}
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
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>

                </Drawer>

            </>
        </div>
    )
}

export default AddEditUsers