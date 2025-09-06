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
    const mode = "add";
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
                <Form layout="vertical">
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

                        {/* <Col span={12}>
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
                                    <Button icon={<UploadOutlined />} style={{ width: "100%" }} type="primary">
                                        Click to Upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col> */}
                    </Row>
                    <Row gutter={16}>
                        {/* <Col span={12}>
                            <Form.Item
                                name="categories"
                                label={mode === "edit" ? "Edit Categories" : "Categories"}
                                rules={[{ required: true, message: 'Please choose the categories' }]}
                            >
                                <Select
                                    placeholder="Select Category"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    {category.map((cat) => (
                                        <Option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}
                        {/* <Col span={12}>
                            <Form.Item
                                name="subCategories"
                                label="Sub Categories"
                                rules={[{ required: true, message: 'Please choose the sub categories' }]}
                            >
                                <Select
                                    placeholder="Select Subcategory"
                                    value={selectedSubCategory}
                                    onChange={(value) => setSelectedSubCategory(value)}
                                    disabled={!subCategories.length} mode="multiple"
                                >
                                    {subCategories.map((sub) => (
                                        <Option key={sub.id} value={sub.id}>
                                            {sub.name}
                                        </Option>
                                    ))}
                                </Select>

                            </Form.Item>
                        </Col> */}
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
                    <div className="d-flex justify-content-end">
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </div>
                </Form>
                <Form layout='vertical'>
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