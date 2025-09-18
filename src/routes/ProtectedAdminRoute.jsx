import { Navigate } from 'react-router-dom';
import defaultimg from '../assets/user-default-profile.jpg'

const ProtectedAdminRoute = ({ children }) => {
    localStorage.setItem("role", 2)
    localStorage.setItem("LoginToken", "test")
    localStorage.setItem("image", defaultimg)
    localStorage.setItem("admin", "Ganesh")
    const token = localStorage.getItem("LoginToken");
    const role = localStorage.getItem("role");

    if (!token && role !== 2) {
        return <Navigate to="/login" replace />;
    }

    return children;

}

export default ProtectedAdminRoute