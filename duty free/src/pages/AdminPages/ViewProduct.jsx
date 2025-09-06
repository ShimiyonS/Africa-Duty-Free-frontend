import React, { useState } from 'react'
import { Col, Dropdown, Flex, Form, Input, Menu, Row, Select, Space, Table } from "antd";
import { Button, Drawer } from 'antd';
import AddAndEditDrawer from './AddAndEditProductDrawer'
import { FaTimes } from "react-icons/fa";
import { MoreOutlined } from "@ant-design/icons";
const ViewProduct = () => {
    //filter state
    const [selectedColumn, setSelectedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    //popup stateopen
    const [open, setOpen] = useState(false);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    // "add" or "edit"
    const [drawerMode, setDrawerMode] = useState("add");
    const [editData, setEditData] = useState(null);
    const[drawerhandle, setDrawerhandle] = useState({})
    const categorys = [
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    products: [{
                        productid: 1,
                        name: "Dolce Gabana",
                        price: 33,
                        // productImage: DolceGabana,
                        stock: 22,
                        brand: "LG",
                        Description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
                    },
                    {
                        productid: 2,
                        name: "Fog",
                        price: 50,
                        // productImage: DolceGabana
                        stock: 27,
                        brand: "Samsung",
                    },
                    ]
                }
            ]
        }
    ]
    const dataSource = categorys.flatMap((cat, catindex) =>
        cat.subCategorys.flatMap((subc, subcindex) =>
            subc.products.map((product, pindex) => ({
                key: catindex,
                id: product.productid,
                productname: product.name,
                productcatagory: cat.name,
                productsubcatagory: subc.name,
                productbrand: product.brand || "",
                stock: product.stock || 0,
                // address: item.name
            }))
        ))
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Product Name',
            dataIndex: 'productname',
            key: 'productname',
        },
        {
            title: 'Product Catagory',
            dataIndex: 'productcatagory',
            key: 'productcatagory',
        },
        {
            title: 'Product Sub Catagory',
            dataIndex: 'productsubcatagory',
            key: 'productsubcatagory',
        },
        {
            title: 'Product Brand',
            dataIndex: 'productbrand',
            key: 'productbrand',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: "Action",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, record) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="edit" onClick={()=>setOpen(true)}>Edit</Menu.Item>
                        <Menu.Item key="delete" danger>
                             Delete
                        </Menu.Item>
                    </Menu>
                );
                return (
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
                    </Dropdown>
                );
            },
        },
    ];
    const filteredData = dataSource.filter((item) => {
        if (!searchText) return true; // If search box empty → show all
        const value = item[selectedColumn]?.toString().toLowerCase();
        return value?.includes(searchText.toLowerCase());
    });
    // drawer functions
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };
    // end of drawer functions
    return (
        <div className='table-responsive'>
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className="adminform-heading justuspro-medium mb-3">View Product List</h2>
                {/* drawer popup  */}
                <>
                    <Button
                        type="primary"
                        onClick={() => {
                            setDrawerMode("add");
                            setEditData(null);
                            showDrawer();
                        }}
                        className="text-color-secondary"
                    >
                        Add Product
                    </Button>
                    <Drawer title={
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <div className="d-flex align-items-center gap-2">
                                <Button type="text" onClick={onClose} icon={<FaTimes />} />
                                <span className="justuspro-bold">{drawerMode === "add" ? "Add Product" : "Edit Product"}</span>
                            </div>
                            <div>
                                <Button type="primary" onClick={showChildrenDrawer}>
                                    Add Category
                                </Button>
                            </div>
                        </div>
                    } className="justuspro-bold" width={800} closable={true} onClose={onClose} open={open}>
                        <div>
                            <div className="d-flex justify-content-between ">
                            </div>
                            {/* its coming from AddAndEdit Product drawer */}
                            <AddAndEditDrawer mode={drawerMode} productData={editData} />
                        </div>
                        {/* second drawer */}
                        <Drawer
                            title="Two-level Drawer"
                            width={800}
                            closable={false}
                            onClose={onChildrenDrawerClose}
                            open={childrenDrawer}
                        >
                            This is two-level drawer
                        </Drawer>
                    </Drawer>
                </>
            </div>
            <Row  justify={"space-between"}  style={{ marginTop: "24px", marginBottom: "24px" }}>
                <Col span={6}>
                    <Form.Item label="Filter option">
                        <Select
                            placeholder="Search..."
                            onChange={(value) => setSelectedColumn(value)}
                        >
                            <Option value="productname">Product Name</Option>
                            <Option value="productcatagory">Product Category</Option>
                            <Option value="productsubcatagory">Product Sub Category</Option>
                            <Option value="productbrand">Product Brand</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Filter value">
                        <Input
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            disabled={!selectedColumn}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Table bordered dataSource={filteredData} columns={columns} />
        </div>
    )
}
export default ViewProduct