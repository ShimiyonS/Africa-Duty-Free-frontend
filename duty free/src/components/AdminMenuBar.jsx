import { Link, NavLink } from "react-router-dom"
import "../Styles/adminmenu.css"
import logo from "../assets/LOGO-Africa-Duty-free-def-WEB.png"
import { RxDashboard } from "react-icons/rx";
import { LuUserRound } from "react-icons/lu";
import { GiDrinkMe } from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
import { useMyContext } from "../Provider/CommonProvider";
import { TfiClose } from "react-icons/tfi";
import { Flex,Button } from "antd";


const AdminMenuBar = () => {
    const { handleAdminToggle } = useMyContext()
    return (
        <div className="menu-wrapper">
            <div className="logo-wrapper">
                <Flex justify="end">
                    <Button className="admin-sidebar-close" onClick={() => handleAdminToggle()}><TfiClose /></Button>
                </Flex>
                <Link to="/siteadmin" className='text-decoration-none px-3 py-3 d-block'><img src={logo} alt="logo" className='admin-image' /></Link>
            </div>
            <div className=" px-3 py-2 admin-menu-wrapper">
                <NavLink to="/siteadmin" end className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary"> <RxDashboard /><span className="justuspro-regular">Dashboard</span></NavLink>
                <NavLink to="/siteadmin/products" className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary"> <GiDrinkMe /><span className="justuspro-regular">Products</span></NavLink>
                <NavLink to="/siteadmin/category" className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary"> <GiDrinkMe /><span className="justuspro-regular">Category</span></NavLink>
                <NavLink to="/siteadmin/brands" className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary"><MdCategory /><span className="justuspro-regular">Brands</span></NavLink>
                <NavLink to="/siteadmin/users" className="d-flex rounded-2 align-items-center gap-3 admin-menu-link d-block text-decoration-none text-color-primary"> <LuUserRound /><span className="justuspro-regular">users</span></NavLink>

            </div>
        </div>
    )
}
export default AdminMenuBar