import "./navbar.css"
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <nav>
        <ul className="d-block d-lg-flex justify-content-center list-unstyled gap-4 m-0">
          <li> <NavLink to="/beauty" className="nav-link">BEAUTY</NavLink> </li>
          <li><NavLink to="/spirits" className="nav-link">SPIRITS</NavLink></li>
          <li><NavLink to="/spirits" className="nav-link">ACCESSORIES</NavLink></li>
          <li><NavLink to="/spirits" className="nav-link">TRAVELLERS EXCLUSIVES</NavLink></li>
          <li><NavLink to="/spirits" className="nav-link">SPECIAL OFFERS</NavLink></li>
          <li><NavLink to="/spirits" className="nav-link">ABOUT</NavLink></li>
          <li><NavLink to="/spirits" className="nav-link">SHOP</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar