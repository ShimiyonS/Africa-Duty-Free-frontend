import { IoCheckmarkCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const CustomAlert = ({ data }) => {
    return (
        <div className='d-flex align-items-center gap-3 alert-wrapper'>
            <IoCheckmarkCircle style={{ width: "25px", height: "25px" }} />
            <p className="mb-0 alert-text">{data?.text}</p>
            <Link className="alert-link text-decoration-none" to={data?.link}>{data?.linkText}</Link>
        </div>
    )
}

export default CustomAlert