import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
const BreadCrumb = ({ navigation }) => {
    return (
        <div className='container'>
            <ul className='d-flex align-items-center gap-1 list-unstyled mt-3 mb-1'>
                {navigation?.map((item, index) => {
                    const isLast = index === navigation.length - 1;
                    return (
                        <>
                            <li><Link to={item?.nav} className='text-decoration-none text-color-muted'>{item?.key}</Link></li>
                            {!isLast && <li><IoIosArrowForward /></li>}
                        </>
                    )
                })}
            </ul>
        </div>
    )
}

export default BreadCrumb