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
                <div className="col-12 col-sm-6 col-md-3">
                    <p className='fw-bold'>Visit Link</p>
                    <Link className="nav-link pb-2">Privacy</Link>
                    <Link className="nav-link pb-2">Terms & Conditions</Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <p className='fw-bold'>Company</p>
                    <Link className="nav-link pb-2">Home backup</Link>
                    <Link className="nav-link pb-2">About</Link>
                    <Link className="nav-link pb-2">Contact us</Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3">
                    <p className='fw-bold'>Contact</p>
                    <a className="nav-link pb-2">Info</a>
                    <a className="nav-link pb-2">Sales</a>

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