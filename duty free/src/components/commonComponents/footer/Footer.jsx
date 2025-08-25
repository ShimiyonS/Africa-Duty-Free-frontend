import { Link } from "react-router-dom";
import './Footer.css'
import Footerimg from '../../../assets/footer-LOGO.svg'
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='container'>
            <div className="row footer">
                <div className="col-12 col-sm-6 col-md-3">
                    <img src={Footerimg} width={200} height={200} alt="footer-img" />
                </div>
                <div className="col-12 col-sm-6 col-md-3 pt-3">
                    <p className='fw-bold'>Visit Link</p>
                    <Link to="/" className="nav-link pb-2">Privacy</Link>
                    <Link  to="/" className="nav-link pb-2">Terms & Conditions</Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 pt-3">
                    <p className='fw-bold'>Company</p>
                    <Link to="/home" className="nav-link pb-2">Home backup</Link>
                    <Link to="/about" className="nav-link pb-2">About</Link>
                    <Link to="/contact-us" className="nav-link pb-2">Contact us</Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 pt-3">
                    <p className='fw-bold'>Contact</p>
                    <Link to="/mailto:info@africat-duty-free.com" className="nav-link pb-2">Info</Link>
                    <Link to="/mailto:sales@africat-duty-free.com" className="nav-link pb-2">Sales</Link>

                </div>
            </div>

            <div className="d-flex justify-content-between py-3">
                <div>
                    <p>Copyright © 2025 Africa Duty Free. All rights reserved.</p>
                </div>
                <div className="d-flex gap-4">
                    <Link className="nav-link icon-link"><FaFacebookF className="facebook-icon" /></Link>
                    <Link className="nav-link icon-link"><FaLinkedinIn className="Linkedin-icon" /></Link>
                </div>

            </div>

        </div>
    )
}

export default Footer