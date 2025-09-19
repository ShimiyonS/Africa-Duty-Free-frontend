import { IoCheckmarkCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const CustomAlert = ({ data }) => {
    return (
        <div className='d-flex align-items-md-center gap-3 flex-md-row flex-column alert-wrapper'>
            <IoCheckmarkCircle className="alert-icon" />
            <p className="mb-0 text-color-secondary">{data?.text}</p>
            <Link className="alert-link text-decoration-none" to={data?.link}>{data?.linkText}</Link>
        </div>
    )
}

export default CustomAlert