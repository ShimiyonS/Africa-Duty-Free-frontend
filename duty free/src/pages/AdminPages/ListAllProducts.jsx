import { useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditProducts from '../../components/AdminComponents/AddEditProducts';
import DeletePopup from '../../components/commonComponents/DeletePopup'

const ListAllProducts = () => {

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
                        slug: "dolce-gabana",
                        // productImage: DolceGabana,
                        stock: 22,
                        brand: "LG",
                        Description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application."
                    },
                    {
                        productid: 2,
                        name: "Fog",
                        price: 50,
                        slug: "fog",
                        // productImage: DolceGabana
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
            align: "center",
            width: 100,
            render: (_, record) => (
                <Space>
                    <AddEditProducts mode="edit" productData={record} />
                    <DeletePopup title={"Are you want to Delete this Product?"} apiEndpoint={`/products/${record.id}`} data={{id:record.id,image:"",name:record.productname}} />
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
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className="adminform-heading justuspro-medium mb-3">View Product List</h2>
                {/* drawer popup  */}
                <>
                    <AddEditProducts mode="add" productData={null} />
                </>
            </div>
            <Row justify={"space-between"} style={{ marginTop: "24px", marginBottom: "24px" }}>
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

            <Table dataSource={filteredData} columns={columns} />
        </>
    )
}

export default ListAllProducts
