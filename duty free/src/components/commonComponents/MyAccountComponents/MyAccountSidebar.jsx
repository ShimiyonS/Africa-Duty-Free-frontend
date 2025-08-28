import "./MyaccountSidebar.css"
import { NavLink } from 'react-router-dom'

const MyAccountSidebar = () => {
  return (
    <div className="col-12 col-md-6 col-lg-3">
        <div className="side-bar-links d-flex flex-column">
         <div className="d-flex">
          <p className='account-icons'></p>
          <NavLink>DASHBOARDS</NavLink>
         </div>
        </div>
    </div>
  )
}

export default MyAccountSidebar