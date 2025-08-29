import "./MyaccountSidebar.css"
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { RxDownload } from "react-icons/rx";
import { LuMapPin } from "react-icons/lu";
import { SlUser } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";
import { NavLink } from 'react-router-dom'
import { useState } from "react";

const MyAccountSidebar = () => {
  const [token,setToken] = useState(localStorage.getItem("LoginToken"))

  const handleLogout = () => {
    localStorage.removeItem("LoginToken")
    setToken(null)
  }
  return (
   
      <div className="side-bar-links d-flex flex-column gap-3">
        <div className="d-flex align-items-center gap-3">
          <AiOutlineDashboard className="myaccountsidebar-icons" />
          <NavLink to="/my-account/dashboard" className="text-decoration-none myaccount-links">DASHBOARDS</NavLink>
        </div>
        <div className="d-flex align-items-center gap-3">
          <LiaCartArrowDownSolid className="myaccountsidebar-icons" />
          <NavLink to="/my-account/orders" className="text-decoration-none myaccount-links">ORDERS</NavLink>
        </div>
        <div className="d-flex align-items-center gap-3">
          <RxDownload className="myaccountsidebar-icons" />
          <NavLink to="/my-account/downloads" className="text-decoration-none myaccount-links">DOWNLOADS</NavLink>
        </div>
        <div className="d-flex align-items-center gap-3">
          <LuMapPin className="myaccountsidebar-icons" />
          <NavLink to="/my-account/edit-address" className="text-decoration-none myaccount-links">ADDRESSES</NavLink>
        </div>
        <div className="d-flex align-items-center gap-3">
          <SlUser className="myaccountsidebar-icons" />
          <NavLink to="/my-account/edit-account" className="text-decoration-none myaccount-links">ACCOUNT DETAILS</NavLink>
        </div>
        <div className="d-flex align-items-center gap-3">
          <LuLogOut className="myaccountsidebar-icons" />
          <button onClick={handleLogout} className="text-decoration-none myaccount-links border-0 text-start">LOGOUT</button>
        </div>
      </div>
  
  )
}

export default MyAccountSidebar