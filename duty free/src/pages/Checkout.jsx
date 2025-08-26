import React, { useEffect, useState } from 'react'
import "../Styles/checkout.css"
import Common from '../commonMethod/Common'
import { IoMdClose } from 'react-icons/io'
import { Link } from 'react-router-dom'
const Checkout = () => {
    const [couponStatus, setCouponStatus] = useState(false)
    const [cart, setCart] = useState([])
    const [form, setForm] = useState({})
  const { apiRequest } = Common()
    const handleChange = () => {

    }
    useEffect(() => {
        const fetchCart = async () => {
            const data = await apiRequest("GET", `/products`);
            setCart(data?.products)
        };
        fetchCart();
    }, [])


    return (
        <div className='container mt-5'>
            <div className='d-flex align-items-center flex-wrap gap-2'>
                <p className='m-0'>Have a coupon?</p>
                <button type='button' onClick={() => { setCouponStatus(!couponStatus) }} className='link-custom m-0 p-0 bg-transparent border-0'>Click here to enter your code</button>
            </div>
            {couponStatus ? <><input type='text' placeholder='coupon code' className='placeholder-custom custom-input mt-5 col-12 col-lg-4' /><button onClick={null} className='apply-btn' >Apply coupon</button></> : ""}
            <div className='d-flex flex-wrap py-5 '>
                <div className='col-12 col-lg-6 p-lg-3'>
                    <h1 className='fw-bold mb-4 cart-heading'>Billing details</h1>
                    <label className='checkout-form-label required'>Email address</label>
                    <input type='email' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <label className='checkout-form-label required'>First name</label>
                    <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <label className='checkout-form-label required'>Last name</label>
                    <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <label className='checkout-form-label '>Company name (optional)</label>
                    <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <label className='checkout-form-label required '>Country / Region</label>
                    <select value={form} onChange={handleChange} className='d-block col-12 col-lg-8 placeholder-custom custom-input'>
                        <option value="">-- Select Region --</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                    </select>
                    <label className='checkout-form-label required'>Street address</label>
                    <input type='text' placeholder='House number and street name' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <input type='text' placeholder='Apartment, suite, unit, etc. (optional)' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <label className='checkout-form-label required '>Town / City</label>
                    <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <label className='checkout-form-label  '>Region (optional)</label>
                    <select value={form} onChange={handleChange} className='d-block col-12 col-lg-8 placeholder-custom custom-input'>
                        <option value="">-- Select Region --</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                    </select>
                    <label className='checkout-form-label required '>Postcode</label>
                    <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <label className='checkout-form-label required '>Phone</label>
                    <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                    <div className='d-flex align-items-center gap-2 my-4'>
                        <input type='checkbox'></input>
                        <h1 className='fw-bold cart-heading'>Ship to a different address?</h1>
                    </div>
                    <label className='checkout-form-label  '>Order notes (optional)</label>
                    <textarea className='d-block col-12 col-lg-8 placeholder-custom custom-input' rows={6} placeholder='Notes about your order, e.g. special notes for delivery.'></textarea>
                </div>
                <div className='col-12 col-lg-6 p-lg-3'>
                    <h1 className='fw-bold mb-4 cart-heading'>Your order</h1>
                    <div className='d-flex align-items-center flex-wrap table-box'>
                        <div className='col-8 col-lg-10 cart-table-title'>Product</div>
                        <div className='col-4 col-lg-2 cart-table-title'>Subtotal</div>
                    </div>
                    {
                        cart?.slice(0, 3).map((item, index) => {
                            return (
                                <div className='d-flex align-items-center flex-wrap table-box-list'>
                                    <div className='col-8 col-lg-10 cart-table-item'>
                                        <div className='d-flex align-items-center flex-wrap gap-3 p-2'>
                                            <img src={item?.thumbnail} className='checkout-item-image' />
                                            <div>
                                                <Link to={`/product/${item.title}`} className='text-decoration-none cart-product-link'>{item.title} * {item?.minimumOrderQuantity}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4 col-lg-2 cart-table-item text-break'>${item?.minimumOrderQuantity * item?.price}</div>
                                </div>
                            )
                        })
                    }
                    <div className='d-flex align-items-center flex-wrap table-box'>
                        <div className='col-8 col-lg-10 cart-table-title right-total'>SUBTOTAL</div>
                        <div className='col-4 col-lg-2 cart-table-title right-total'> ${cart?.reduce((acc, item, i) => acc + (item?.minimumOrderQuantity || 0) * (item?.price || 0), 0)}</div>
                    </div>
                    <div className='d-flex align-items-center table-box-list'>
                        <div className='col-12 cart-table-title right-total p-4'>
                            <p className='cart-table-title right-total'> Shipping</p>
                            <p className='delivery-type px-4 py-3'>Free shipping</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center flex-wrap table-box'>
                        <div className='col-8 col-lg-10 cart-table-title right-total'>TOTAL</div>
                        <div className='col-4 col-lg-2 cart-table-title right-total'> ${cart?.reduce((acc, item, i) => acc + (item?.minimumOrderQuantity || 0) * (item?.price || 0), 0)}</div>
                    </div>
                    <p className='table-box mt-5 mb-0'>Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or wish to make alternate arrangements.</p>
                    <div className=' table-box '>
                        <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link to="/privacy" className='text-decoration-none'>privacy policy.</Link></p>
                        <button onClick={null} className='order-btn w-100 border-0' >PLACE ORDER</button>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Checkout