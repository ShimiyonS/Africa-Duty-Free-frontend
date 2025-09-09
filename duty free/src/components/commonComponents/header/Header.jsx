import Headerimg from '../../../assets/LOGO-Africa-Duty-free-def-WEB.png'
import Airplane from '../../../assets/iconen-wit_Tekengebied-1-kopie.svg'
import User from "../../../assets/user.svg"
import Bag from "../../../assets/bag.svg"
import Wishlist from "../../../assets/wishlist.svg"
import { CiSearch } from "react-icons/ci";
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Common from '../../../commonMethod/Common'
import { IoClose } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const Header = ({ togglemenu, togglesidebar }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const { apiRequest } = Common()
  const [cart, setCart] = useState([])
  useEffect(() => {
    const fetchCart = async () => {
      const data = await apiRequest("GET", `/products`);
      setCart(data?.products)
    };
    fetchCart();
    const offcanvasEl = document.getElementById("offcanvasRight");

    const fixBackdrop = () => {
      const backdrops = document.querySelectorAll(".offcanvas-backdrop");
      if (backdrops.length > 1) {
        // keep the last one, remove extras
        backdrops.forEach((el, i) => {
          if (i < backdrops.length - 1) el.remove();
        });
      }
    };

    offcanvasEl?.addEventListener("shown.bs.offcanvas", fixBackdrop);
    offcanvasEl?.addEventListener("hidden.bs.offcanvas", fixBackdrop);

    return () => {
      offcanvasEl?.removeEventListener("shown.bs.offcanvas", fixBackdrop);
      offcanvasEl?.removeEventListener("hidden.bs.offcanvas", fixBackdrop);
    };
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText !== "") {
      navigate(`/search?q=${searchText}`)
    }
  }

  return (

    <div className='container'>
      <div className='d-flex justify-content-lg-around flex-wrap py-2'>
        <div className='col-6 col-lg-5'>
          <Link to="/" className='text-decoration-none '><img src={Headerimg} alt="logo" className='header-img' /></Link>
        </div>
        <div className='col-6 col-lg-7 pt-2'>
          <div className='d-flex align-items-center justify-content-end justify-content-lg-between '>
            <div className="d-none d-lg-block search-container">
              <form onSubmit={handleSearch}>
                <div className="search-bar d-flex align-items-center">
                  <input type="text" id='search' value={searchText} onChange={(e) => setSearchText(e.target.value)} className='header-search justuspro-regular text-color-secondary bg-color-gold' placeholder='Hello! what are you looking for?' required />
                  <button type='submit' className='header-submit m-0 outline-0 text-color-secondary bg-color-gold'><CiSearch /></button>
                </div>
              </form>
            </div>
            <div className="d-none p-2 d-lg-flex justify-content-evenly align-items-center rounded-pill  bg-color-danger  header-menus">
              <button className='bg-transparent m-0 p-0 border-0' data-bs-toggle="modal" data-bs-target="#dutyPopup">
                <img src={Airplane} width={40} height={40} alt="airplane" />
              </button>
              <button className='bg-transparent m-0 p-0 border-0' data-bs-toggle="modal" data-bs-target="#customPopup">
                <img src={User} width={40} height={40} alt="user" />
              </button>
              <button className='bg-transparent m-0 p-0 border-0 header-cart-toggle' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <img src={Bag} width={40} height={40} alt="cart" />
                <div className='header-cart-total text-color-secondary bg-color-gold'>{cart.length}</div>
              </button>
              <Link to={`wishlist`}>
                <img src={Wishlist} width={40} height={40} alt="whislist" />
              </Link>
            </div>
            <button className={`${togglesidebar ? "toggle-icon-active" : ""} d-lg-none bg-transparent border-0 rounded-0 d-flex gap-3 flex-column toggle-icon`} onClick={() => togglemenu(togglesidebar)}>
              <span className="start-line"></span>
              <span className="mid-line"></span>
              <span className="end-line"></span>
            </button>
          </div>
        </div>
      </div>

      {/* duty free popup */}
      <div className="modal fade" id="dutyPopup" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog duty-popup">
          <div className="modal-content p-4 duty-content">
            <div className="duty-popup-header">
              <div className="p-0 p-0 d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  className="btn-close p-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <h2 className="duty-popup-heading justuspro-medium">Buy From Us Duty Free</h2>
            </div>
            <div className="modal-body">

              <form action="" className='duty-popup-form'>
                <div className="row col-12 mb-4">
                  <label className='text-color-primary' htmlFor="collection-point">Collection point:</label>
                  <select id="collection-point" name="airport" className='duty-popup-inputs'>
                    <option value="blantyre">Malawi - Blantyre Airport</option>
                    <option value="lilongwe">Malawi - Lilongwe Airport</option>
                    <option value="ndola">Zambia - Ndola Airport</option>
                    <option value="livingstone">Zambia - Livingstone Airport</option>
                    <option value="harare">Zimbabwe - Harare Airport</option>
                    <option value="victoria">Zimbabwe - Victoria Falls Airport</option>
                    <option value="chirundu">Zimbabwe - Chirundu Border post</option>
                    <option value="bulawayo">Zimbabwe - Bulawayo Airport</option>
                  </select>
                </div>

                <div className="row col-12 mb-4">
                  <div className="col-12 col-md-6 ps-md-0 mb-4 mb-md-0">
                    <input type="text" placeholder='Name' id='name' name='name' className='duty-popup-inputs' />
                  </div>
                  <div className="col-12 col-md-6 pe-md-0 mb-4 mb-md-0">
                    <input type="number" placeholder='Phone Number' id='phonenumber' name='phonenumber' className='duty-popup-inputs' />
                  </div>
                </div>

                <div className="row col-12 mb-4">
                  <input type="email" name="email" id="email" placeholder='Your Email' className='duty-popup-inputs' />
                </div>

                <div className="row col-12 mb-4">
                  <p className='text-color-primary'>Are you a</p>
                  <div className='d-flex justify-content-evenly'>
                    <div className="radio-section">
                      <input type="radio" name="remember" className='custom-radio' />
                      <label htmlFor="remember" className="input-checkbox-label">Diplomat</label>
                    </div>
                    <div className="radio-section">
                      <input type="radio" name="remember" className='custom-radio' />
                      <label htmlFor="remember" className="input-checkbox-label">Traveller</label>
                    </div>
                    <div className="radio-section">
                      <input type="radio" name="remember" className='custom-radio' />
                      <label htmlFor="remember" className="input-checkbox-label">Dityfree shop owner</label>
                    </div>

                  </div>
                </div>

                <div className="row col-12 mb-4">
                  <label className='text-color-primary' htmlFor="destination">Destination</label>
                  <input type="text" id='destination' name='destination' className='duty-popup-inputs' />
                </div>

                <div className="row col-12 mb-4">
                  <textarea name="message" className='duty-popup-textarea' id="" rows={10} cols={4} placeholder='Your Message Here' ></textarea>
                </div>

                <div className="d-flex justify-content-end">
                  <button type='submit' className='duty-popup-button rounded-pill button-bg-gold button-text-primary'>
                    Request Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* login popup */}
      <div className="modal fade" id="customPopup" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <div className="modal-content login-popup">
            <div className="modal-body">
              <div className="p-0 p-0 d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  className=" p-0 sign-popup-btn bg-transparent border-0 outline-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"

                >
                  <IoClose />
                </button>
              </div>
              <div className="d-flex justify-content-around">
                <button
                  className="popup-login  bg-color-danger  text-color-secondary dmsans-bold"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in
                </button>
                <button
                  className="popup-login button-bg-primary text-color-secondary dmsans-bold"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    navigate("/register");
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

      {/* cartlist */}
      <div className="header-cart offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {cart.length > 0 ? <>
            <div className='whishlist-content'>
              {cart?.map((item, index) => {
                return (
                  <div className='d-flex align-items-center gap-3 p-2'>
                    <img src={item?.thumbnail} className='header-cart-image' />
                    <div>
                      <button onClick={() => { navigate(`/product/${item.id}`) }} className='text-decoration-none header-cart-product-link text-color-danger' type='button' data-bs-dismiss="offcanvas" aria-label="Close">{item.title}</button>
                      <p><span className='fs-6'>{item?.minimumOrderQuantity} </span> <IoIosClose className='header-multiply-icon' /> <span className='fw-bold text-break'>${item?.price}</span></p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className='p-2 fw-bold'><span className='fs-6'>Subtotal: </span><span className='fs-5'>${cart?.reduce((acc, item, i) => acc + (item?.minimumOrderQuantity || 0) * (item?.price || 0), 0)}</span></p>
            <div className='d-flex flex-column text-center'>
              <button onClick={() => { navigate("/cart") }} className='position-relative whishilist-button header-cart-link bg-color-primary mb-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">
                <span className="dmsans-bold">VIEW CART</span>
                <div className='button-overlay'>
                </div>
              </button>
              <button onClick={() => { navigate("/checkout") }} className='whishilist-button header-checkout-link bg-color-secondary' type='button' data-bs-dismiss="offcanvas" aria-label="Close"><span className='text-color-secondary dmsans-bold'>PROCEED TO CHECKOUT </span>
                <div className='button-overlay-reverse'>
                </div></button>
            </div>
          </> : <p className='text-center'>No products in the cart.</p>}
        </div>
      </div>
    </div>
  )
}

export default Header