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
      {order?.length > 0 ? "ues" : ""}
    </div>
  )
}

export default MyaccountOrders