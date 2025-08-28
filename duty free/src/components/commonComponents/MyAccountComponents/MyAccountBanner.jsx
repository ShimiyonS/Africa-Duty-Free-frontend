import BannerImg from '../../../assets/travelers.png'
import DefaultImg from '../../../assets/user-default-profile.jpg'
import "./MyAccountBanner.css"

const MyAccountBanner = () => {
    return (
            <div className='myaccountbanner-section p-4'>
                <div className="d-block d-md-flex align-items-center gap-2 account-details">
                    <img className='rounded-circle' src={DefaultImg} width={100} height={100} alt='profile-img'></img>
                    <h2 className='m-0 ms-2 primary-text-color justuspro-medium fs-1 fw-bold'>Hi ganesh123, Welcome back</h2>
                </div>
            </div>
    )
}

export default MyAccountBanner