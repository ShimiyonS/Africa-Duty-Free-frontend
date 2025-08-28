import { Outlet } from 'react-router-dom'
import MyAccountBanner from '../components/commonComponents/MyAccountComponents/MyAccountBanner'
import MyAccountSidebar from '../components/commonComponents/MyAccountComponents/MyAccountSidebar'

const MyAccountLayout = () => {
    return (
        <>
        <MyAccountBanner/>
            <div className='row container-fluid account-controls'>
                <MyAccountSidebar/>
                <div className="p-4 p-md-0 col-12 col-md-6 col-lg-9">
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default MyAccountLayout