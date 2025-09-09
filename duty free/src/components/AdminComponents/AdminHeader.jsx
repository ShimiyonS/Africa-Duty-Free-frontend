import { Flex, Button } from 'antd'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMyContext } from '../../Provider/CommonProvider';
import { Link } from 'react-router-dom';

const AdminHeader = ({ title, addComponent }) => {
    const {handleAdminToggle} = useMyContext();
    const profileimg = localStorage.getItem("image")
    const username = localStorage.getItem("admin")
    const adminToken = localStorage.getItem("LoginToken")


    return (
        <Flex align='center' justify='space-between'>
            <Flex align='center' gap={3}>
                <Button className='admin-toggle-btn' onClick={() => handleAdminToggle()}><RxHamburgerMenu /></Button>
                <Button className='admin-page-back-btn'><IoMdArrowRoundBack /></Button>
                <h2 className="adminform-heading justuspro-medium">{title}</h2>
            </Flex>
            {/* drawer popup  */}
            <Flex align='center' gap={15}>
                {addComponent}
                { adminToken &&
                    <Link to={"/siteadmin/profile"} className='header-profile'>
                        {profileimg ? <img className='profile-img-header' src={profileimg} alt="profile-img" /> : <p className='profile-img-header'>{username.charAt(0)}</p>}
                    </Link>
                }
            </Flex>
        </Flex>
    )
}

export default AdminHeader