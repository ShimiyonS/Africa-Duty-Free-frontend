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
                        <h1 className='mb-4 cart-heading justuspro-bold'>Shopping bag</h1>

                        <div className="main-wrapper">
                            <div className="table-responsive cart-wrapper">
                                <table className="table table-cart table-bordered  align-middle ">
                                    <thead className="table-light ">
                                        <tr>
                                            <th className="col-6 justuspro-bold text-color-muted-cart ">PRODUCT</th>
                                            <th className="col-2 justuspro-bold text-color-muted-cart ">PRICE</th>
                                            <th className="col-2 justuspro-bold text-color-muted-cart">QUANTITY</th>
                                            <th className="col-2 justuspro-bold text-color-muted-cart">SUBTOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart?.slice(0, 3).map((item, index) => (
                                            <tr key={item?.id}>
                                                <td>
                                                    <div className="d-flex flex-wrap align-items-center p-2">
                                                        <button
                                                            className="bg-transparent border-0 col-1"
                                                            onClick={() => Remove(item?.id)}
                                                        >
                                                            <IoMdClose />
                                                        </button>
                                                        <img src={item?.thumbnail} alt={item?.title} className="cart-image col-6" />
                                                        <Link
                                                            to={`/product/${item.id}`}
                                                            className="text-decoration-none text-color-danger dmsans-bold col-5"
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="text-color-primary-cart dmsans-bold ">${item?.price}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        name="minimumOrderQuantity"
                                                        onChange={(e) => handleInput(e, index)}
                                                        value={item?.minimumOrderQuantity}
                                                        className="form-control text-center rounded-5 cart-input"
                                                    />
                                                </td>
                                                <td className="text-color-primary-cart dmsans-bold ">
                                                    {Number(item?.minimumOrderQuantity * item?.price).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className='d-flex align-items-center flex-wrap my-4'>
                            <div className='col-lg-6'>
                                <div className='position-relative'>
                                    <input type='text' placeholder='Coupon code' className='w-100 coupon-input border-0 px-5 py-4 text-color-primary-cart' />
                                    <button className='position-absolute apply-coupon-button p-3 border-0 justuspro-medium'>APPLY COUPON</button>
                                </div>
                            </div>
                            <div className='col-lg-6 text-end ps-md-5 pt-5 pt-md-0'>
                                <button className='bg-transparent update-cart  justuspro-medium'>UPDATE CART</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 p-3'>
                        <h1 className='justuspro-bold mb-4'>Cart Totals</h1>
                        <div className='d-flex align-items-center table-box'>
                            <div className='col-6  right-total justuspro-bold'>SUBTOTAL</div>
                            <div className='col-2  right-total dmsans-bold'> ${cart?.reduce((acc, item, i) => acc + (item?.minimumOrderQuantity || 0) * (item?.price || 0), 0)}</div>
                        </div>
                        <div className='d-flex align-items-center table-box-list'>
                            <div className='col-12  right-total p-4'>
                                <p className=' right-total justuspro-bold'> SHIPPING</p>
                                <p className='delivery-type px-4 py-3 justuspro-bold'>FREE SHIPPING</p>
                                <p className=' right-total justuspro-bold'>SHIPPING OPTIONS WILL BE UPDATED DURING CHECKOUT.</p>
                                <button onClick={null} className=" dmsans-regular  bg-transparent border-0 outline-0 p-0 link-custom text-color-danger"  >Calculate shipping</button>
                            </div>
                        </div>
                        <div className='d-flex align-items-center flex-wrap table-box'>
                            <div className='col-6  right-total justuspro-bold'>TOTAL</div>
                            <div className='col-6  right-total dmsans-bold'> ${cart?.reduce((acc, item, i) => acc + (item?.minimumOrderQuantity || 0) * (item?.price || 0), 0)}</div>
                            <Link to={"/checkout"} className='proceed-button col-12 mt-3 mb-5 text-decoration-none d-block text-center text-color-secondary justuspro-medium bg-color-secondary'>PROCEED TO CHECKOUT</Link>
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