import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AccountLayout from '../layouts/AccountLayout'
import NoPage from '../pages/NoPage'
import General from '../pages/AccountPages/General'
import ChangePassword from '../pages/AccountPages/ChangePassword'
import Privacy from '../pages/AccountPages/Privacy'
import DeleteAccount from '../pages/AccountPages/DeleteAccount'
import ProtectedRoute from './ProtectedRoute'

const AccountRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AccountLayout />}>
          <Route index path="/" element={<General />} />
          <Route path="/general" element={<General />} />
          <Route path="/password" element={<ChangePassword />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/delete" element={<DeleteAccount />} />
        </Route>
    </Routes>
  )
}

export default AccountRoutes