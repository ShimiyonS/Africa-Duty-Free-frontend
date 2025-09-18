import "./navbar.css"
import { NavLink } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
const NavBar = ({ condition, togglemenu }) => {
  return (
    <div className={`${condition ? "sidebartoggle-active" : ""} sidebar bg-color-primary`}>
      <nav className="nav-header p-1">
        <ul className="d-block d-lg-flex justify-content-center list-unstyled gap-4 m-0 navbar-container">
          <li className="d-flex justify-content-end">
            <button className='d-lg-none bg-transparent border-0 p-3 icon-close' onClick={() => togglemenu(condition)}>
              <TfiClose />
            </button>
          </li>
          <li><NavLink to="/product-category/beauty" className="nav-link px-3 pb-1 fw-bold">BEAUTY</NavLink></li>
          <li><NavLink to="/product-category/spirits" className="nav-link px-3 pb-1 fw-bold">SPIRITS</NavLink></li>
          <li><NavLink to="/product-category/accessories" className="nav-link px-3 pb-1 fw-bold">ACCESSORIES</NavLink></li>
          <li><NavLink to="/product-category/travelers" className="nav-link px-3 pb-1 fw-bold">TRAVELLERS EXCLUSIVES</NavLink></li>
          <li><NavLink to="/product-category/special-offers" className="nav-link px-3 pb-1 fw-bold">SPECIAL OFFERS</NavLink></li>
          <li><NavLink to="/about" className="nav-link px-3 pb-1 fw-bold">ABOUT</NavLink></li>
          <li><NavLink to="/shop" className="nav-link px-3 pb-1 fw-bold">SHOP</NavLink></li>

          {localStorage.getItem('token') ?
            <>
              <li className="d-md-none"><NavLink to={`/my-account`} className="nav-link px-3 pb-1 fw-bold">MY ACCOUNT</NavLink></li>
              <li className="d-md-none">
                <button className='bg-transparent m-0 p-0 border-0 nav-link px-3 pb-1 fw-bold' data-bs-toggle="modal" data-bs-target="#dutyPopup">
                  DUTY FREE
                </button>
              </li>
              <li className="d-md-none"><NavLink to={`/cart`} className="nav-link px-3 pb-1 fw-bold">CART</NavLink></li>
              <li className="d-md-none"><NavLink to={`/wishlist`} className="nav-link px-3 pb-1 fw-bold">WISHLIST</NavLink></li>
              <li className="d-md-none"><button className='bg-transparent m-0 p-0 border-0 nav-link px-3 pb-1 fw-bold'>LOGOUT</button></li>
            </>

            :
            <li className="d-md-none">
              <button
                className='bg-transparent m-0 p-0 border-0 nav-link px-3 pb-1 fw-bold'
                data-bs-toggle="modal"
                data-bs-target="#customPopup">
                LOGIN
              </button>
            </li>}
        </ul>
      </nav>
    </div >
  )
}

export default NavBar