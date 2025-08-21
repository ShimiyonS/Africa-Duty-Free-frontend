import Headerimg from '../../../assets/LOGO-Africa-Duty-free-def-WEB.png'
import { CiSearch } from "react-icons/ci";
import "./Header.css"

const Header = () => {
  return (
    <div className='d-flex justify-content-around py-3'>
      <div className="header-img">
        <img src={Headerimg} alt="#logo" />
      </div>
      <div className="d-none d-lg-block search-container">
        <form action="#">
          <div className="search-bar">
            <input type="text" className='header-search' placeholder='Hello! what are you looking for?' />
            <button type='submit' className='header-submit'><CiSearch /></button>
          </div>
        </form>
      </div>
      <div className="d-none d-lg-flex rounded-pill header-menus">

      </div>
        <div class="aux-burger aux-regular-large">
        
          <span class="mid-line"></span>
        </div>
    </div>
  )
}

export default Header