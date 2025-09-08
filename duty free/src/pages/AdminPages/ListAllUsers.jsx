import { useState } from 'react'
import { Col, Form, Input, Row, Select, Space, Table } from "antd";
import AddEditUsers from '../../components/AdminComponents/AddEditUsers';
import DeletePopup from '../../components/commonComponents/DeletePopup'

const ListAllUsers = () => {

    //filter state
    const [selectedColumn, setSelectedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    const [headerdefine, setHeaderdefine] = useState(null)


    const changeselect = (value) => {
        setSelectedColumn(value)
        setSearchText("")
        setHeaderdefine(typeof user?.[0]?.[value])
    }

    const handleEdit = (record) => {
        console.log("Edit clicked:", record);
        setDrawerState({
            mode: "edit",
            data: record,
            open: true,
        });
    };

    const handleDelete = (record) => {
        console.log("Delete clicked:", record);
    };


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
        orders: 20,
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
        orders: 20,
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
        orders: 0,
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
            emailaddress: userdata.email,
            status: userdata.status,
            orders: userdata.orders,
            cart: userdata.cart || 0,
            wishlist: userdata.wishlist || 0,
            phone:userdata.phone
        }))


    const columns = [
        {
            title: 'S.NO',
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
                    style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid green", objectFit: "cover" }}
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
            dataIndex: 'emailaddress',
            key: 'emailaddress',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                status
                    ? <span style={{ color: "green", fontWeight: "bold" }}>Active</span>
                    : <span style={{ color: "red", fontWeight: "bold" }}>Inactive</span>
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
                    <DeletePopup title={"Are you want to Delete this User?"} apiEndpoint={`/user/${record.id}`} name={record.username} image={record.image}/>
                </Space>
            ),
        }

    ];

    const filteredData = dataSource.filter((item) => {
        if (!searchText) return true; // If search box empty → show all

        const value = item[selectedColumn]?.toString().toLowerCase();
        return value?.includes(searchText.toLowerCase());
    });

    return (
        <div className='table-responsive'>
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
                    <Row justify={"space-between"}>
                        <Col span={12}>
                            <Form.Item label="Filter value">
                                <Select
                                    placeholder="Select condition"
                                    value={searchText}
                                    onChange={(val) => setSearchText(val)}
                                    disabled={!selectedColumn}
                                >
                                    <Option value="true">Greater than</Option>
                                    <Option value="false">Lesser than</Option>
                                    <Option value="false">Greater than equal</Option>
                                    <Option value="false">Lesser than equal</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Filter value">
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

            <Table dataSource={filteredData} columns={columns} />
        </div>
    )
}

export default ListAllUsers