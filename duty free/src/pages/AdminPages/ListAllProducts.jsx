import { useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditProducts from '../../components/AdminComponents/AddEditProducts';
import DeletePopup from '../../components/commonComponents/DeletePopup';
import AdminHeader from '../../components/AdminComponents/AdminHeader';

const ListAllProducts = () => {

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    //filter state
    const [searchField, setSearchField] = useState("");
    const [searchText, setSearchText] = useState("");

    const changeSearchField = (value) => {
        setSearchField(value)
        setSearchText("")
    }

    const categorys = [
        {
            id: 1,
            name: "Beautyvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",
            slug: "beauty",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    products: [{
                        productid: 1,
                        name: "Dolce Gabana ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true ellipsis: true",
                        price: 33,
                        slug: "dolce-gabana",
                        stock: 22,
                        brand: "LG",
                        Description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
                    },
                    {
                        productid: 2,
                        name: "Fog",
                        price: 50,
                        slug: "fog",
                        stock: 27,
                        brand: "Samsung",
                        Description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
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
                price: product.price,
                description: product.Description,
                productSlug: product.slug
                // address: item.name
            }))
        ))

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 50,
        },
        {
            title: 'Product Name',
            dataIndex: 'productname',
            key: 'productname',
            width: 150,
            ellipsis: true
        },
        {
            title: 'Product Category',
            dataIndex: 'productcatagory',
            key: 'productcatagory',
            width: 150,
            ellipsis: true
        },
        {
            title: 'Product Sub Category',
            dataIndex: 'productsubcatagory',
            key: 'productsubcatagory',
            width: 150,
            ellipsis: true
        },
        {
            title: 'Product Brand',
            dataIndex: 'productbrand',
            key: 'productbrand',
            width: 150,
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
            width: 100,
            render: (_, record) => (
                <Space>
                    <AddEditProducts mode="edit" productData={record} />
                    <DeletePopup title={"Are you want to Delete this Product?"} apiEndpoint={`/products/${record.id}`} data={{ id: record.id, image: "", name: record.productname }} />
                </Space>
            )
        },
    ];

    let filteredData = dataSource.filter((item) => {
        if (!searchText) return true; // If search box empty → show all

        const value = item[searchField]?.toString().toLowerCase();
        return value?.includes(searchText.toLowerCase());
    });


    return (
        <>
            <AdminHeader title={`View Products`} addComponent={<AddEditProducts mode="add" productData={null} />} hideBack={true} />

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

            <Table dataSource={filteredData} columns={columns} scroll={{ x: "max-content" }} className='product-page-table brand-pagination' pagination={{
                position: ["bottomCenter"],
                current: pagination.current,
                pageSize: pagination.pageSize,
                // total: brands.length,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
                showQuickJumper: true,
                onChange: (page, pageSize) => {
                    setPagination({ current: page, pageSize });
                },
                showTotal: (total) => `Total ${total} Products`,
            }} />
        </>
    )
}

export default ListAllProducts
