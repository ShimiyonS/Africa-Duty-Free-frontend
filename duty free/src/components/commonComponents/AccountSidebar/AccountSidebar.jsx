import "./AccountSidebar.css"
import UserDefaultProfile from "../../../assets/user-default-profile.jpg"
import { FaUser } from "react-icons/fa";
import { FaAsterisk } from "react-icons/fa"; ``
import { FaLock } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from 'react-router-dom'

const AccountSidebar = () => {
    return (
        <>
            <div className="col-4">
                <div className="p-4">
                    <div className="side-bar-img">
                        <img src={UserDefaultProfile} width={125} height={125} className="rounded-circle user-default-img"></img>
                        <p className="fw-bold text-center m-2">Ganesh Kumar</p>
                    </div>
                    <div className="side-bar-links d-flex flex-column">
                        <NavLink className="account-links text-decoration-none mb-1" to="/account/general"><span className="px-3 sidebar-icons"><FaUser/></span><span className="ps-3 bs-1">Account</span></NavLink>
                        <NavLink className="account-links text-decoration-none mb-1" to="/account/password"><span className="px-3 sidebar-icons"><FaAsterisk /></span><span className="ps-3">Change password</span></NavLink>
                        <NavLink className="account-links text-decoration-none mb-1" to="/account/privacy"><span className="px-3 sidebar-icons"><FaLock/></span><span className="ps-3">Privacy</span></NavLink>
                        <NavLink className="account-links text-decoration-none mb-1" to="/account/delete"><span className="px-3 sidebar-icons"><MdDelete/></span><span className="ps-3">Delete Account</span></NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountSidebar