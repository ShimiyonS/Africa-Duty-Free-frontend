import { Outlet } from 'react-router-dom'
import SaleBanner from '../components/commonComponents/header/SaleBanner.jsx'
import Header from '../components/commonComponents/header/Header.jsx'
import NavBar from '../components/commonComponents/header/navbar.jsx'
import Footer from '../components/commonComponents/footer/Footer.jsx'
import { useState } from 'react'

const Layout = () => {
    const [togglesidebar, setTooglesidebar] = useState(false)
    function togglemenu(payload) {
        setTooglesidebar(!payload)
    }
    return (
        <>
            <SaleBanner content={"Shop - 30 % less vs high street prices - that is Real Value Duty Free Retail."} />
            <Header togglemenu={togglemenu} togglesidebar={togglesidebar} />
            <NavBar condition={togglesidebar} togglemenu={togglemenu}/>
            <Outlet />
            <Footer/>
        </>

    )
}

export default Layout