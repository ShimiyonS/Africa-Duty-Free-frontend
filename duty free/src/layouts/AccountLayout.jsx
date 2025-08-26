import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from '../components/commonComponents/AccountSidebar/AccountSidebar'

const AccountLayout = () => {
    return (
        <>
            <div className='row container mx-auto contact-us-form'>
                <AccountSidebar />
                <div className="col-6">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default AccountLayout