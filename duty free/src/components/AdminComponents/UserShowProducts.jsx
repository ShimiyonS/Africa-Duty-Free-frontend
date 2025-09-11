import { Button, Card, Drawer, Flex } from 'antd'
import { useState } from 'react';
import NotifyBtn from '../commonComponents/NotifyBtn';
import { Link } from 'react-router-dom';

const UserShowProducts = ({ title, data, notifyIcon }) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }
    return (
        <>
            <NotifyBtn icon={notifyIcon} notifyLength={data.length} action={toggleDrawer}/>
            <>
                <Drawer
                    title={
                        <Flex align='center' justify='center'>
                            <span>{title}</span>
                        </Flex>
                    }
                    width={450}
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
                                <Flex gap={16}>
                                    <img
                                        src={item?.productImage}
                                        alt={item?.productName}
                                        className="admin-product-image"
                                    />
                                    <div>
                                        <Link to={`/product/${item.productId}`} className='text-decoration-none'> <p className="mb-1 fw-bold text-break">{item?.productName}</p> </Link>
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