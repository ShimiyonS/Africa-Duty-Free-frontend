import { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Message from '../../components/Message';

const General = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({ username: "ganesh", firstname: "ganesh", lastname: "Kumar", email: "ganesh1861997@gmail.com" })

  const handleResponseClose = () => {
    setShowMessage(false)
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert(`updated: ${formdata.email}`);
    setResponseStatus(true)
    setShowMessage(true)
    setTimeout(function () {
      setShowMessage(false);
    }, 5000)
    setResponseMessage("Your account was updated successfully.")
  };
  return (
    <div>
      {showMessage?<Message handleclose={handleResponseClose} responseStatus={responseStatus} message={responseMessage} />:""}
      <h5><span className='px-3'><FaUser /></span>Account</h5>
      <form onSubmit={handleProfileUpdate} className='account-update'>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Username
          </label>
          <input
            type="email"
            className="form-control custom-auth-input"
            id="email"
            value={formdata.username}
            readOnly
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label fw-bold">
            First Name
          </label>
          <input
            type="text"
            className="form-control custom-auth-input"
            id="firstname"
            value={formdata.username}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label fw-bold">
            Last Name
          </label>
          <input
            type="text"
            className="form-control custom-auth-input"
            id="lastname"
            value={formdata.email}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            Email Address
          </label>
          <input
            type="email"
            className="form-control custom-auth-input"
            id="email"
            value={formdata.email}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="border-0 auth-btns auth-btn-1">
            Update Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default General