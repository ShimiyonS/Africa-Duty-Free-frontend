import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Button, Col, Drawer, Form, Input, Row } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import DebounceSelect from '../../components/DebounceSelete';
import AddCategory from '../../components/AddCategory';
import AddSubCategory from '../../components/AddSubCategory';

const AddProduct = ({ handleRefresh }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onClose = () => {
        // form.resetFields();
        setOpen(false);
        setLoading(false);
    };


    const staticCategories = [
        { label: "Fragrance", value: "fragrance" },
        { label: "Skincare", value: "skincare" },
        { label: "Gift Sets", value: "giftsets" },
        { label: "Accessories", value: "accessories" },
    ];

    // Fake fetch function
    const fetchStaticCategories = () =>
        new Promise((resolve) => {
            resolve(staticCategories);
        });

    const handelChangeProductCategory = async () => {

    }
    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} icon={<PlusOutlined />}>
                Add Product
            </Button>
            <Drawer title="Add Product" onClose={onClose} open={open} width={820} maskClosable={false}
                extra={
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <AddCategory handleRefresh={handleRefresh} />
                        <AddSubCategory handleRefresh={handleRefresh} />
                    </div>
                }>
                <Form>
                    <Row gutter={[16]}>
                        <Col span={12}>
                            <Form.Item name="name" label="Product Name" rules={[{ required: true, message: "Please enter your name" }]}>
                                <Input size="default" placeholder="Enter Lead Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="name" label="Product Slug name" rules={[{ required: true, message: "Please enter your name" }]}>
                                <Input size="default" placeholder="Enter Product Slug Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name=""
                                label="Project Name"
                                rules={[{ required: true, message: "Please select Project Name" }]}
                            >
                                <DebounceSelect
                                    placeholder="Select Catagory Name"
                                    fetchOptions={fetchStaticCategories}
                                    onChange={handelChangeProductCategory}
                                    style={{
                                        width: "100%",
                                    }}
                                />
                                {/* <Select
                  size="default"
                  allowClear
                  onChange={handleProjectChange}
                  options={filteredProjectOptions}
                  placeholder="Select Project Name"
                /> */}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}

AddProduct.propTypes = {
    handleRefresh: PropTypes.func,
};

export default AddProduct