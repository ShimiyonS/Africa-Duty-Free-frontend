import { FaAsterisk } from "react-icons/fa"
import Message from "../../components/commonComponents/Message"
import { useState } from "react"

const ChangePassword = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({ currentpassword: "", newpassword: "", confirmpassword: "" })

  const handleformchange = (e) => {
    const { name, type, checked, value } = e.target
    setFormdata((prev) => ({
      ...prev,
      [name]: value
    }))
  }

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
      <div className="d-flex align-items-center mb-4">
        <span className="me-2 fs-5"><FaAsterisk /></span>
        <h5 className="m-0 fw-bold navigator-name">Change Password</h5>
      </div>
      <form onSubmit={handleChangePassword} className='account-update'>
        <div className="mb-3">
          <label htmlFor="currentpassword" className="form-label mb-3 fw-bold">
            Current Password
          </label>
          <input
            type="password"
            className="form-control custom-auth-input"
            id="currentpassword"
            name="currentpassword"
            value={formdata.currentpassword}
            onChange={(e) => handleformchange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newpassword" className="form-label mb-3 fw-bold">
            New Password
          </label>
          <input
            type="password"
            className="form-control custom-auth-input"
            id="newpassword"
            name="newpassword"
            value={formdata.newpassword}
            onChange={(e) => handleformchange(e)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label mb-3 fw-bold">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control custom-auth-input"
            id="confirmpassword"
            name="confirmpassword"
            value={formdata.confirmpassword}
            onChange={(e) => handleformchange(e)}
            required
          />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="border-0 auth-btns  button-bg-primary button-text-primary">
            Update Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword