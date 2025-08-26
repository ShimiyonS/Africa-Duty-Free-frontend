import { FaAsterisk } from "react-icons/fa"
import Message from "../../components/Message"
import { useState } from "react"

const ChangePassword = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({ currentpassword: "", newpassword: "", confirmpassword: ""})

  const handleResponseClose = () => {
    setShowMessage(false)
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    alert(`password updated`);
    setResponseStatus(true)
    setShowMessage(true)
    setTimeout(function () {
      setShowMessage(false);
    }, 5000)
    setResponseMessage("Your password was updated successfully.")
  };
  return (
    <div>
      {showMessage ? <Message handleclose={handleResponseClose} responseStatus={responseStatus} message={responseMessage} /> : ""}
      <h5><span className="px-3"><FaAsterisk /></span>Change Password</h5>
      <form onSubmit={handleChangePassword} className='account-update'>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label fw-bold">
            Current Password
          </label>
          <input
            type="password"
            className="form-control custom-auth-input"
            id="currentPassword"
            value={formdata.currentpassword}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label fw-bold">
            New Password
          </label>
          <input
            type="password"
            className="form-control custom-auth-input"
            id="newPassword"
            value={formdata.newpassword}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label fw-bold">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control custom-auth-input"
            id="confirmPassword"
            value={formdata.email}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
        </div>
      
        <div className="d-flex gap-2">
          <button type="submit" className="border-0 auth-btns auth-btn-1">
            Update Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword