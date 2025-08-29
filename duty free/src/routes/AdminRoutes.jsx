import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import NoPage from '../pages/NoPage'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index path="/" element={<p>vicky</p>} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>

    )
}

export default AdminRoutes