import { Outlet, useLocation } from 'react-router-dom'
import SaleBanner from '../components/commonComponents/header/SaleBanner.jsx'
import Header from '../components/commonComponents/header/Header.jsx'
import NavBar from '../components/commonComponents/header/navbar.jsx'
import Footer from '../components/commonComponents/footer/Footer.jsx'
import { useEffect, useState, Fragment } from 'react'
import CardModal from '../components/commonComponents/CardModal.jsx'
import Common from '../commonMethod/Common.js'
import DiscountComponent from '../components/commonComponents/DiscountComponent.jsx'
import { clearCart } from '../store/slice/viewCartSlice.js'
import ScrollToTop from '../components/commonComponents/ScrollToTop.jsx'
import SwiperComponent from '../components/commonComponents/swiperComponent'


const Layout = () => {
    const { getActiveCart, dispatch } = Common()
    const location = useLocation()
    const slug = location.pathname.split("/").pop();

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const toggleMenu = (payload) => setToggleSidebar(!payload)

    // Hide layout only on /siteadmin (and its nested routes)
    const isAdminRoute = location.pathname.startsWith("/siteadmin")

    useEffect(() => {
        dispatch(clearCart())
    }, [location])

    return (
        <>
            {getActiveCart?.data && Object.keys(getActiveCart.data).length > 0 && <CardModal />}

            {/* Public layout (hide for admin) */}
            {!isAdminRoute && (
                <Fragment>
                    <SaleBanner content="Shop - 30 % less vs high street prices - that is Real Value Duty Free Retail." />
                    <Header togglemenu={toggleMenu} togglesidebar={toggleSidebar} />
                    <NavBar condition={toggleSidebar} togglemenu={toggleMenu} />
                </Fragment>
            )}

            {/* Page Content */}
            <Outlet />

            {/* Footer part (hide for admin) */}
            {!isAdminRoute && (
                <Fragment>
                    
                    <Footer />
                    <ScrollToTop />
                </Fragment>
            )}
        </>
    )
}

export default Layout
