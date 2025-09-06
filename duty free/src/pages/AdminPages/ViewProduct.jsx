import React, { useEffect, useState } from 'react'
import Common from '../../commonMethod/common.js'
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdManageSearch } from "react-icons/md";
import Pagination from '../../components/commonComponents/Pagination';
import DeletePopup from '../../components/commonComponents/DeletePopup';
import { Button } from 'antd';
import AddAndEditProductDrawer from './AddAndEditProductDrawer'


const ViewProduct = () => {

    //filter state
    const [selectedColumn, setSelectedColumn] = useState("productname");
    const [searchText, setSearchText] = useState("");

    //popup state
    const [open, setOpen] = useState(false);

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
                        <Menu.Item key="edit">✏️ Edit</Menu.Item>
                        <Menu.Item key="delete" danger>
                            🗑️ Delete
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

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await apiRequest("DELETE", `/products/${id}`);
            setProduct((prev) => prev.filter((p) => p.id !== id)); // remove locally
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const skip = (page - 1) * pageSize
                const endpoint = search
                    ? `/products/search?q=${search}&limit=${pageSize}&skip=${skip}`
                    : `/products?limit=${pageSize}&skip=${skip}`;

                const data = await apiRequest("GET", endpoint);

                setProduct(data.products || [])
                setTotalPages(Math.ceil(data.total / pageSize)) // ✅ fix: based on API total
            } catch (error) {
                console.error(error)
            }
        }
        fetchProduct();
    }, [ page, pageSize])

    return (
        <>
      
        <div className='table-responsive'>
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className="adminform-heading justuspro-medium mb-3">View Product List</h2>
                {/* drawer popup  */}
                <>
                    <AddAndEditProductDrawer mode="add" productData={null} />
                </>
            </div>
            <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
                <Col span={6}>
                    <Select
                        defaultValue="productname"
                        style={{ width: 200 }}
                        onChange={(value) => setSelectedColumn(value)} >
                        <Option value="productname">Product Name</Option>
                        <Option value="productcatagory">Product Category</Option>
                        <Option value="productsubcatagory">Product Sub Category</Option>
                        <Option value="productbrand">Product Brand</Option>
                    </Select>
                </Col>

                <Col span={6}>
                    <Input
                        placeholder="Search..."
                        style={{ width: 250 }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Col>
            </Row>

                {/* 📦 Products table */}
                <table className='container table-responsive'>
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Details</th>
                            <th>Product Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((item, index) => (
                            <tr key={item.id || index}>
                                <td>{item.id}</td>
                                <td>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <img src={item.images[0]} className='admin-product-view' alt="product-img" />
                                        <p className='m-0 ms-3 product-table-title'>{item.title}</p>
                                    </div>
                                </td>
                                <td>{item.price}</td>
                                <td>
                                    <div
                                        className='admin-action'
                                        onMouseLeave={() => setOpenMenuId(null)}
                                    >
                                        <button
                                            className='btn border-0 bg-transparent p-0'
                                            onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                                        >
                                             <MdDelete className="me-2" size={30} />
                                        </button>

                                        {openMenuId === item.id && (
                                            <div className='admin-product-action'>
                                                <button onClick={() => openPopup(item)}>  <MdDelete className="me-2" size={30} /></button>
                                            </div>
                                        )}
                                    </div>
                                    <Button type="primary">
                                        <AddAndEditProductDrawer mode="edit" productData={item} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* 📄 Pagination */}
                <div className="m-3">
                    <Pagination
                        currentPage={page}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onPageSizeChange={(newSize) => {
                            setPageSize(newSize);
                            setPage(1); // reset to page 1
                        }}
                    />
                </div>
            </div>

            {/* ❌ Delete confirmation popup */}
            {deleteDetails !== null && (
                <DeletePopup alertmessage={"Are you sure want to delete this product?"} handleDelete={() => handleDelete(deleteDetails.id)} data={deleteDetails} handleclose={closePopup} />
            )}
     </>
    )
}

export default ViewProduct
