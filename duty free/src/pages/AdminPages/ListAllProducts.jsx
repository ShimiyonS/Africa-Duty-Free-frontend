import { useEffect, useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditProducts from '../../components/AdminComponents/AddEditProducts';
import DeletePopup from '../../components/commonComponents/DeletePopup'
import { toast } from 'react-toastify';
import common from '../../commonMethod/common';

const ListAllProducts = () => {

    //filter state
    const [searchField, setSearchField] = useState("");
    const [searchText, setSearchText] = useState("");

    const { apiRequest } = common()
    const [productData, setProductData] = useState([])
    const changeSearchField = (value) => {
        setSearchField(value)
        setSearchText("")
    }



    // const dataSource = productData.flatMap((product, pidx) =>
    //     product.subCategory.flatMap((subc) =>
    //         subc.category.map((cat) => ({
    //             key: pidx,
    //             id: product.productid,
    //             productname: product.productName,
    //             productcatagory: cat.categoryName,
    //             productsubcatagory: subc.subcategoryName,
    //             productbrand: product.brand || "",
    //             stock: product.stock || 0,
    //             price: product.price,
    //             description: product.description,
    //             productSlug: product.slug
    //             // address: item.name
    //         }))
    //     ))

    const dataSource = productData.map((product, pidx) => ({
        key: pidx,
        id: product?.id,
        productname: product?.productName,
        productcatagory: product?.subCategory?.category?.categoryName,
        productsubcatagory: product?.subCategory?.subcategoryName,
        productbrand: product?.brand || "",
        stock: product?.stock || 0,
        price: product?.price,
        description: product?.description,
        productSlug: product?.slug
    }))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Product Catagory',
            dataIndex: 'productcatagory',
            key: 'productcatagory',
            render: (_, item) => (
                <div>{item?.subCategory?.category?.categoryName}</div>
            )
        },
        {
            title: 'Product Sub Catagory',
            dataIndex: 'productsubcatagory',
            key: 'productsubcatagory',
            render: (_, item) => (
                <div>{item?.subCategory?.subcategoryName}</div>
            )
        },
        {
            title: 'Product Brand',
            dataIndex: 'productbrand',
            key: 'productbrand',
            render: (_, item) => (
                <div>{item?.brand || "-"}</div>
            )
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (_, item) => (
                <div>{item.price}</div>
            )

        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: 100,
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
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className="adminform-heading justuspro-medium mb-3">View Product List</h2>
                {/* drawer popup  */}
                <>
                    <AddEditProducts mode="add" productData={null} />
                </>
            </div>
            <Row justify={"space-between"} className='admin-header-space'>
                <Col span={6}>
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

                <Col span={6}>
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
                <Table dataSource={productData} columns={columns} className='product-page-table'/>
        </>
    )
}

export default ListAllProducts
