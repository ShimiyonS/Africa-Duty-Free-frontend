import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div>header</div>
            <Outlet />
            <div>footer</div>
        </>

    )
}

export default Layout