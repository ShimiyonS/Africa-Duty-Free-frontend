import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidCalendarMinus } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import { Flex } from 'antd';
import '../../Styles/dashboard.css'
import { FaInbox } from "react-icons/fa";
import { Row, Col } from "antd";
import { Link } from 'react-router-dom';


const OverviewCard = () => {
    return (
        <div>
            <Row gutter={16} justify="space-around">

                <Col xs={24} sm={12} md={12} lg={12} xl={6} className="dashboard-card">
                    <div className="total-order table-order-relative ">
                        <Flex justify="flex-end">
                            <BsThreeDotsVertical size={20} />
                        </Flex>
                        <Flex gap={10} >
                            <Flex className="calendar-icon-div" justify="center" align="center">
                                <BiSolidCalendarMinus size={23} className="calendar-icon" />
                            </Flex>
                            <div >
                                <Link to={"products"} className="text-color-white view-card-title justuspro-regular">Total Product</Link>
                                <h5 className="text-color-white dmsans-bold">436</h5>
                                <BiSolidCalendarMinus size={76} fill={"white"} className="view-card-icon-absolute" />
                            </div>
                        </Flex>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={6} className="dashboard-card">
                    <div className="total-order table-order-relative dashboard-total-users">
                        <Flex justify="flex-end">
                            <BsThreeDotsVertical size={20} />
                        </Flex>
                        <Flex gap={10} >
                            <Flex className="calendar-icon-div" justify="center" align="center">
                                <HiUserGroup size={23} className="calendar-icon-user" />
                            </Flex>
                            <div >
                                <Link to={"users"} className="text-color-white view-card-title justuspro-regular ">Total Users</Link>
                                <h5 className="text-color-white dmsans-bold">436</h5>
                                <HiUserGroup size={76} fill={"white"} className="view-card-icon-absolute" />
                            </div>
                        </Flex>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={6} className="dashboard-card">
                    <div className="total-order table-order-relative dashboard-total-orders">
                        <Flex justify="flex-end">
                            <BsThreeDotsVertical size={20} />
                        </Flex>
                        <Flex gap={10} >
                            <Flex className="calendar-icon-div" justify="center" align="center">
                                <FaInbox size={23} className="calendar-icon-order" />
                            </Flex>
                            <div >
                                <Link className="text-color-white view-card-title justuspro-regular ">Total Orders</Link>
                                <h5 className="text-color-white dmsans-bold">436</h5>
                                <FaInbox size={76} fill={"white"} className="view-card-icon-absolute dashboard-total-order" />
                            </div>
                        </Flex>
                    </div>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={6} className="dashboard-card">
                    <div className="total-order table-order-relative dashboard-total-earning">
                        <Flex justify="flex-end">
                            <BsThreeDotsVertical size={20} />
                        </Flex>
                        <Flex gap={10} >
                            <Flex className="calendar-icon-div" justify="center" align="center">
                                <FaSackDollar size={23} className="calendar-icon-earning" />
                            </Flex>
                            <div >
                                <Link className="text-color-white view-card-title justuspro-regular">Total Earning</Link>
                                <h5 className="text-color-white dmsans-bold">436</h5>
                                <FaSackDollar size={76} fill={"white"} className="view-card-icon-absolute dashboard-dollar-icon" />
                            </div>
                        </Flex>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default OverviewCard