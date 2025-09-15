import { Table } from 'antd'
import dashImg from '../../assets/Bacardi.png'

const DashboardFile = () => {

    const details = [
        {
            id: 1,
            image: dashImg,
            name: "Beauty",
            width: 150,
        },
        {
            id: 2,
            image: dashImg,
            name: "Beauty",
            width: 150,
        },
        {
            id: 3,
            image: dashImg,
            name: "Beauty",
            width: 150,
        },
    ]

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 100,
            render: (text, record) => (
                <div >
                    <img src={record.image} alt={record.name} width={40} height={40} />
                    <span>{text}</span>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="border-radius-dashboard" >
                <h2 className="justuspro-medium dashboard-table-sub-heading" >Patient File</h2>
                <Table columns={columns} dataSource={details} />
            </div>
        </div>
    )
}

export default DashboardFile