import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditBrand from '../../components/AdminComponents/AddEditBrand'
import { useState } from 'react';
import DeletePopup from '../../components/commonComponents/DeletePopup'
import AdminHeader from '../../components/AdminComponents/AdminHeader';


const ListAllBrand = () => {
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

    const brands = [
        {
            id: 1,
            name: "Beauty",
            slug: "beauty",
            description:
                "Makeup and skincare products for daily beauty routine routine routineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutineroutine.",
            image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAwgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIEBQYDB//EADsQAAEDAwIEAwUHAwMFAQAAAAEAAgMEBRESIQYxQVETImEUMnGBoSNCYpGxwdEVJFIzQ/AWJTTC4Qf/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACMRAAICAgICAgMBAAAAAAAAAAABAhEDIRIxMkEiYRMzQgT/2gAMAwEAAhEDEQA/APJcJUuEYWhmCVCVAhEqUBLhADcJcJwQgQmEYTkYQA3CXCdhLhADEJ2NkYSAaQkwnpMIAZhGE8hIkMYQm4XTGUmEDOZCQhPIRhAHNCdhIgBuEJcIQMelQEqokEoCMJQECABLhCUIAMJUJcICxEuFOobRX17S+lpJHszjXjDfzOytrTwzJLdIoa6an8IEmVsUup2B8B8AUEuSRH4e4ZrLy4PGIaUHBmd970aOq3VLwfZKWEiSmFQ/GC+Zxd9OQ+Sqr1xzarMfY6CmM8kXlAafs2+mVkq7/wDRL5VBzYPDgaTyDA4j9v1SbDjKRu6zge0TEmnEsBI+5JkfkVl7zwbWUEZmppPaYxu4AYcB+6paHju+09SJZ6h00fWMgYP0Xpdg4hob9AHU0rRNjzwuO4KVilGUdnlBG6TC2fF3DbvbIqi0U5lM+rxIWH3SOvz3/JZSoo6mmcW1MEsRHPWwhMpSRGRhOSYQUNISJyMJAMITU8hIUDGEJqemlACIQhAD0BKAlAVkgnJE4BAAEqAFY2mzVt2J9ljHhtOHTP2YD2z1PogVleFKt1DNcKkU9MPNjJJ5NHUlXv8A0VcH1LYYZqeVp997SQI/iCtfR0dJY6MU9G3LiPtJSPNIe5/hIlspL7O63Wd0NG/S2NmA3bBA2WUp6ma38OzVZc72y4k7nm2Idu2T1V7xex09BO6nBL9Jyz9x6qrutNNJHR2wxaHSPhpo3nzDGQM/yiWkGKNumZ632p9fmSVs788xEzJ/QqxiioaR2n+nwPeNiZ9bj+ROPorO4cY1Vhr5rZYo4IaCkcYWh0YLpiNi955kkg7chnCL1XR33h6nvfgRw1Uc/stU2MYY52nU14HQEZyO425qIzXs3njleirqn0lSNLrfSRnkDBG5h+jsH5hQ/Z6q1PbVUhqIXg7GRpAP0CvOE5KekpbleqqITNoYgWRu2DnuOloJ7Z5+g9Vyp+PrlJVabrHTVluftLSOgaxunrpIGWnscocl6CGNvt6L916kvfD5qKeQNrYG69+ZLeYP/ORVlZribra45qktIeN4+mO35LN0dKLJxHdbS15lp4jqjkPMscARn1LXDKseCQaWh8OTmHvxg9Acfsqi7VnPkhxbSM3d6F9urpIXtIbkmNx+8zoVDI7r2Gqo6W7Ung18Ilb3Oxb8D0WZj4EptUgfXz6dWIy2MAY9c8/lhIrkjBYQVeX7huts32j8TUx/3mDYfEdFS4QUhiaQnlIQgZzwkIT8JCgYzCEqEAOCUJAEoVkjkDkha3hOxMe1tyrw3wx5omO6/iI/RBEpcVZz4d4WkrdFTXF0cPNsQ95/x7Bb6GlpqSJjS6OCNgwGt22WcuHEFQ55p7NCS/kXkKkq7TeawF9XXYJ+4CU6MuV9mwrK60Qy+NHcGRVDemRh/wAVSVvEdDUQPlgkw5mz2c8fPqsweFrk8+VmvsSoE9J7DJJTVLpDLyLWjDQfj1SotV6ZIuV5llz4OSTuAEXyvnzbKyIgCGQPaDvpeDkZUVjWtbsAFKt9dDA99FXwskpKjYlw3YehHzSe1Ra+LTR2uVgPENW+62F8EsdS/wASWmfOxktM8+80hxGRnJBHMLhefCs9jisTJ4qiqfUe1Vj4Xao4yG6WRg/eI3JPLJAVPdaQ0FU6EkuYN2E8yOyg6/xLHg09nX+RNWjR8NVVJJDX2e4ziCC4xtayod7sUrXZYXY+6eRPTmpFNwZLSTGa+1VLSW2PeSVlQyR0g7Rtacknospr9UniE9Mnpsk4u9ApKtmpN3/qF4ut3mjEXtB8kbTkMHINz6ANGfRNtt3moap3tAc3B1Y7h2HD6FRrZSvrBDbYgNUjx40h+6OZ+gKmXwsku1SGgaWubFjtoaG/+q0TpqJhNJ3J+z0W31bKyNkcLxpa1r5C49SMhv5bqyjdO07uD2nk1q8ygqpaQvdHXU7I3OzpA83plX9s4leGhmpr++k9VrVnJK0zWyPjIcHtw1ww4HcFYniLhhh1VVpbtjz047d2/wALTQXaGb7oJ+CcZmS7Ny34I4kLI4s8n2Od+SReoVdvoK9uiriZJ2eNnj4HmsZxHw9NapjJTh81G4ZbJjOn0coejqhNTWigKTCccJpSLG4SoQgBQlCFccPWf+pyvkny2kiHncObj/iFaRMpKKtjuH7T7bL7RUt/s2HfvIew/f8A5jYmmfX6WOGmIcgDsO2VEnraSig8STEUEYxHG3bb4LK3PiyuqiYbex0MOdtA3PzVdHL8sjN/HHQUTcPnjiA7EJP6xZ4Rk1EL8HuCvIp/bpXGSZz3HqXFRwCJA05yTg4U2bLB9nqN24zghGi2xNlkPNzvdb/KxdVUz1cvi1MhkeepXFrQxoaOQ2TkxqKiAXKqH2JPquo3OEyXSWEEhJlIje2vlpRTVQEsI93WPMz4O5/JVs8PhnLPM3vhSZQGuIdsVzMreXP0wpZqtERS6CndLLrcWsY3cvPJv8pwpmNxJP5AeTPvO9fQJXyEgNA0xjk0dP5+Kgs2PCVTA32+qDdMFHABGHcyXHmfU4VG5xc5znc3EuPxO5V9w9bYXUH9LlEntdS5s8waceC0e7q+RO3qq+stNZTVj6b2eZ5Dy1hbGT4gHIjHopxyXJhkTpFe9gkLdZLcHm0brXUVrtM8TZjdYsOHLRgg9iFmHU0zZfCfE5kgONL/AC/qnS0UkJc2sNPCWe8HzsONs9Ce625JHNLG5aNzHQ25uNN2z20kY+CktocgCCsikPQZXkj/ADzERTaWnkCSMKXTUdcXD2eqjPoJcFUp2ZS/z12z02Wnq4m6XRg/iG/5rpFWEsNPKwBjj1bnbfb6rBwVPElJgtq3Y9XBw+qsqfiWryGXSlGeXixf/E++zJ45R3FlfxFaxbqsGIf28uTHvs3u36qoK3LWUd7gdRSS4LnB8Mjc5a8bbjqMEgj+Fi6qF9PUSwSY1xPcx2DtkHCyfdHZDcEzikTkIKD4rW0E3sVjhYMZf9o4epWSC6zXWWKYMO7NIx6bLROjHJFy0Ta0+0SeJXSsa0cmuPL5LlHI6TyUNMZMffDcNHxJ/lRHXhrWnwqOHxTzlkGt31UaatrKvyvdJI3o0bNH7IbKjBk+Z8cf/l1TXEf7VPy+blCmrA6PTTwsYAdWcZJTIaRjnh1XK0fgaU52k1T44wNIaA3H5qWy0kjmKioIzq5+ifFWv1aXNUqnhBBwM4KdLQ+fWBy7J0LkvZFY+SodgE625zhc6puMCbLQDzCmwxeDWxSYwx/kcrC428FgdjOU6E5pMoRR6m+I6cFn1Ka50bBogaB1LjurKKAUrw12Q09UtRaZ3+eLRIx3I8iEmilNFM6Tfq5x5k9U+n8V0oLSI8H3iM4Ux1tfH/q4aUSR+HhrBlxCjiXzNBbbnHAJBHUtwTqlLgdch7jv+ygSV09ZWyVLHPjDBpZhxyN+6hw0hjYXEEudsFYiD2ejaMeZ5Sjip2E82qIcjHyvL3uc93UuOSq+Rpklew8mnkNgFo4YMRuceQblV1JT5hMjveldrz6dFfAzjl7IFNbxVF7HSBn+JPdTDbG0rf7wnUcFr2nA/PklrQ2GneWncAD55TYrhXxQN8GfW3lpcMqlSJblLo6mOogB8GrAaPuylcXXJ2dMjRn8PVRn3CKR2aihhcR2LmfoUSXIvjMcMEUEZG+lv7lLkNQv0XHC1ef+paPPuaiCAodbIJKueRpyHyudn4lLQMNupTVE4qZ2FkQ6xsPN/wASNgOxJ7KOfRZLcmzV1GKSBCEKiQC51EfiMHcJ6crJK3BZy2Rre7YuJHbKlzw588fvdR3UbDXHsUi7s6xs8uRzTGvMVSHdAea6Uj2xSHxB5SEtdGGuEjNweoQL6LOjcPaHM6OaCFbw02uEnrnZZmhm/umn8OFs7Y9srMAYyric+bRRVcOI3N6tORj0V1Q6a+2tdtqABIXC50+NWWqLw7WeyVjoZPccSE/ZL+UbJlXRxhw1gFuFUVEkjHmKnLg30K2N1o31FIDBk4HLP6KuttpOrXUs8NrTtqCZMZ0rKWmtMj2meqecYzhPpreZXOlc3DAcN9VoasxnTGCNJ57qHUyxuLaakGSeoSof5GyvpqYTVGANhsnXID2uGAD3RnCvW00dqoXTS++enqs1RuNXcHTO3JJKATbdku4HwLPUPacEt0hcmMApw4DGmMEBJxQ/TRww/wCTgumwtwJ6swj2C8SkvMsbINDSS95GfQKNK51HSxxAjxXnU/8AD2CS4OEtxHZrQ7f0XKKmqKwmRg+zB3e84A+azbSOuELRwkk1HU85PcqzpKJtLonrmh0h3ZARy7Od2+CKeKKkOqDzy9JXjGk92jp89/ggnJJJJ9Soey7roWaV80jpHklzuuUwoSFMm7EykQhAhUoTQlBVkjlzmgZLudndwuiEC6Ihglbyw9vx3XNxc0FpBwe6sQggEYIz8UFcivpc+IOgC19olxgE+izop2NL5GDBxyVrbH6T5lUTLLtGkq4fFizzyFlK6IwT+I3bC1tHIJIwP1VPe6XZxCpmGOVOi74aubKmARPPnHV3VS7j40ediWFYC31r6ScOaeS3VsvMNXTtZUHOfXkkgnBxeio9klqZMEY37q8oLfBb4DNM1uruQpRNLTt8TWO4yVk+Ir945dFDJgfhRZMU5OiPxJd31k3hMd9m09Cl4fh2Mjh0VDFl8oz1K1VIBT0Wo7bIRrk+MaRR3+bx7lHHnZh5KynwyjwQDpHVUOr2i66ueXZVzXuyxrR1ICV9sqUfGJTzWySNzKqsaI2TAmOLq4DqewTpZXSEB2wb7rRyHyVxxgT/AFOCPPlbRxgfm7+VR5WEdq2dUlToTKRKUiokQlIhIdkACEmUIGKEqYnBWSOSpqVAhUoKRCAO0ILst74XYOMUuBzCbbm6psdt1zmdiQn1VIzfdGkt04c1u/yU+pjE0RBGcrO26bAG+FoKeTW3BJKtbOWap6MdcYXQTHbbKbT1DmEaXYWhvVvMkZexZVwdFIWP+ihqjphJTRYTV072YdK4j4quc7Lt+qc85A0prGlzgCEmaRSRPtUBlmGdwrq7zCChLeWy52en0jV2VbxFU6n6OyrpGHnkoh2ca6su7FWta7do/EFX2RmMu7qXWO8wHqEvRo/2IsOMm6a2jl/ypGD8if5WfPNaDi52uO1ydTTkfkVnlz4/E6cnkwPJJlCRWSBTCU4pqABCRCAFTm8kIVksE5IhAhwQhCAJVv2fJj/ArhN/qFCFXoz/AKZ3o3HI36rQUDneUZQhUjDMWYAczzb74WUv0EbJMtbgpUJy6JweRStOHYU2laC8ZCELNHXLo00YEdK4tGCsXdHudUOJPVCFUujLB5ssrQPswn1uxz6hCEn4lP8AYWvFQ/7faj18N37LOIQufH4nXk8hEIQrIGlNKEIGIhCEAf/Z",
        },
        {
            id: 2,
            name: "Fashisssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssson",
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
            name: "Petxxxxxxxs",
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
            width: 50,
        },
        {
            title: 'Brand Image',
            dataIndex: 'image',
            key: 'image',
            width: 150,
            render: (text) => <img src={text} alt="brand-image" width={40} />,
        },
        {
            title: 'Brand Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            ellipsis: true
        },
        {
            title: 'Brand Description',
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
                    <AddEditBrand mode="edit" brandData={record} />
                    <DeletePopup title={"Are you want to Delete this Brand ?"} apiEndpoint={`/products/${record.id}`} data={{ id: record.id, image: "", name: record.name }} />
                </Space>
            )
        },
    ];

    let filteredData = brands.filter((item) => {
        if (!searchText) return true; // If search box empty → show all

        const value = item[searchField]?.toString().toLowerCase();
        return value?.includes(searchText.toLowerCase());
    });

    return (
        <div>
            <AdminHeader title={`View Brands`} addComponent={<AddEditBrand mode="add" productData={null} />} hideBack={true} />
            <Row justify={"space-between"} className='admin-header-space'>
                <Col span={6}>
                    <Form.Item label="Filter option">
                        <Select
                            placeholder="Search..."
                            onChange={(value) => changeSearchField(value)}
                        >
                            <Option value="name">Brand Name</Option>
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
            <Table columns={columns} dataSource={filteredData} className="brand-pagination" pagination={{
                position: ["bottomCenter"],
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
                showQuickJumper: true,
                onChange: (page, pageSize) => {
                    setPagination({ current: page, pageSize });
                },
                showTotal: (total) => `Total ${total} Brands`,
            }} />
        </div >

    )
}
export default ListAllBrand