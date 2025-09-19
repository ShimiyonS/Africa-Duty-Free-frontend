import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import common from '../../commonMethod/common.js'
import { toast } from 'react-toastify'
import Loader from '../../components/commonComponents/loader/Loader'

const MyaccountOrders = () => {
  const { apiRequest } = common()
  const [order, setOrder] = useState()
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem("user"))
  const fetchUserOrders = async () => {
    try {
      setLoading(true)
      const res = await apiRequest("GET", "/orders/me")
      setOrder(res?.orders)
      toast.success(res?.message)
    }
    catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserOrders()
    }
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      <Link to="/shop" className='d-block text-center text-decoration-none'>Browse product</Link>
      {order?.length > 0 ?
        <table className='w-100 table table-bordered mt-5'>
          <thead>
            <tr>
              <th>Order Id </th>
              <th>Billing Address</th>
              <th>Shipping Address</th>
              <th>Payment Mode</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {order?.map((item) => {
              return (
                <tr>
                  <td>{item?.tx_ref}</td>
                  <td>{item?.billingAddress?.street1}, {item?.billingAddress?.country}, {item?.billingAddress?.region}, {item?.billingAddress?.city}, {item?.billingAddress?.postalCode}</td>
                  <td>{item?.shippingAddress?.street1}, {item?.shippingAddress?.country}, {item?.shippingAddress?.region}, {item?.shippingAddress?.city}, {item?.shippingAddress?.postalCode}</td>
                  <td>{item?.payment_method}</td>
                  <td>{item?.status}</td>
                  <td>{item?.total}</td>
                </tr>
              )
            })}
          </tbody>
        </table> : ""}
    </div>
  )
}

export default MyaccountOrders