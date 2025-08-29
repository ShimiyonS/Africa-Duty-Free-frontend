import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
    localStorage.setItem("role", 2)
    localStorage.setItem("LoginToken", "test")
    const token = localStorage.getItem("LoginToken");
    const role = localStorage.getItem("role");

    if (!token && role !== 2) {
        return <Navigate to="/login" replace />;
    }

    return children;

}

export default ProtectedAdminRoute