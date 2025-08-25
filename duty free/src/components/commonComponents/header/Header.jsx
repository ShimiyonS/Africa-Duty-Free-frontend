import Headerimg from '../../../assets/LOGO-Africa-Duty-free-def-WEB.png'
import Airplane from '../../../assets/iconen-wit_Tekengebied-1-kopie.svg'
import User from "../../../assets/user.svg"
import Bag from "../../../assets/bag.svg"
import Wishlist from "../../../assets/wishlist.svg"
import { CiSearch } from "react-icons/ci";
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ togglemenu, togglesidebar }) => {
  const navigate = useNavigate();

  return (
    <>
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
          <button className='bg-transparent m-0 p-0 border-0' data-bs-toggle="modal" data-bs-target="#customPopup">
            <img src={User} width={40} height={40} alt="user" />
          </button>
          <img src={Bag} width={40} height={40} alt="cart" />
          <img src={Wishlist} width={40} height={40} alt="whislist" />
        </div>
        <button className={`${togglesidebar ? "toggle-icon-active" : ""} d-lg-none bg-transparent border-0 rounded-0 d-flex gap-3 flex-column toggle-icon`} onClick={() => togglemenu(togglesidebar)}>
          <span className="start-line"></span>
          <span className="mid-line"></span>
          <span className="end-line"></span>
        </button>
      </div>

      {/* login popup */}
      <div className="modal fade" id="customPopup" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div className="modal-content login-popup">
            <div className="modal-body">
              <div className="p-0 p-0 d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  className="btn-close p-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="d-flex justify-content-around">
                <button
                  className="popup-login"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign up
                </button>
                <button
                  className="popup-login login-popup2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign up
                </button>
              </div>
              <div className='d-flex justify-content-center align-items-center'>
                <ul className='popup-points'>
                  <li>Collect points & enjoy instant discounts</li>
                  <li>Exclusive & personalized offers</li>
                  <li> Beauty tips & news</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header