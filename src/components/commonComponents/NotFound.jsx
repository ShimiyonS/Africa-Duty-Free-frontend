import Errorimg from "../../assets/404.svg"
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";

const NotFound = () => {
    return (
        <div className='container mx-auto mt-5'>
            <h2 className='text-404'>
                404
            </h2>
            <div className="d-flex align-items-center gap-4">
                <img src={Errorimg} alt="404" />
                <div>
                    <h3 className="fw-bold">Oops! Page Not Found</h3>
                    <p>It seems we can’t find what you’re looking for. Perhaps searching can help.</p>
                </div>
            </div>
            <form action="">
                <div className="search-404 col-12 col-md-6 col-lg-4 col-xl-3">
                    <input className="w-100 custom-input py-3" type="text" placeholder="Search" />
                    <button className="search-404-btn border-0 bg-transparent" type="submit"><IoSearchOutline /></button>
                </div>
            </form>
            <Link to="/home" className="text-decoration-none"><GoArrowLeft /> Bring me back home</Link>
        </div>
    )
}

export default NotFound