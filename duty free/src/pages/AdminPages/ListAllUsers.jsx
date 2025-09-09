import { useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditUsers from '../../components/AdminComponents/AddEditUsers';
import DeletePopup from '../../components/commonComponents/DeletePopup';

const ListAllUsers = () => {

    //filter state
    const [selectedColumn, setSelectedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const [condition, setCondition] = useState("");
    const [headerdefine, setHeaderdefine] = useState(null)


    const changeselect = (value) => {
        setSelectedColumn(value)
        setSearchText("")
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
        orders: 20,
        cart: 12,
        wishlist: 1,
        status: true
    },
    {
        id: 2,
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
        orders: 21,
        cart: 12,
        wishlist: 1,
        status: true
    },
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
        orders: 22,
        cart: 12,
        wishlist: 1,
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
        orders: 3,
        cart: 1,
        wishlist: 10,
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
        orders: 0,
        cart: 1,
        wishlist: 10,
        status: false
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
            fixed: 'left',
        },
        {
            title: 'Profile',
            dataIndex: 'profile',
            key: 'profile',
            render: (text) => (
                <img
                    src={text}
                    alt="profile"
                    style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
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
                    ? <span className="text-color-success" style={{ fontWeight: "bold" }}>Active</span>
                    : <span className="text-color-danger" style={{ fontWeight: "bold" }}>Inactive</span>
            )
        },
        {
            title: 'Orders',
            dataIndex: 'orders',
            key: 'orders',
        },
        {
            title: 'Cart',
            dataIndex: 'cart',
            key: 'cart',
        },
        {
            title: 'WishList',
            dataIndex: 'wishlist',
            key: 'wishlist',
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: '50px',
            fixed: "right",
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

        if (headerdefine === "number") {
            const numValue = Number(value);
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
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className="adminform-heading justuspro-medium mb-3">View Users List</h2>
                {/* drawer popup  */}
                <AddEditUsers mode={"add"} userData={null} />
            </div>
            <Row justify={"space-between"} style={{ marginTop: "24px", marginBottom: "24px" }}>
                <Col span={6}>
                    <Form.Item label="Filter option">
                        <Select
                            placeholder="Search..."
                            onChange={(value) => changeselect(value)}
                        >
                            <Option value="username">User Name</Option>
                            <Option value="email">Email Address</Option>
                            <Option value="status">status</Option>
                            <Option value="orders">Orders</Option>
                        </Select>
                    </Form.Item>
                </Col>


                {headerdefine === "string" ? (
                    <Col span={6}>
                        <Form.Item label="Filter value">
                            <Input
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                disabled={!selectedColumn}
                            />
                        </Form.Item>
                    </Col>
                ) : headerdefine === "number" ? (
                    <Col span={12}>
                        <Row>
                            {/* Condition Select */}
                            <Col span={12}>
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
                            <Col span={12}>
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
                    <Col span={6}>
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

            <Table dataSource={filteredData} columns={columns}  scroll={{ x: "max-content" }} />
        </>
    )
}

export default ListAllUsers