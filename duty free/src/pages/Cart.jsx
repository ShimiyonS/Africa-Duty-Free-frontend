import { useEffect, useState } from 'react'
import { apiRequest } from '../commonMethod/common';
import { Link } from 'react-router-dom';
import "../Styles/cart.css"
import { IoMdClose } from 'react-icons/io';
const Cart = () => {
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
                <div className='d-flex  flex-wrap pt-5'>
                    <div className='col-lg-7 p-3'>
                        <h1 className='fw-bold mb-4'>Shopping bag</h1>
                        <div className='d-flex align-items-center table-box'>
                            <div className='col-6 cart-table-title'>Product</div>
                            <div className='col-2 cart-table-title'>Price</div>
                            <div className='col-2 cart-table-title'>Quantity</div>
                            <div className='col-2 cart-table-title'>Subtotal</div>
                        </div>
                        {
                            cart?.map((item, index) => {
                                return (
                                    <div className='d-flex align-items-center table-box-list'>
                                        <div className='col-6 cart-table-item'>
                                            <div className='d-flex align-items-center gap-3 p-2'>
                                                <button className='bg-transparent border-0' onClick={() => Remove(item?.id)} ><IoMdClose /></button>
                                                <img src={item?.thumbnail} className='cart-image' />
                                                <Link to={`/product/${item.title}`} className='text-decoration-none cart-product-link'>{item.title}</Link>
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

                    </div>
                    <div className='col-lg-5 p-3'>
                        <h1 className='fw-bold mb-4'>Cart Totals</h1>
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