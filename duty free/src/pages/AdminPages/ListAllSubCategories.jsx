import { Table, Space } from "antd";
import AddEditSubCategories from '../../components/AdminComponents/AddEditSubCategory'
import { useState } from 'react';
import DeletePopup from '../../components/commonComponents/DeletePopup'
import AddEditSubCategory from './../../components/AdminComponents/AddEditSubCategory';


const ListAllSubCategories = () => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    const subCategories = [
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            description:
                "Makeup and skincare products for daily beauty routine.",
            image: "data:image/jpeg;base64,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",
        },
        {
            id: 2,
            name: "Fashionsssssssdddddddddsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssshhhhhhhhhhhhhhhhhhhhhhhhhhhh",
            slug: "fashion",
            description:
                "Latest trends in clothing, accessories, and lifestyle fashion.Latest trends in clothing, accessories, and lifestyle fashion.Latest trends in clothing, accessories, and lifestyle fashion.Latest trends in clothing, accessories, and lifestyle fashion.",
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
            name: "GroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceriesGroceries",
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
            width: 50
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 150,
            render: (text) => <img src={text} alt="sub-category-image" width={40} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            ellipsis: true
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            ellipsis: true
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: 100,
            render: (_, record) => (
                <Space>
                    <AddEditSubCategories mode="edit" subCategoryData={record} />
                    <DeletePopup title={"Are you want to Delete this Sub Category ?"} apiEndpoint={`/products/${record.id}`} data={{ id: record.id, image: "", name: record.name }} />
                </Space>
            )
        },
    ];

    return (
        <div>
            <div>
                <div className='d-flex align-items-center justify-content-between'>
                    <h2 className="adminform-heading justuspro-medium mb-3">Sub Category List</h2>
                    {/* drawer popup  */}
                    <>
                        <AddEditSubCategories mode="add" subCategoryData={null} />
                    </>
                </div>

                <Table columns={columns} dataSource={subCategories} className="sub-category-pagination" pagination={{
                    position: ["bottomCenter"],
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50"],
                    showQuickJumper: true,
                    onChange: (page, pageSize) => {
                        setPagination({ current: page, pageSize });
                    },
                    showTotal: (total) => `Total ${total} subCategories`,
                }} />

            </div>
        </div >

    )
}
export default ListAllSubCategories