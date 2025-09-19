import React from 'react'
import MyAccountLayout from '../layouts/MyAccountLayout'
import { Route, Routes } from 'react-router-dom'
import NoPage from '../pages/NoPage'
import MyaccountDashboard from '../pages/MyAccountPages/MyaccountDashboard'
import MyaccountOrders from '../pages/MyAccountPages/MyaccountOrders'
import MyaccountDownloads from '../pages/MyAccountPages/MyaccountDownloads'
import MyaccountAddresses from '../pages/MyAccountPages/MyaccountAddresses'
import MyaccountDetails from '../pages/MyAccountPages/MyaccountDetails'
import AddressForm from '../components/commonComponents/MyAccountComponents/AddressForm'

const MyAccountRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MyAccountLayout />}>
                <Route index path="/" element={<MyaccountDashboard />} />
                <Route index path="/dashboard" element={<MyaccountDashboard />} />
                <Route index path="/orders" element={<MyaccountOrders />} />
                <Route index path="/downloads" element={<MyaccountDownloads />} />
                <Route index path="/address" element={<MyaccountAddresses />} />
                <Route index path="/edit-address/:type" element={<AddressForm />} />
                <Route index path="/edit-address/:type/:id" element={<AddressForm />} />
                <Route index path="/edit-account" element={<MyaccountDetails />} />
            </Route>
            <Route path="*" element={<NoPage />} />
        </Routes>
    )
}

export default MyAccountRoutes