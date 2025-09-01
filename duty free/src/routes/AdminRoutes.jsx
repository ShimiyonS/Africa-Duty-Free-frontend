import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import NoPage from '../pages/NoPage'
import AddCategory from '../pages/AdminPages/addAndEditCategory'
import { ToastContainer } from 'react-toastify';
import SubCategory from '../pages/AdminPages/addAndEditSubCategory'
import ListCategories from '../pages/AdminPages/listAllCategories'

const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout />}>
                    <Route index path="/" element={<p>vicky</p>} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="addcategory" element={<AddCategory />} />
                    <Route path="/editcategory/:id" element={<AddCategory />} />
                    <Route path="/addsubcategory" element={<SubCategory />} />
                    <Route path="/editsubcategory/:id" element={<SubCategory />} />
                    <Route path ="/listallcategories" element = {<ListCategories/>}/>
                </Route>
            </Routes>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    )
}

export default AdminRoutes