import React from 'react'
import { Link } from 'react-router-dom'

const MyaccountOrders = () => {
  return (
    <div>
        <Link to="/shop" className='d-block text-center text-decoration-none'>Browse product</Link>
        <p className='mt-3'>No order has been made yet.</p>
    </div>
  )
}

export default MyaccountOrders