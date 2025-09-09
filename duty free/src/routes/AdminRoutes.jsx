import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import NoPage from '../pages/NoPage'
import { ToastContainer } from 'react-toastify';
import ListAllProducts from '../pages/AdminPages/ListAllProducts'
import ListAllUsers from '../pages/AdminPages/ListAllUsers';
import ListAllBrands from '../pages/AdminPages/ListAllBrands'
import ListAllSubCategories from '../pages/AdminPages/ListAllSubCategories'


const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout />}>
                    <Route index path="/" element={<p>vicky</p>} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/brands" element={<ListAllBrands />} />
                    <Route index path="/products" element={<ListAllProducts />} />
                    <Route index path="/subcategories" element={<ListAllSubCategories />} />
                    <Route index path="/users" element={<ListAllUsers />} />

                </Route>
            </Routes >
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default AdminRoutes