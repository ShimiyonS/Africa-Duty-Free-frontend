import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
const BackButton = () => {
    return (
        <div>
            <Link to="/" className="text-decoration-none bg-color-muted rounded-4 bg-color-muted text-color-primary px-4 py-1 dmsans-medium  bg-color-warning "><IoMdArrowRoundBack />Back</Link>
        </div>
    )
}

export default BackButton