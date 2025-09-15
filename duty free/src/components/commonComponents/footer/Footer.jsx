import { Link } from "react-router-dom";
import './Footer.css'
import Footerimg from '../../../assets/footer-LOGO.svg'
import { FaFacebookF } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";

const Footer = () => {
    return (
        <div className='container'>
            <div className="row footer">
                <div className="col-12 col-sm-6 col-md-3">
                    <img src={Footerimg} width={200} height={200} alt="footer-img" />
                </div>
                <div className="col-12 col-sm-6 col-md-3 pt-3">
                    <p className='dmsans-bold'>Visit Link</p>
                    <Link to="/" className="nav-link pb-2">About World Duty Free</Link>
                    <Link to="/about" className="nav-link pb-2">About</Link>
                    <Link to="/" className="nav-link pb-2">Custom Allowances</Link>
                    <Link to="/" className="nav-link pb-2">Tax & Duty Free Shopping</Link>
                    <Link to="/" className="nav-link pb-2">Tax Strategy</Link>
                    <Link to="/" className="nav-link pb-2">Boarding Pass Statement</Link>
                    <Link to="/" className="nav-link pb-2">Modern Slavery Statement</Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 pt-3">
                    <p className='dmsans-bold'>How can we help?</p>
                    <Link to="/home" className="nav-link pb-2">Home backup</Link>
                    <Link to="/" className="nav-link pb-2">Our Stores</Link>
                    <Link to="/contact-us" className="nav-link pb-2">Contact us</Link>
                    <Link to="/about" className="nav-link pb-2">Customer Service</Link>
                    <Link to="/about" className="nav-link pb-2">FAQs</Link>
                    <Link to="/about" className="nav-link pb-2">Returns & Refunds</Link>
                    <Link to="/about" className="nav-link pb-2">Our Price Promise</Link>

                </div>
                <div className="col-12 col-sm-6 col-md-3 pt-3">
                    <p className='fw-bold'>Contact</p>
                    <Link to="mailto:info@africat-duty-free.com" className="nav-link pb-2">sales@africat-duty-free.com</Link>
                    <Link to="mailto:sales@africat-duty-free.com" className="nav-link pb-2">info@africat-duty-free.com</Link>

                </div>
            </div>

            <div className="d-flex py-3 footer-bottom-bg">
                    <p>Copyright © 2025 Africa Duty Free. All rights reserved.</p>
                <div className="d-flex gap-2">
                    <Link className="nav-link icon-link "><RiTwitterXLine className="twitter-icon footer-share-icons" /></Link>
                    <Link className="nav-link icon-link"><IoLogoInstagram className="instagram-icon footer-share-icons" /></Link>
                    <Link className="nav-link icon-link"><FaFacebookF className="facebook-icon footer-share-icons" /></Link>
                    <Link className="nav-link icon-link"><RiLinkedinFill className="Linkedin-icon footer-share-icons" /></Link>
                </div>

            </div>

        </div>
    )
}

export default Footer