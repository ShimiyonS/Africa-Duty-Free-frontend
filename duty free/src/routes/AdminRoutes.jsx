import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import NoPage from '../pages/NoPage'
import { ToastContainer } from 'react-toastify';
import ViewProduct from '../pages/AdminPages/ViewProduct'
import ViewUsers from '../pages/AdminPages/ViewUsers';
import ListAllBrands from '../pages/AdminPages/ListAllBrands'


const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout />}>
                    <Route index path="/" element={<p>vicky</p>} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/brands" element={<ListAllBrands />} />
                    <Route index path="/products" element={<ViewProduct />} />
                    <Route index path="/users" element={<ViewUsers />} />

                </Route>
            </Routes >
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default AdminRoutes