import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminMenuBar from '../components/AdminMenuBar'
import "../Styles/admin.css"

const AdminLayout = () => {
    return (
        <div className='d-flex flex-wrap'>
            <div className='admin-left-wrapper'>
                <AdminMenuBar />
            </div>
            <div className='admin-right-wrapper'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout