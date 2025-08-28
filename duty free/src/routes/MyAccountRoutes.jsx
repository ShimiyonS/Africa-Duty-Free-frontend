import React from 'react'
import MyAccountLayout from '../layouts/MyAccountLayout'
import { Route, Routes } from 'react-router-dom'
import NoPage from '../pages/NoPage'
import MyaccountDashboard from '../pages/MyAccountPages/MyaccountDashboard'

const MyAccountRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MyAccountLayout />}>
                <Route index path="/" element={<MyaccountDashboard/>} />
            </Route>
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}

export default MyAccountRoutes