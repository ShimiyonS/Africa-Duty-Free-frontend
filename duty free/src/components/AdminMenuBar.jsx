import { Link, NavLink } from "react-router-dom"
import "../Styles/adminmenu.css"
import logo from "../assets/LOGO-Africa-Duty-free-def-WEB.png"
import { RxDashboard } from "react-icons/rx";
import { LuShoppingCart } from "react-icons/lu";
import { LuUserRound } from "react-icons/lu";
import { LuList } from "react-icons/lu";
import { TiEquals } from "react-icons/ti";
import { SiFluentbit } from "react-icons/si";

const AdminMenuBar = () => {
    return (
        <div className="menu-wrapper">
            <Link to="/siteadmin" className='text-decoration-none px-3 py-3 d-block logo-wrapper'><img src={logo} alt="logo" className='admin-image' /></Link>
            <div className=" px-3 py-2 admin-menu-wrapper">
                <NavLink to="/siteadmin" end className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary " > <RxDashboard style={{ width: "20px", height: "20px" }} /><span className="justuspro-regular">Dashboard</span></NavLink>
                <NavLink to="/siteadmin/products" end className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary " > <LuShoppingCart style={{ width: "20px", height: "20px" }} /><span className="justuspro-regular">Products</span></NavLink>
                <NavLink to="/siteadmin/listallcategories" end className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary " > <LuList style={{ width: "20px", height: "20px" }} /><span className="justuspro-regular">Categories</span></NavLink>
                <NavLink to="/siteadmin/listallsubcategories" end className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary " > <TiEquals  style={{ width: "20px", height: "20px" }} /><span className="justuspro-regular">Sub-Categories</span></NavLink>
                <NavLink to="/siteadmin/listallbrand" end className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary " > <SiFluentbit style={{ width: "20px", height: "20px" }} /><span className="justuspro-regular">Brands</span></NavLink>
                <NavLink to="/siteadmin/users" end className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary " > <LuUserRound style={{ width: "20px", height: "20px" }} /><span className="justuspro-regular">users</span></NavLink>
            </div>
        </div>
    )
}
export default AdminMenuBar