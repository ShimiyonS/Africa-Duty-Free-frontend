import { Col, Row } from 'antd'
import DashboardOrders from '../../components/AdminComponents/DashboardOrders'
import OverviewCard from '../../components/AdminComponents/OverviewCard'
import DashboardFile from '../../components/AdminComponents/DashboardFile'
import ProductAnalytic from '../../components/AdminComponents/ProductAnalytic'
import EarningAnalysis from '../../components/AdminComponents/EarningAnalysis'
import DateFilter from '../../components/DateFilter'
import AdminHeader from '../../components/AdminComponents/AdminHeader'

const Dashboard = () => {
    return (
        <div>
            <AdminHeader title={"Dashboard"} addComponent={<DateFilter />} hideBack={true} customClass={"admin-container-responsive"} />
            <OverviewCard />
            <Row gutter={20}>
                <Col xs={24} xl={16} >
                    <ProductAnalytic />
                </Col>
                <Col xs={24} xl={8}>
                    <EarningAnalysis />
                </Col>
            </Row>

            <Row gutter={20} className="antd-table-wrapper">
                <Col xs={24} xl={16} className="dashboard-order-main">
                    <DashboardOrders />
                </Col>
                <Col xs={24} xl={8}>
                    <DashboardFile />
                </Col>
            </Row>

        </div >
    )
}

export default Dashboard