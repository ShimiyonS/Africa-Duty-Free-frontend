import React from 'react'
import { Outlet } from 'react-router-dom'
import AccountSidebar from '../components/commonComponents/AccountSidebar/AccountSidebar'

const AccountLayout = () => {
    return (
        <>
            <div className='row container mx-auto account-controls'>
                <div className="col-12 col-md-6 col-lg-4">
                    <AccountSidebar />
                </div>
                <div className="p-4 p-md-0 col-12 col-md-6 col-lg-7">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default AccountLayout