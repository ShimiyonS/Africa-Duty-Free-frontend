import { useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditUsers from '../../components/AdminComponents/AddEditUsers';
import DeletePopup from '../../components/commonComponents/DeletePopup';
import AdminHeader from '../../components/AdminComponents/AdminHeader';
import UserShowProducts from '../../components/AdminComponents/UserShowProducts';
import { BsBoxSeam } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import catimage from "../../assets/blinkbottle.png"

const ListAllUsers = () => {

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    });

    //filter state
    const [selectedColumn, setSelectedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const [condition, setCondition] = useState("");
    const [headerdefine, setHeaderdefine] = useState(null)


    const changeselect = (value) => {
        setSelectedColumn(value)
        setSearchText("")
        setCondition("")
        setHeaderdefine(typeof user?.[0]?.[value])
    }


    const user = [{
        id: 1,
        firstName: "Emily",
        lastName: "Johnson",
        userName: 'EmilyJohnson',
        age: 28,
        gender: "female",
        email: "emily.johnson@x.dummyjson.com",
        phone: "+81 965-431-3024",
        username: "emilys",
        password: "emilyspass",
        birthDate: "1996-05-30",
        image: "https://dummyjson.com/icon/emilys/128",
        address: {
            address: "626 Main Street",
            city: "Phoenix",
            state: "Mississippi",
            stateCode: "MS",
            postalCode: "29112",
            country: "United States"
        },
        bank: {
            cardExpire: "03/26",
            cardNumber: "9289760655481815",
            cardType: "Elo",
            currency: "CNY",
            iban: "YPUXISOBI7TTHPK2BR3HAIXL"
        },
        role: "admin",
        orders: [
            {
                productId: 2,
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,
                orderOn: "12-10-2024",
                deliveredOn: "15-10-2024"
            },
            {
                productId: 2,
                productName: "Wisky",
                productImage: catimage,
                productPrice: 25,
                orderOn: "16-10-2024",
                deliveredOn: "25-10-2024"
            }
        ],
        cart: [
            {
                productId: 2,
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,

            },
            {
                productId: 2,
                productName: "Pant",
                productImage: "",
                productPrice: 550,

            }
        ],
        wishlist: [
            {
                productId: 2,
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,
            },
            {
                productId: 2,
                productName: "Pant",
                productImage: "",
                productPrice: 550,
            }
        ],
        status: true
    },
    {
        "id": 2,
        "firstName": "Emily",
        "lastName": "Johnson",
        "userName": "Ganesh",
        "age": 28,
        "gender": "male",
        "email": "ganesh123@gmail.com",
        "phone": "+81 965-431-3024",
        "username": "emilys",
        "password": "emilyspass",
        "birthDate": "1996-05-30",
        "image": "https://dummyjson.com/icon/emilys/128",
        "address": {
            "address": "626 Main Street",
            "city": "Phoenix",
            "state": "Mississippi",
            "stateCode": "MS",
            "postalCode": "29112",
            "country": "United States"
        },
        "bank": {
            "cardExpire": "03/26",
            "cardNumber": "9289760655481815",
            "cardType": "Elo",
            "currency": "CNY",
            "iban": "YPUXISOBI7TTHPK2BR3HAIXL"
        },
        "role": "admin",
        "orders": [
            {
                "productId": 30,
                "productName": "Pant",
                "productImage": "https://cdn.dummyjson.com/product-images/30/1.jpg",
                "productPrice": 550,
                "orderOn": "12-10-2024",
                "deliveredOn": "15-10-2024"
            },
            {
                "productId": 43,
                "productName": "Shirt",
                "productImage": "https://cdn.dummyjson.com/product-images/43/2.jpg",
                "productPrice": 799,
                "orderOn": "18-11-2024",
                "deliveredOn": "22-11-2024"
            },
            {
                "productId": 59,
                "productName": "Sneakers",
                "productImage": "https://cdn.dummyjson.com/product-images/59/1.jpg",
                "productPrice": 2200,
                "orderOn": "05-12-2024",
                "deliveredOn": "09-12-2024"
            },
            {
                "productId": 60,
                "productName": "Leather Jacket",
                "productImage": "https://cdn.dummyjson.com/product-images/60/1.jpg",
                "productPrice": 3500,
                "orderOn": "10-12-2024",
                "deliveredOn": "14-12-2024"
            },
            {
                "productId": 6,
                "productName": "Laptop",
                "productImage": "https://cdn.dummyjson.com/product-images/6/1.png",
                "productPrice": 55000,
                "orderOn": "15-12-2024",
                "deliveredOn": "20-12-2024"
            },
            {
                "productId": 2,
                "productName": "Smartphone",
                "productImage": "https://cdn.dummyjson.com/product-images/2/1.jpg",
                "productPrice": 29999,
                "orderOn": "20-12-2024",
                "deliveredOn": "24-12-2024"
            },
            {
                "productId": 13,
                "productName": "Perfume",
                "productImage": "https://cdn.dummyjson.com/product-images/13/2.png",
                "productPrice": 1999,
                "orderOn": "22-12-2024",
                "deliveredOn": "26-12-2024"
            }
        ],
        "cart": [
            {
                "productId": 59,
                "productName": "Shoes",
                "productImage": "https://cdn.dummyjson.com/product-images/59/3.jpg",
                "productPrice": 1200
            },
            {
                "productId": 81,
                "productName": "Backpack",
                "productImage": "https://cdn.dummyjson.com/product-images/81/1.jpg",
                "productPrice": 999
            },
            {
                "productId": 91,
                "productName": "Headphones",
                "productImage": "https://cdn.dummyjson.com/product-images/91/1.jpg",
                "productPrice": 3200
            }
        ],
        "wishlist": [
            {
                "productId": 63,
                "productName": "Watch",
                "productImage": "https://cdn.dummyjson.com/product-images/63/3.jpg",
                "productPrice": 2500
            },
            {
                "productId": 70,
                "productName": "Sunglasses",
                "productImage": "https://cdn.dummyjson.com/product-images/70/2.jpg",
                "productPrice": 1499
            }
        ],
        "status": true
    }
        ,
    {
        id: 3,
        firstName: "Emily",
        lastName: "Johnson",
        userName: 'Saravanan',
        age: 28,
        gender: "male",
        email: "saravanan123456@gmail.com",
        phone: "+81 965-431-3024",
        username: "emilys",
        password: "emilyspass",
        birthDate: "1996-05-30",
        image: "https://dummyjson.com/icon/emilys/128",
        address: {
            address: "626 Main Street",
            city: "Phoenix",
            state: "Mississippi",
            stateCode: "MS",
            postalCode: "29112",
            country: "United States"
        },
        bank: {
            cardExpire: "03/26",
            cardNumber: "9289760655481815",
            cardType: "Elo",
            currency: "CNY",
            iban: "YPUXISOBI7TTHPK2BR3HAIXL"
        },
        role: "admin",
        orders: [
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
                orderOn: "12-10-2024",
                deliveredOn: "15-10-2024"
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
                orderOn: "12-10-2024",
                deliveredOn: "15-10-2024"
            }
        ],
        cart: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,

            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,

            }
        ],
        wishlist: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
            }
        ],
        status: true
    },
    {
        id: 4,
        firstName: "Emily",
        lastName: "Johnson",
        userName: 'shimiyon',
        age: 28,
        gender: "female",
        email: "shimyan123@gmail.com",
        phone: "+81 965-431-3024",
        username: "emilys",
        password: "emilyspass",
        birthDate: "1996-05-30",
        image: "https://dummyjson.com/icon/emilys/128",
        address: {
            address: "626 Main Street",
            city: "Phoenix",
            state: "Mississippi",
            stateCode: "MS",
            postalCode: "29112",
            country: "United States"
        },
        bank: {
            cardExpire: "03/26",
            cardNumber: "9289760655481815",
            cardType: "Elo",
            currency: "CNY",
            iban: "YPUXISOBI7TTHPK2BR3HAIXL"
        },
        role: "admin",
        orders: [
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
                orderOn: "12-10-2024",
                deliveredOn: "15-10-2024"
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
                orderOn: "12-10-2024",
                deliveredOn: "15-10-2024"
            }
        ],
        cart: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,

            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,

            }
        ],
        wishlist: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,

            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,

            }
        ],
        status: false
    },
    {
        id: 5,
        firstName: "Emily",
        lastName: "Johnson",
        userName: 'Vignesh',
        age: 28,
        gender: "male",
        email: "vignaesh123@gmail.com",
        phone: "+81 965-431-3024",
        username: "emilys",
        password: "emilyspass",
        birthDate: "1996-05-30",
        image: "https://dummyjson.com/icon/emilys/128",
        address: {
            address: "626 Main Street",
            city: "Phoenix",
            state: "Mississippi",
            stateCode: "MS",
            postalCode: "29112",
            country: "United States"
        },
        bank: {
            cardExpire: "03/26",
            cardNumber: "9289760655481815",
            cardType: "Elo",
            currency: "CNY",
            iban: "YPUXISOBI7TTHPK2BR3HAIXL"
        },
        role: "admin",
        orders: [
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
                orderOn: "12-10-2024",
                deliveredOn: "15-10-2024"
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
                orderOn: "12-10-2024",
                deliveredOn: "15-10-2024"
            }
        ],
        cart: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
            }
        ],
        wishlist: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
            }
        ],
        status: false
    },
    {
        id: 6,
        firstName: "Emily",
        lastName: "Johnson",
        userName: 'Ganesh',
        age: 28,
        gender: "male",
        email: "ganesh123@gmail.com",
        phone: "+81 965-431-3024",
        username: "emilys",
        password: "emilyspass",
        birthDate: "1996-05-30",
        image: "https://dummyjson.com/icon/emilys/128",
        address: {
            address: "626 Main Street",
            city: "Phoenix",
            state: "Mississippi",
            stateCode: "MS",
            postalCode: "29112",
            country: "United States"
        },
        bank: {
            cardExpire: "03/26",
            cardNumber: "9289760655481815",
            cardType: "Elo",
            currency: "CNY",
            iban: "YPUXISOBI7TTHPK2BR3HAIXL"
        },
        role: "admin",
        orders: [],
        cart: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
            }
        ],
        wishlist: [
            {
                productName: "Pant",
                productImage: "data:image/jpeg;base64,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",
                productPrice: 550,
            },
            {
                productName: "Pant",
                productImage: "",
                productPrice: 550,
            }
        ],
        status: true
    }
    ];

    const dataSource =
        user.map((userdata, uindex) => ({
            key: uindex,
            id: uindex + 1,
            profile: userdata.image,
            username: userdata.userName,
            email: userdata.email,
            status: userdata.status,
            orders: userdata.orders,
            cart: userdata.cart || 0,
            wishlist: userdata.wishlist || 0,
            phone: userdata.phone
        }))


    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Profile',
            dataIndex: 'profile',
            key: 'profile',
            render: (text) => (
                <img
                    src={text}
                    alt="profile"
                    className='admin-table-img'
                />
            )
        },
        {
            title: 'UserName',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                status
                    ? <span className="text-color-success admin-bold">Active</span>
                    : <span className="text-color-danger admin-bold">Inactive</span>
            )
        },
        {
            title: 'Orders',
            dataIndex: 'orders',
            key: 'orders',
            render: (orders) => (
                <UserShowProducts data={orders} title={"User Orders"} notifyIcon={<BsBoxSeam className='text-color-primary' />} />
            )
        },
        {
            title: 'Cart',
            dataIndex: 'cart',
            key: 'cart',
            render: (cart) => (
                <UserShowProducts data={cart} title={"User Carts"} notifyIcon={<BsCart className='text-color-primary' />} />
            )
        },
        {
            title: 'WishList',
            dataIndex: 'wishlist',
            key: 'wishlist',
            render: (wishlist) => (
                <UserShowProducts data={wishlist} title={"User Wishlist"} notifyIcon={<FaRegHeart className='text-color-primary' />} />
            )
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: '50px',
            render: (_, record) => (
                <Space>
                    <AddEditUsers mode={"edit"} userData={record} />
                    <DeletePopup title={"Are you want to Delete this User?"} apiEndpoint={`/user/${record.id}`} data={{ id: record.id, image: record.profile, name: record.username }} />
                </Space>
            ),
        }

    ];

    const filteredData = dataSource.filter((item) => {
        if (!searchText) return true; // If no filter value → show all

        const value = item[selectedColumn];

        if (headerdefine === "string") {
            return value?.toString().toLowerCase().includes(searchText.toLowerCase());
        }

        if (headerdefine === "object") {
            const numValue = value.length;
            const filterValue = Number(searchText);

            if (isNaN(numValue) || isNaN(filterValue)) return true; // ignore invalid

            switch (condition) {
                case "gt":  // Greater than
                    return numValue > filterValue;
                case "lt":  // Less than
                    return numValue < filterValue;
                case "gte": // Greater than or equal
                    return numValue >= filterValue;
                case "lte": // Less than or equal
                    return numValue <= filterValue;
                default:
                    return true;
            }
        }

        if (headerdefine === "boolean") {
            return value?.toString() === searchText;
        }

        return true;
    });



    return (
        <>
            <AdminHeader title={"View Users"} addComponent={<AddEditUsers mode={"add"} userData={null} />} hideBack={true} />
            <Row justify={"space-between"} className='admin-header-space'>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item label="Filter option">
                        <Select
                            placeholder="Search..."
                            onChange={(value) => changeselect(value)}
                        >
                            <Option value="username">User Name</Option>
                            <Option value="email">Email Address</Option>
                            <Option value="status">status</Option>
                            <Option value="orders">Orders</Option>
                            <Option value="cart">Cart</Option>
                            <Option value="wishlist">wishlist</Option>
                        </Select>
                    </Form.Item>
                </Col>


                {headerdefine === "string" ? (
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item label="Filter value">
                            <Input
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                disabled={!selectedColumn}
                            />
                        </Form.Item>
                    </Col>
                ) : headerdefine === "object" ? (
                    <Col xs={24} sm={24} md={12}>
                        <Row>
                            {/* Condition Select */}
                            <Col xs={24} sm={12}>
                                <Form.Item label="Condition">
                                    <Select
                                        placeholder="Select condition"
                                        value={condition}
                                        onChange={(val) => setCondition(val)}
                                        disabled={!selectedColumn}
                                    >
                                        <Option value="gt">Greater than</Option>
                                        <Option value="lt">Lesser than</Option>
                                        <Option value="gte">Greater than equal</Option>
                                        <Option value="lte">Lesser than equal</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            {/* Number Input */}
                            <Col xs={24} sm={12}>
                                <Form.Item label="Value">
                                    <Input
                                        type="number"
                                        placeholder="Enter number..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        disabled={!selectedColumn}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                ) : headerdefine === "boolean" ? (
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item label="Filter value">
                            <Select
                                placeholder="Select status"
                                value={searchText}
                                onChange={(val) => setSearchText(val)}
                                disabled={!selectedColumn}
                            >
                                <Option value="true">Active</Option>
                                <Option value="false">Inactive</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}
            </Row>

            <Table dataSource={filteredData} columns={columns} className='brand-pagination' scroll={{ x: "max-content" }} pagination={{
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
                showTotal: (total) => `Total ${total} Users`,
            }} />
        </>
    )
}

export default ListAllUsers