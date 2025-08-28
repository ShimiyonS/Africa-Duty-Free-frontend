import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const token = localStorage.getItem("LoginToken");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;

}

export default ProtectedRoute