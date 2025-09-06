import "./navbar.css"
import { NavLink } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
const NavBar = ({ condition,togglemenu }) => {
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
        </ul>
      </nav>
    </div>
  )
}

export default NavBar