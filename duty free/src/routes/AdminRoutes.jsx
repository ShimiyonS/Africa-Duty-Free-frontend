import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import NoPage from '../pages/NoPage'
import AddAndEditCategory from '../pages/AdminPages/addAndEditCategory'
import { ToastContainer } from 'react-toastify';
import AddAndEditSubCategory from '../pages/AdminPages/addAndEditSubCategory'
import ListCategories from '../pages/AdminPages/listAllCategories'
import AddEditProducts from '../pages/AdminPages/AddEditProducts'
import ViewProduct from '../pages/AdminPages/ViewProduct'
import ViewUsers from '../pages/AdminPages/ViewUsers';
import ListSubCategory from '../pages/AdminPages/ListAllSubCategories'
import AddAndEditBrand from '../pages/AdminPages/AddAndEditBrand'
import ListAllBrands from '../pages/AdminPages/ListAllBrands'
import AddEditUsers from '../pages/AdminPages/AddEditUsers';

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout />}>
                    <Route index path="/" element={<p>vicky</p>} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="addcategory" element={<AddAndEditCategory />} />
                    <Route path="/editcategory/:id" element={<AddAndEditCategory />} />
                    <Route path="/addsubcategory" element={<AddAndEditSubCategory />} />
                    <Route path="/editsubcategory/:id" element={<AddAndEditSubCategory />} />
                    <Route path="/categories" element={<ListCategories />} />
                    <Route path="/subcategories" element={<ListSubCategory />} />
                    <Route path="/addbrand" element={<AddAndEditBrand />} />
                    <Route path="/editbrand/:id" element={<AddAndEditBrand />} />
                    <Route path="/brands" element={<ListAllBrands />} />
                    <Route index path="/products" element={<p>vicky</p>} />
                    <Route index path="/add-product" element={<AddEditProducts />} />
                    <Route index path="/edit-product/:id" element={<AddEditProducts />} />
                    <Route index path="/products" element={<ViewProduct />} />
                    <Route index path="/add-user" element={<AddEditUsers />} />
                    <Route index path="/edit-user/:id" element={<AddEditUsers />} />
                    <Route index path="/users" element={<ViewUsers />} />

                </Route>
            </Routes >
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default AdminRoutes