import { Table, Space } from 'antd'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import catimage from "../../assets/Bacardi.png"

const DashboardOrder = () => {

    const details = [
        {
            id: 1,
            image: catimage,
            orderedBy: "John Doe",
            deliveryAddress: "221B Baker Street, London",
            paymentMode: "Credit Card",
            paymentStatus: "Paid",
            totalAmount: 250,
        },
        {
            id: 2,
            image: catimage,
            orderedBy: "Priya Sharma",
            deliveryAddress: "No.12, Anna Nagar, Chennai",
            paymentMode: "UPI",
            paymentStatus: "Pending",
            totalAmount: 1200,
        },
        {
            id: 3,
            image: catimage,
            orderedBy: "Michael Smith",
            deliveryAddress: "45, Park Avenue, New York",
            paymentMode: "Cash on Delivery",
            paymentStatus: "Paid",
            totalAmount: 560,
        },
    ]


    const columns = [
        {
            title: 'Ordered By',
            dataIndex: 'orderedBy',
            key: 'orderedBy',
            width: 100,
            render: (text, record) => (
                <div className="dashboard-order-image">
                    <img src={record.image} alt={record.name} width={40} height={40} />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Delivery Address',
            dataIndex: 'deliveryAddress',
            key: 'deliveryAddress',
            width: 100,
        },
        {
            title: 'Payment Mode',
            dataIndex: 'paymentMode',
            key: 'paymentMode',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 100,
            ellipsis: true,
            render: (amount) => (
                <div style={{ padding: "8px 16px" }}>
                    {amount}
                </div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 60,
            render: () => (
                <Space className="dashboard-action">
                    <FaRegEdit size={19} className="text-color-warning" />
                    <MdDeleteOutline size={19} className="text-color-danger" />
                </Space>
            ),
        },
    ];

    return (
        <div className="antd-table-wrapper">
            <div className="antd-radius-table antd-order-container" >
                <h2 className="justuspro-medium dashboard-table-sub-heading" >Orders</h2>
                <Table columns={columns} dataSource={details} pagination={true} scroll={{ x: 800 }} tableLayout="fixed" />
            </div>
        </div>
    )
}

export default DashboardOrder