import { Outlet } from 'react-router-dom'
import SaleBanner from '../components/commonComponents/header/SaleBanner.jsx'
import Header from '../components/commonComponents/header/Header.jsx'
import NavBar from '../components/commonComponents/header/navbar.jsx'

const Layout = () => {
    return (
        <>
            <SaleBanner content={"Shop - 30 % less vs high street prices - that is Real Value Duty Free Retail."} />
            <Header />
            <NavBar />
            <Outlet />
            <div>footer</div>
        </>

    )
}

export default Layout