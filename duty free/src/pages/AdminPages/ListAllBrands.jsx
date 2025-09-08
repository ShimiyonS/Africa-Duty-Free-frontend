import { Table, Space } from "antd";
import AddEditBrand from '../../components/AdminComponents/AddEditBrand'
import { useState } from 'react';
import DeletePopup from '../../components/commonComponents/DeletePopup'


const ListAllCategories = () => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const brands = [
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            description:
                "Makeup and skincare products for daily beauty routine.",
            image: "",
        },
        {
            id: 2,
            name: "Fashion",
            slug: "fashion",
            description:
                "Latest trends in clothing, accessories, and lifestyle fashion.",
            image: "",
        },
        {
            id: 3,
            name: "Shoes",
            slug: "shoes",
            description: "Comfortable and stylish footwear for all occasions.",
            image: "",
        },
        {
            id: 4,
            name: "Electronics",
            slug: "electronics",
            description: "Modern gadgets, mobiles, laptops, and accessories.",
            image: "",
        },
        {
            id: 5,
            name: "Sports",
            slug: "sports",
            description: "Sports gear, fitness equipment, and outdoor essentials.",
            image: "",
        },
        {
            id: 6,
            name: "Home",
            slug: "home",
            description: "Furniture, décor, and household products.",
            image: "",
        },
        {
            id: 7,
            name: "Books",
            slug: "books",
            description: "Wide range of books across all genres and subjects.",
            image: "",
        },
        {
            id: 8,
            name: "Toys",
            slug: "toys",
            description: "Fun and educational toys for kids of all ages.",
            image: "",
        },
        {
            id: 9,
            name: "Groceries",
            slug: "groceries",
            description: "Daily essentials, food, and household groceries.",
            image: "",
        },
        {
            id: 10,
            name: "Health",
            slug: "health",
            description: "Healthcare products, supplements, and wellness items.",
            image: "",
        },
        {
            id: 11,
            name: "Jewellery",
            slug: "jewellery",
            description: "Gold, silver, and fashion jewellery collections.",
            image: "",
        },
        {
            id: 12,
            name: "Automobile",
            slug: "automobile",
            description: "Car accessories, spare parts, and bike essentials.",
            image: "",
        },
        {
            id: 13,
            name: "Stationery",
            slug: "stationery",
            description: "Office supplies, pens, books, and study materials.",
            image: "",
        },
        {
            id: 14,
            name: "Music",
            slug: "music",
            description: "Instruments, headphones, and audio accessories.",
            image: "",
        },
        {
            id: 15,
            name: "Gaming",
            slug: "gaming",
            description: "Video games, consoles, and gaming accessories.",
            image: "",
        },
        {
            id: 16,
            name: "Pets",
            slug: "pets",
            description: "Pet food, accessories, and care products.",
            image: "",
        },
        {
            id: 17,
            name: "Travel",
            slug: "travel",
            description: "Travel bags, luggage, and accessories.",
            image: "",
        },
        {
            id: 18,
            name: "Garden",
            slug: "garden",
            description: "Plants, gardening tools, and outdoor décor.",
            image: "",
        },
        {
            id: 19,
            name: "Furniture",
            slug: "furniture",
            description: "Living room, bedroom, and office furniture.",
            image: "",
        },
        {
            id: 20,
            name: "Kids Wear",
            slug: "kids-wear",
            description: "Trendy clothing and accessories for kids.",
            image: "",
        },
    ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
        },
        {
            title: 'Brand Image',
            dataIndex: 'image',
            key: 'image',
            width: 200,
            render: (text) => <img src={text} alt="brand-image" width={40} />,
        },
        {
            title: 'Brand Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Brand description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: 100,
            render: (_, record) => (
                <Space>
                    <AddEditBrand mode="edit" BrandData={record} />
                    <DeletePopup title={"Are you want to Delete this Brand ?"} apiEndpoint={`/products/${record.id}`} data={{ id: record.id, image: "", name: record.name }} />
                </Space>
            )
        },
    ];

    return (
        <div>
            <div>
                <div className='d-flex align-items-center justify-content-between'>
                    <h2 className="adminform-heading justuspro-medium mb-3">Brand List</h2>
                    {/* drawer popup  */}
                    <>
                        <AddEditBrand mode="add" BrandData={null} />
                    </>
                </div>

                <Table columns={columns} dataSource={brands} className="brand-pagination" pagination={{
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
                    showTotal: (total) => `Total ${total} Brands`,
                }} />

            </div>
        </div >

    )
}
export default ListAllCategories