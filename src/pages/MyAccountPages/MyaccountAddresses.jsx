import React from 'react'
import { Link } from 'react-router-dom'

const MyaccountAddresses = () => {
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
                <div className='address-block mb-5'>
                    <p className='text-color-muted' >You have not set up this type of address yet.</p>
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