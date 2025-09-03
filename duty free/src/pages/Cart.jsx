import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../Styles/cart.css"
import { IoMdClose } from 'react-icons/io';
import Common from '../commonMethod/Common';
const Cart = () => {
    const { apiRequest } = Common()
    const [cart, setCart] = useState([])
    useEffect(() => {
        const fetchCart = async () => {
            const data = await apiRequest("GET", `/products`);
            setCart(data?.products)
        };
        fetchCart();
    }, [])

    const handleInput = (e, index) => {
        const { value, name } = e.target
        setCart((prev) => {
            return prev.map((item, i) =>
                i === index ? { ...item, [name]: value } : item
            );
        });

    }

    const Remove = (id) => {
        const filter = cart.filter((item) => item.id !== id)
        setCart(filter)
    }
    return (
        <div className='container py-4'>
            {cart.length ?
                <div className='d-flex  flex-wrap py-5 '>
                    <div className='col-lg-8 p-3'>
                        <h1 className='fw-bold mb-4 cart-heading'>Shopping bag</h1>
                        <div className='d-flex align-items-center table-box'>
                            <div className='col-6 cart-table-title'>Product</div>
                            <div className='col-2 cart-table-title'>Price</div>
                            <div className='col-2 cart-table-title'>Quantity</div>
                            <div className='col-2 cart-table-title'>Subtotal</div>
                        </div>
                        {
                            cart?.slice(0, 3).map((item, index) => {
                                return (
                                    <div className='d-flex align-items-center table-box-list'>
                                        <div className='col-6 cart-table-item'>
                                            <div className='d-flex align-items-center gap-3 p-2'>
                                                <button className='bg-transparent border-0' onClick={() => Remove(item?.id)} ><IoMdClose /></button>
                                                <img src={item?.thumbnail} className='cart-image' />
                                                <Link to={`/product/${item.id}`} className='text-decoration-none cart-product-link'>{item.title}</Link>
                                            </div>
                                        </div>
                                        <div className='col-2 cart-table-item'>${item?.price}</div>
                                        <div className='col-2 cart-table-item'>
                                            <input type="number" name='minimumOrderQuantity' onChange={(e) => handleInput(e, index)} value={item?.minimumOrderQuantity} className='cart-number text-center' />
                                        </div>
                                        <div className='col-2 cart-table-item text-break'>{item?.minimumOrderQuantity * item?.price}</div>
                                    </div>
                                )
                            })
                        }
                        <div className='d-flex align-items-center flex-wrap my-4'>
                            <div className='col-lg-6'>
                                <div className='position-relative'>
                                    <input type='text' placeholder='Coupon code' className='w-100 coupon-input border-0 px-5 py-4' />
                                    <button className='position-absolute apply-coupon-button p-3 border-0'>APPLY COUPON</button>
                                </div>
                            </div>
                            <div className='col-lg-6 text-end'>
                                <button className='bg-transparent update-cart '>UPDATE CART</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 p-3'>
                        <h1 className='fw-bold mb-4 cart-heading'>Cart Totals</h1>
                        <div className='d-flex align-items-center table-box'>
                            <div className='col-6 cart-table-title right-total'>Subtotal</div>
                            <div className='col-2 cart-table-title right-total'> ${cart?.reduce((acc, item, i) => acc + (item?.minimumOrderQuantity || 0) * (item?.price || 0), 0)}</div>
                        </div>
                        <div className='d-flex align-items-center table-box-list'>
                            <div className='col-12 cart-table-title right-total p-4'>
                                <p className='cart-table-title right-total'> Shipping</p>
                                <p className='delivery-type px-4 py-3'>Free shipping</p>
                                <p className='cart-table-title right-total'>Shipping options will be updated during checkout.</p>
                                <button onClick={null} className=" dmsans-regular  bg-transparent border-0 outline-0 p-0 link-custom"  >Calculate shipping</button>
                            </div>
                        </div>
                        <div className='d-flex align-items-center flex-wrap table-box'>
                            <div className='col-6 cart-table-title right-total'>Total</div>
                            <div className='col-6 cart-table-title right-total'> ${cart?.reduce((acc, item, i) => acc + (item?.minimumOrderQuantity || 0) * (item?.price || 0), 0)}</div>
                            <Link to={"/checkout"} className='proceed-button col-12 mt-3 mb-5 text-decoration-none d-block text-center '>Proceed to checkout</Link>
                            <Link to={"/checkout"} className='col-12 text-decoration-none d-block text-center '>Proceed to checkout</Link>

                        </div>
                    </div>
                </div> :
                <div>
                    <p>Your cart is currently empty.</p>
                    <Link to={"/shop"} className='text-decoration-none cart-link'>Return to shop	</Link>
                </div>

            }
        </div>
    )
}

export default Cart