import { useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import catimage from "../../assets/blinkbottle.png"
import DeletePopup from '../../components/commonComponents/DeletePopup';
import AdminHeader from '../../components/AdminComponents/AdminHeader';
import AddEditCategory from '../../components/AdminComponents/AddEditCategory';

const ListAllCategory = () => {

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
            name: "Beauty",
            slug: "beauty",
            image: catimage,
            description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
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
        },
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            image: catimage,
            description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
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
        },
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            image: catimage,
            description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
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
        },
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            image: catimage,
            description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
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
        },
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            image: catimage,
            description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
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
        },
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            image: catimage,
            description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
            subCategorys: [
                {
                    id: 1,
                    name: "Fragrances",
                    slug: "fragrances",
                    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
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
        },
    ]

    const dataSource = categorys.map((cat, catindex) => ({
        key: catindex,
        SNO: catindex + 1,
        image: cat.image,
        categoryName: cat.name,
        description: cat.description,
        slug: cat.slug
    }))

    const columns = [
        {
            title: '#',
            dataIndex: 'SNO',
            key: 'SNO',
            fixed: 'left',
            width: 25
        },
        {
            title: 'Category Image',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            align: "center",
            render: (text) => (
                <img
                    src={text}
                    alt="profile"
                    className='admin-table-img'
                />
            )
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: 100,
            ellipsis: true
        },
        {
            title: 'Category Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            ellipsis: true
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: "150px",
            fixed: "right",
            render: (_, record) => (
                <Space>
                    <AddEditCategory mode={"edit"} categoryData={record} />
                    <DeletePopup title={"Are you want to Delete this Category?"} apiEndpoint={`/Category/${record.id}`} data={{ id: record.id, image: record.profile, name: record.username }} />
                </Space>
            ),
        }

    ];

    let filteredData = dataSource.filter((item) => {
        if (!searchText) return true; // If search box empty → show all

        const value = item[searchField]?.toString().toLowerCase();
        return value?.includes(searchText.toLowerCase());
    });


    return (
        <>
            <AdminHeader title={`View Category`} addComponent={<AddEditCategory mode="add" categoryData={null} />} hideBack={true} />

            <Row justify={"space-between"} className='admin-header-space'>
                <Col xs={24} sm={12} md={10} xl={8}>
                    <Form.Item label="Filter option">
                        <Select
                            placeholder="Search..."
                            onChange={(value) => changeSearchField(value)}
                        >
                            <Option value="categoryName">Category Name</Option>
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

            <Table dataSource={filteredData} columns={columns} className='brand-pagination' pagination={{
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
                showTotal: (total) => `Total ${total} Categorys`,
            }} />
        </>
    )
}

export default ListAllCategory
