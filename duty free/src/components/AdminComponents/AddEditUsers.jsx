import { useState, useEffect } from 'react'
import { Button, Col, Drawer, Form, Input, Row, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Common from '../../commonMethod/common.js'
import { toast } from "react-toastify";
import { FaRegEdit } from 'react-icons/fa';
const AddEditUsers = ({ mode, userData }) => {

    const { apiRequest } = Common()
    const [form] = Form.useForm();

    //popup stateopen
    const [drawerState, setDrawerState] = useState(false);

    // Drawer functions
    const toggleDrawer = () =>
        setDrawerState(!drawerState);
   

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
    useEffect(() => {
        if (mode === "edit" && userData) {
            form.setFieldsValue({
                userName: userData?.username,
                email: userData?.emailaddress,
                phone: userData?.phone,
                UploadImage: userData?.profile,
            });
        } else {
            form.resetFields();
        }
    }, [mode, userData, form]);


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
                                        name="UploadImage"
                                        label={mode === "edit" ? "Edit Image" : "Upload Image"}
                                        rules={[{ required: true, message: 'Please upload image' }]}
                                    >
                                        <Upload
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
                                            <Button icon={<UploadOutlined />}>
                                                Click to Upload
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
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