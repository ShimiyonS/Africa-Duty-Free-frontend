import { Button, Col, Drawer, Flex } from 'antd'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import gpay from "../../assets/gpay.jpg"
import { Link } from 'react-router-dom';

const ViewOrderedProducts = ({ data }) => {

    const [openThis, SetOpenthis] = useState(false);

    const toggleDrawer = () => {
        SetOpenthis(!openThis);
    }

    return (
        <>
            <Button type="link" onClick={toggleDrawer} className={`antd-custom-btn`}>
                <FaRegEye size={19} className='text-color-warning' />
            </Button>

            <Drawer
                title={
                    <Flex align='center' justify='center'>
                        <span>Ordered Details</span>
                    </Flex>
                }
                width={550}
                closable={true}
                onClose={toggleDrawer}
                open={openThis}
            >

                <p className='mb-0 fw-bold'>Hello {data.orderedBy},</p>
                <p className='text-color-muted'>This User order as been confirmed and will be shipping within two days</p>
                <Flex justify='space-between' className='border-top border-bottom border-1 py-2'>
                    <Col span={6}>
                        <p className='text-color-muted text-center mb-1'>Ordered On</p>
                        <p className='text-center mb-1'>11-11-2024</p>
                    </Col>
                    <Col span={3}>
                        <p className='text-color-muted text-center mb-1'>Order Id</p>
                        <p className='text-center mb-1'>{data.orderId}</p>
                    </Col>
                    <Col span={6}>
                        <p className='text-color-muted text-center mb-1'>Payment</p>
                        <img className='admin-payment' src={gpay} alt="" />
                    </Col>
                    <Col span={9}>
                        <p className='text-color-muted mb-1'>Shipping Address</p>
                        <p className='Admin-address mb-1'>{`${data.DeliveryAddress}`}</p>
                    </Col>
                </Flex>
                {data.products.length > 0 ? (
                    data.products.map((item, index) => (
                        <Flex justify='space-between' className='py-3 border-bottom border-1'>
                            <Flex gap={10} >
                                <div>
                                    <Link to={`/product/${item.productId}`}><img className='admin-product-image' src={item.productImage} alt="product-image" /></Link>
                                </div>
                                <div>
                                    <Link to={`/product/${item.productId}`} className='text-decoration-none'><p className='mb-1 fw-bold'>{item.productName}</p></Link>
                                    <p className='text-color-muted mb-1'>Quantity : {item.qty}</p>
                                    <p className='text-color-muted mb-1'>Price : $ {item.productPrice}</p>
                                </div>
                            </Flex>
                            <Col span={6}>
                                <p className='fw-bold'> $ {item.qty * item.productPrice}</p>
                            </Col>
                        </Flex>
                    ))
                ) : (
                    <p>No Product Available</p>
                )}

                <Flex justify='end' className='py-3'>
                    <Col span={12}>
                        <Flex justify='space-between'>
                            <p className='text-color-muted mb-1'>Sub Total</p>
                            <p className='fw-bold mb-1'>$ {data.totalAmount.toFixed(2)}</p>
                        </Flex>
                        <Flex justify='space-between'>
                            <p className='text-color-muted mb-1'>Shipping Fees</p>
                            <p className='fw-bold mb-1'>$ 25.00</p>
                        </Flex>
                        <Flex justify='space-between'>
                            <p className='text-color-muted mb-1'>Tax Total</p>
                            <p className='fw-bold mb-1'>$ 20.00</p>
                        </Flex>
                        <Flex justify='space-between'>
                            <p className='text-color-muted mb-1'>Discount</p>
                            <p className='fw-bold mb-1'>$ 5.00</p>
                        </Flex>
                        <Flex justify='space-between' className='mt-2 border-top border-1'>
                            <p className='fw-bold my-1 '>Total</p>
                            <p className='fw-bold my-1'>$ {(data.totalAmount + 25 + 20 - 5).toFixed(2)}</p>
                        </Flex>
                    </Col>
                </Flex>
            </Drawer>
        </>
    )
}

export default ViewOrderedProducts