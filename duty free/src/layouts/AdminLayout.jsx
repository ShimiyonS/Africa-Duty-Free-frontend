import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminMenuBar from '../components/AdminMenuBar'
import "../Styles/admin.css"
import { useMyContext } from '../Provider/CommonProvider'

const AdminLayout = () => {
    const { adminSidebarToggle } = useMyContext()
    return (
        <div className='d-flex flex-wrap'>
            <div className={`admin-left-wrapper bg-color-primary ${adminSidebarToggle ? `adminsidebar-active` : ``}`}>
                <AdminMenuBar />
            </div>
            <div className='admin-right-wrapper'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout