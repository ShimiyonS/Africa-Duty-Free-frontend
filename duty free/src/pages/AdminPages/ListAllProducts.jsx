import { useEffect, useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditProducts from '../../components/AdminComponents/AddEditProducts';
import DeletePopup from '../../components/commonComponents/DeletePopup'
import { toast } from 'react-toastify';
import common from '../../commonMethod/common.js';
import AdminHeader from "../../components/AdminComponents/AdminHeader"
import { Link } from 'react-router-dom';

const ListAllProducts = () => {

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    //filter state
    const [searchField, setSearchField] = useState("");
    const [searchText, setSearchText] = useState("");

    const { apiRequest } = common()
    const [productData, setProductData] = useState([])
    const changeSearchField = (value) => {
        setSearchField(value)
        setSearchText("")
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: 50,
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            width: 150,
            ellipsis: true,
            render: (text, record) => (
                <Link to={`/product/${record.productSlug}`} className="ant-link">
                    {text}
                </Link>
            )
        },
        {
            title: 'Product Category',
            dataIndex: 'productcatagory',
            key: 'productcatagory',
            width: 150,
            ellipsis: true,
            render: (_, item) => (
                <div>{item?.subCategory?.category?.categoryName}</div>
            )
        },
        {
            title: 'Product Sub Category',
            dataIndex: 'productsubcatagory',
            key: 'productsubcatagory',
            width: 150,
            ellipsis: true,
            render: (_, item) => (
                <div>{item?.subCategory?.subcategoryName}</div>
            ),
        },
        {
            title: 'Product Brand',
            dataIndex: 'productbrand',
            key: 'productbrand',
            width: 150,
            render: (_, item) => (
                <div>{item?.brand || "-"}</div>
            )
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: 150,
            render: (_, item) => (
                <div>{item.price}</div>
            ),
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            width: 150,
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: 150,
            render: (_, record) => (
                <Space>
                    <AddEditProducts mode="edit" productData={record} />
                    <DeletePopup title={"Are you want to Delete this Product?"} apiEndpoint={`/products/${record.id}`} data={{ id: record.id, image: record?.imageUrl, name: record.productName }} />
                </Space>
            )
        },
    ];

    const fetchProducts = async () => {
        try {
            const products = await apiRequest("GET", "/product",)
            setProductData(products?.products)
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <AdminHeader title={`View Products`} addComponent={<AddEditProducts mode="add" productData={null} />} hideBack={true} />

            <Row justify={"space-between"} className='admin-header-space'>
                <Col xs={24} sm={12} md={10} xl={8}>
                    <Form.Item label="Filter option">
                        <Select
                            placeholder="Search..."
                            onChange={(value) => changeSearchField(value)}
                        >
                            <Option value="productname">Product Name</Option>
                            <Option value="productcatagory">Product Category</Option>
                            <Option value="productsubcatagory">Product Sub Category</Option>
                            <Option value="productbrand">Product Brand</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={10} xl={8}>
                    <Form.Item label="Filter value">
                        <Input
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            disabled={!searchField}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <div className="antd-table-wrapper">
                <div className="antd-radius-table antd-order-container" >
                    <Table dataSource={productData} columns={columns} scroll={{ x: 800 }} className='product-page-table brand-pagination' pagination={{
                        position: ["bottomCenter"],
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50"],
                        showQuickJumper: true,
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        },
                        showTotal: (total) => `Total ${total} Products`,
                    }} />
                </div>
            </div>
        </>
    )
}

export default ListAllProducts
