import Headerimg from '../../../assets/LOGO-Africa-Duty-free-def-WEB.png'
import Airplane from '../../../assets/iconen-wit_Tekengebied-1-kopie.svg'
import User from "../../../assets/user.svg"
import Bag from "../../../assets/bag.svg"
import Wishlist from "../../../assets/wishlist.svg"
import { CiSearch } from "react-icons/ci";
import "./Header.css"
import { Link } from 'react-router-dom'

const Header = ({ togglemenu, togglesidebar }) => {

  return (
    <div className='d-flex justify-content-between justify-content-lg-around py-3'>
      <div className="header-img">
        <Link to="/"><img src={Headerimg} alt="#logo" /></Link>
      </div>
      <div className="d-none d-lg-block search-container">
        <form action="#">
          <div className="search-bar">
            <input type="text" id='search' className='header-search' placeholder='Hello! what are you looking for?' />
            <button type='submit' className='header-submit'><CiSearch /></button>
          </div>
        </form>
      </div>
      <div className="d-none d-lg-flex justify-content-evenly align-items-center rounded-pill header-menus">
        <img src={Airplane} width={40} height={40} alt="airplane" />
        <img src={User} width={40} height={40} alt="user" />
        <img src={Bag} width={40} height={40} alt="cart"/>
        <img src={Wishlist} width={40} height={40} alt="whislist" />
      </div>
      <button className={`${togglesidebar ? "toggle-icon-active" : ""} d-lg-none bg-transparent border-0 rounded-0 d-flex gap-3 flex-column toggle-icon`} onClick={() => togglemenu(togglesidebar)}>
        <span className="start-line"></span>
        <span className="mid-line"></span>
        <span className="end-line"></span>
      </button>
    </div>
  )
}

export default Header