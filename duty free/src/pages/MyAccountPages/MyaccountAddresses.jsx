import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import common from '../../commonMethod/common.js'

const MyaccountAddresses = () => {
    const { apiRequest } = common()
    const [form, setForm] = useState({
        billing: "",
        shipping: ""
    })

    const user = JSON.stringify(localStorage.getItem("user"))


    const fetchUserAddress = async () => {
        try {
            const res = await apiRequest("GET", "/address");
            const data = res?.addresses
            setForm((prev) => ({
                ...prev,
                billing: data?.find((item) => item?.type == "billing"),
                shipping: data?.filter((item) => item?.type == "shipping")
            }))
            toast.success(res?.message)
        }
        catch (error) {
            toast.success(error?.message)
        }
    }
    useEffect(() => {
        if (user) {
            fetchUserAddress()
        }
    }, [])

    return (
        <>
            <div className='borderbottom-1'>
                <p className='text-color-muted'>The following addresses will be used on the checkout page by default.</p>
            </div>
            <div className='billing-address-section borderbottom-1'>
                <div className='d-flex justify-content-between align-items-center py-4'>
                    <h2 className='justuspro-bold'>Billing address</h2>
                    <Link to="/my-account/edit-address/billing" className='myaccountaddress-button text-color-secondary button-bg-primary'>EDIT BILLING ADDRESS</Link>
                </div>
                <div className="address-card p-3 border rounded shadow-sm">
                    <h5 className="fw-bold mb-3">Billing Address</h5>
                    <p><strong>Firstname:</strong> {form?.billing?.firstName}</p>
                    <p><strong>Lastname:</strong> {form?.billing?.lastName}</p>
                    <p><strong>Country:</strong> {form?.billing?.country}</p>
                    <p><strong>Region:</strong> {form?.billing?.region}</p>
                    <p><strong>City:</strong> {form?.billing?.city}</p>
                    <p><strong>Street:</strong> {form?.billing?.street1}</p>
                </div>

            </div>
            <div className='shipping-address-section borderbottom-1'>
                <div className='d-flex justify-content-between align-items-center py-4'>
                    <h2 className='justuspro-bold'>Shipping address</h2>
                    <Link to="/my-account/edit-address/shipping" className='myaccountaddress-button text-color-secondary button-bg-primary'>EDIT SHIPPING ADDRESS</Link>
                </div>
                <div className='address-block mb-5'>
                    <p className='text-color-muted'>You have not set up this type of address yet.</p>
                </div>
            </div>
        </>
    )
}

export default MyaccountAddresses