import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Message from "../../components/Message";

const DeleteAccount = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({ password: ""})

  const handleResponseClose = () => {
    setShowMessage(false)
  }

  const handleProfileDelete = (e) => {
    e.preventDefault();
    alert(`Account deleted`);
    setResponseStatus(true)
    setShowMessage(true)
    setTimeout(function () {
      setShowMessage(false);
    }, 5000)
    setResponseMessage("Your Account deleted successfully.")
  };
  return (
    <div>
      {showMessage ? <Message handleclose={handleResponseClose} responseStatus={responseStatus} message={responseMessage} /> : ""}
      <h5><span className="px-3"><MdDelete /></span>Delete Account</h5>
      <p>Are you sure you want to delete your account? This will erase all of your account data from the site. To delete your account enter your password below.</p>
      <form onSubmit={handleProfileDelete} className='account-update'>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label fw-bold">
            Password
          </label>
          <input
            type="password"
            className="form-control custom-auth-input"
            id="Password"
            value={formdata.password}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="border-0 auth-btns auth-btn-1">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteAccount