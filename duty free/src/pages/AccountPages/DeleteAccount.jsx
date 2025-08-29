import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Message from "../../components/commonComponents/Message";

const DeleteAccount = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({ password: "" })

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
      <div className="d-flex align-items-center mb-4">
        <span className="me-2 fs-5"><AiFillDelete /></span>
        <h5 className="m-0 navigator-name fw-bold">Delete Account</h5>
      </div>
      <p className="delete-label">Are you sure you want to delete your account? This will erase all of your account data from the site. To delete your account enter your password below.</p>
      <form onSubmit={handleProfileDelete} className='account-delete-form'>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label mb-3 fw-bold">
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
          <button type="submit" className="border-0 p-2 rounded-2 auth-btn-1">
            Delete Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteAccount