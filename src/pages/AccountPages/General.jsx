import { useState } from 'react'
import { FaUser } from "react-icons/fa";
import Message from '../../components/commonComponents/Message';


const General = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({ username: "", firstname: "", lastname: "", email: "" })

  const handlechange = (e) => {
    const { name, type, checked, value } = e.target
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))

  }

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
      {showMessage ? <Message handleclose={handleResponseClose} responseStatus={responseStatus} message={responseMessage} /> : ""}
      <div className="d-flex align-items-center mb-4">
        <span className="me-2 fs-5"><FaUser /></span>
        <h5 className="m-0 navigator-name fw-bold">Account</h5>
      </div>
      <form onSubmit={handleProfileUpdate} className='account-update'>
        <div className="mb-3">
          <label htmlFor="email" className="form-label mb-3 fw-bold">
            Username
          </label>
          <input
            type="text"
            className="form-control custom-auth-input"
            id="username"
            name='username'
            value={formdata.username}
            onChange={(e) => { handlechange(e) }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label mb-3 fw-bold">
            First Name
          </label>
          <input
            type="text"
            className="form-control custom-auth-input"
            id="firstname"
            name='firstname'
            value={formdata.firstname}
            onChange={(e) => { handlechange(e) }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label mb-3 fw-bold">
            Last Name
          </label>
          <input
            type="text"
            className="form-control custom-auth-input"
            id="lastname"
            name='lastname'
            value={formdata.lastname}
            onChange={(e) => { handlechange(e) }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label mb-3 fw-bold">
            Email Address
          </label>
          <input
            type="email"
            className="form-control custom-auth-input"
            id="email"
            name='email'
            value={formdata.email}
            onChange={(e) => { handlechange(e) }}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="border-0 auth-btns  button-bg-primary button-text-primary">
            Update Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default General