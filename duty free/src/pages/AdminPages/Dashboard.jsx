import { Col, Row } from 'antd'
import DashboardOrders from '../../components/AdminComponents/DashboardOrders'
import OverviewCard from '../../components/AdminComponents/OverviewCard'
import DashboardFile from '../../components/AdminComponents/DashboardFile'
import ProductAnalytic from '../../components/AdminComponents/ProductAnalytic'
import EarningAnalysis from '../../components/AdminComponents/EarningAnalysis'

const Dashboard = () => {
    return (
        <div>
            <OverviewCard />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} xl={16} >
                    <ProductAnalytic />
                </Col>
                <Col xs={24} sm={24} md={24} xl={8}>
                    <EarningAnalysis />
                </Col>
            </Row>

            <Row gutter={20} className="dashboard-order-wrapper">
                <Col xs={24} sm={24} md={24} xl={16} className="dashboard-order-main">
                    <DashboardOrders />
                </Col>
                <Col xs={24} sm={24} md={24} xl={8}>
                    <DashboardFile />
                </Col>
            </Row>

        </div >
    )
}

export default Dashboard