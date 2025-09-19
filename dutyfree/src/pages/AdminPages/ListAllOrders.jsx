import { useState } from 'react'
import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";
import AdminHeader from '../../components/AdminComponents/AdminHeader';
import { FaDownload } from "react-icons/fa6";
import catimage from "../../assets/blinkbottle.png"
import ViewOrderedProducts from '../../components/AdminComponents/ViewOrderedProducts';
import InvoicePopup from '../../components/commonComponents/InvoicePopup';

const ListAllOrders = () => {

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
        console.log(value);

        setSelectedColumn(value)
        setSearchText("")
        setCondition("")
        setHeaderdefine(typeof orders?.[0]?.[value])
        console.log(typeof orders?.[0]?.[value]);

    }

    const orders = [
        {
            orderId: 1,
            orderBy: "Emily",
            DeliveryAddress: {
                address: "626 Main Street",
                city: "Phoenix",
                state: "Mississippi",
                stateCode: "MS",
                postalCode: "29112",
                country: "United States"
            },
            paymentMode: "COD",
            orderedStatus: false,
            productsOrdered: [
                {
                    productName: "Pant",
                    productImage: catimage,
                    productPrice: 550,
                    qty: 2,
                    orderOn: "12-10-2024",
                    deliveredOn: "15-10-2024"
                },
                {
                    productName: "Wisky",
                    productImage: catimage,
                    productPrice: 25,
                    qty: 1,
                    orderOn: "16-10-2024",
                    deliveredOn: "25-10-2024"
                }
            ],
            totalAmount: 1025
        },
        {
            orderId: 2,
            orderBy: "Daniel",
            DeliveryAddress: {
                address: "112 Oak Avenue",
                city: "Dallas",
                state: "Texas",
                stateCode: "TX",
                postalCode: "75201",
                country: "United States"
            },
            paymentMode: "Online",
            orderedStatus: true,
            productsOrdered: [
                {
                    productName: "Shirt",
                    productImage: catimage,
                    productPrice: 400,
                    qty: 3,
                    orderOn: "05-09-2024",
                    deliveredOn: "09-09-2024"
                }
            ],
            totalAmount: 1200
        },
        {
            orderId: 3,
            orderBy: "Sophia",
            DeliveryAddress: {
                address: "89 Pine Street",
                city: "Chicago",
                state: "Illinois",
                stateCode: "IL",
                postalCode: "60601",
                country: "United States"
            },
            paymentMode: "COD",
            orderedStatus: false,
            productsOrdered: [
                {
                    productName: "Shoes",
                    productImage: catimage,
                    productPrice: 1200,
                    qty: 1,
                    orderOn: "22-08-2024",
                    deliveredOn: "28-08-2024"
                }
            ],
            totalAmount: 1200
        },
        {
            orderId: 4,
            orderBy: "Michael",
            DeliveryAddress: {
                address: "742 Evergreen Terrace",
                city: "Springfield",
                state: "Oregon",
                stateCode: "OR",
                postalCode: "97477",
                country: "United States"
            },
            paymentMode: "UPI",
            orderedStatus: true,
            productsOrdered: [
                {
                    productName: "Laptop",
                    productImage: catimage,
                    productPrice: 55000,
                    qty: 1,
                    orderOn: "01-07-2024",
                    deliveredOn: "05-07-2024"
                }
            ],
            totalAmount: 55000
        },
        {
            orderId: 5,
            orderBy: "Olivia",
            DeliveryAddress: {
                address: "34 River Road",
                city: "Boston",
                state: "Massachusetts",
                stateCode: "MA",
                postalCode: "02118",
                country: "United States"
            },
            paymentMode: "Card",
            orderedStatus: true,
            productsOrdered: [
                {
                    productName: "Bag",
                    productImage: catimage,
                    productPrice: 1500,
                    qty: 2,
                    orderOn: "19-06-2024",
                    deliveredOn: "24-06-2024"
                }
            ],
            totalAmount: 3000
        },
        {
            orderId: 6,
            orderBy: "James",
            DeliveryAddress: {
                address: "76 Lake View",
                city: "Seattle",
                state: "Washington",
                stateCode: "WA",
                postalCode: "98101",
                country: "United States"
            },
            paymentMode: "COD",
            orderedStatus: false,
            productsOrdered: [
                {
                    productName: "Headphones",
                    productImage: catimage,
                    productPrice: 2500,
                    qty: 1,
                    orderOn: "10-05-2024",
                    deliveredOn: "14-05-2024"
                }
            ],
            totalAmount: 2500
        },
        {
            orderId: 7,
            orderBy: "Isabella",
            DeliveryAddress: {
                address: "150 King Street",
                city: "New York",
                state: "New York",
                stateCode: "NY",
                postalCode: "10001",
                country: "United States"
            },
            paymentMode: "Online",
            orderedStatus: true,
            productsOrdered: [
                {
                    productName: "Watch",
                    productImage: catimage,
                    productPrice: 7000,
                    qty: 1,
                    orderOn: "30-04-2024",
                    deliveredOn: "04-05-2024"
                }
            ],
            totalAmount: 7000
        },
        {
            orderId: 8,
            orderBy: "William",
            DeliveryAddress: {
                address: "45 Hill Street",
                city: "San Francisco",
                state: "California",
                stateCode: "CA",
                postalCode: "94103",
                country: "United States"
            },
            paymentMode: "Card",
            orderedStatus: false,
            productsOrdered: [
                {
                    productName: "Keyboard",
                    productImage: catimage,
                    productPrice: 1500,
                    qty: 2,
                    orderOn: "15-03-2024",
                    deliveredOn: "18-03-2024"
                }
            ],
            totalAmount: 3000
        },
        {
            orderId: 9,
            orderBy: "Mia",
            DeliveryAddress: {
                address: "98 Sunset Blvd",
                city: "Los Angeles",
                state: "California",
                stateCode: "CA",
                postalCode: "90001",
                country: "United States"
            },
            paymentMode: "UPI",
            orderedStatus: true,
            productsOrdered: [
                {
                    productName: "Tablet",
                    productImage: catimage,
                    productPrice: 20000,
                    qty: 1,
                    orderOn: "12-02-2024",
                    deliveredOn: "16-02-2024"
                }
            ],
            totalAmount: 20000
        },
        {
            orderId: 10,
            orderBy: "Benjamin",
            DeliveryAddress: {
                address: "12 Maple Street",
                city: "Miami",
                state: "Florida",
                stateCode: "FL",
                postalCode: "33101",
                country: "United States"
            },
            paymentMode: "Online",
            orderedStatus: false,
            productsOrdered: [
                {
                    productName: "Camera",
                    productImage: catimage,
                    productPrice: 35000,
                    qty: 1,
                    orderOn: "05-01-2024",
                    deliveredOn: "10-01-2024"
                }
            ],
            totalAmount: 35000
        }
    ];


    const dataSource =
        orders.map((orderData, dindex) => ({
            key: dindex,
            sno: dindex + 1,
            orderId: orderData.orderId,
            orderedBy: orderData.orderBy,
            DeliveryAddress: `${orderData.DeliveryAddress.address}, ${orderData.DeliveryAddress.city}, ${orderData.DeliveryAddress.country}`,
            paymentMode: orderData.paymentMode,
            orderedStatus: orderData.orderedStatus,
            totalAmount: orderData.totalAmount,
            products: orderData.productsOrdered,
        }))


    const columns = [
        {
            title: '#',
            dataIndex: 'sno',
            key: 'sno',
            fixed: 'left',
        },
        {
            title: 'Ordered By',
            dataIndex: 'orderedBy',
            key: 'orderedBy',
        },
        {
            title: 'Delivery Address',
            dataIndex: 'DeliveryAddress',
            key: 'DeliveryAddress',
            width: 300,
            ellipsis: true,
        },
        {
            title: 'Payment Mode',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
        },
        {
            title: 'Order Status',
            dataIndex: 'orderedStatus',
            key: 'orderedStatus',
            render: (orderedStatus) => (
                orderedStatus
                    ? <span className="text-color-success admin-bold">Delivered</span>
                    : <span className="text-color-danger admin-bold">Yet to Delivered</span>
            )
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: "Action",
            key: "operation",
            align: "center",
            width: '100px',
            render: (_, record) => (
                <Space>
                    <ViewOrderedProducts data={record} />
                    <InvoicePopup order={record}/>
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
            <AdminHeader title={"View Orders"} hideBack={true} />
            <Row justify={"space-between"} className='admin-header-space'>
                <Col xs={24} sm={12} md={6}>
                    <Form.Item label="Filter option">
                        <Select
                            placeholder="Search..."
                            onChange={(value) => changeselect(value)}
                        >
                            <Option value="orderBy">Ordered By</Option>
                            <Option value="paymentMode">Payment Mode</Option>
                            <Option value="orderedStatus">Ordered Status</Option>
                            <Option value="totalAmount">totalAmount</Option>
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
                ) : headerdefine === "number" ? (
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
                                <Option value="true">Delivered</Option>
                                <Option value="false">Yet to Delivered</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                ) : null}
            </Row>

            <Table dataSource={filteredData} columns={columns} className='brand-pagination' scroll={{ x: "max-content" }} pagination={{
                position: ["bottomCenter"],
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
                showQuickJumper: true,
                onChange: (page, pageSize) => {
                    setPagination({ current: page, pageSize });
                },
                showTotal: (total) => `Total ${total} Orders`,
            }} />
        </>
    )
}

export default ListAllOrders