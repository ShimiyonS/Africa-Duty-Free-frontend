import { Outlet } from 'react-router-dom'
import MyAccountBanner from '../components/commonComponents/MyAccountComponents/MyAccountBanner'
import MyAccountSidebar from '../components/commonComponents/MyAccountComponents/MyAccountSidebar'

const MyAccountLayout = () => {
    return (
        <>
            <MyAccountBanner />
            <div className='d-flex flex-wrap px-2 account-controls'>
                <div className="col-12 col-md-3">
                    <MyAccountSidebar />
                </div>

                <div className="col-12 col-md-9 px-2 px-md-5">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default MyAccountLayout