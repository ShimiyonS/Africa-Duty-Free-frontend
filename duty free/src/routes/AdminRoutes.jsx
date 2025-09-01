import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import NoPage from '../pages/NoPage'
import AddEditProducts from '../pages/AdminPages/AddEditProducts'
import ViewProduct from '../pages/AdminPages/ViewProduct'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index path="/" element={<p>vicky</p>} />
                <Route index path="/products" element={<p>vicky</p>} />
                <Route index path="/add-product" element={<AddEditProducts/>} />
                <Route index path="/edit-product/:id" element={<AddEditProducts/>} />
                <Route index path="/view-product" element={<ViewProduct/>} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>

    )
}

export default AdminRoutes