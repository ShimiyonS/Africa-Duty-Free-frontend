import { Button, Card, Drawer, Flex } from 'antd'
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const UserShowProducts = ({ title, data }) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }
    return (
        <>
            <Button type="primary" onClick={toggleDrawer} className="antd-custom-btn">
                {data.length}
            </Button>
            <>
                <Drawer
                    title={
                        <Flex align='center' justify='center'>
                            <span>{title}</span>
                        </Flex>
                    }
                    width={500}
                    closable={true}
                    onClose={toggleDrawer}
                    open={openDrawer}
                >
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <Card
                                key={index}
                                className="mb-3 shadow-sm"
                            >
                                <Flex align="center" gap={16}>
                                    <img
                                        src={item?.productImage}
                                        alt={item?.productName}
                                        className="admin-product-image"   
                                    />
                                    <div>
                                        <p className="mb-1 fw-bold text-break">Product Name: {item?.productName}</p>
                                        <p className="mb-1 text-color-danger">Price: ${item?.productPrice}</p>
                                        {item.orderOn && <p className="mb-1">Ordered On: <span className="fw-semibold">{item?.orderOn}</span></p>}
                                        {item.deliveredOn && <p className="mb-1">Delivered On: <span className="fw-semibold">{item?.deliveredOn}</span></p>}
                                    </div>
                                </Flex>
                            </Card>
                        ))
                    ) : (
                        <p>No Product Available</p>
                    )}
                </Drawer>
            </>
        </>

    )
}

export default UserShowProducts