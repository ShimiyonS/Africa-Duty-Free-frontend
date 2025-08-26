import { FaLock } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import Message from "../../components/Message";
import { useEffect, useState } from "react";
import { Tooltip } from "bootstrap";

const Privacy = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({ currentpassword: "", newpassword: "", confirmpassword: "" })
  useEffect(() => {
    // Enable all tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const handleResponseClose = () => {
    setShowMessage(false)
  }

  const handlePrivacyUpdate = (e) => {
    e.preventDefault();
    alert(`privacy updated`);
    setResponseStatus(true)
    setShowMessage(true)
    setTimeout(function () {
      setShowMessage(false);
    }, 5000)
    setResponseMessage("Your privacy was updated successfully.")
  };
  return (
    <div>
      {showMessage ? <Message handleclose={handleResponseClose} responseStatus={responseStatus} message={responseMessage} /> : ""}
      <div className="d-flex">
        <span className="px-3"><FaLock /></span>
        <h5>Privacy</h5>
        <button data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on right"><FaCreditCard /></button>
      </div>
      <form onSubmit={handlePrivacyUpdate} className='account-update'>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label fw-bold">
            Current Password
          </label>
          <div className="d-flex justify-content-between">
            <div className="radio-section">
              <input className="custom-radio" type="radio" name="remember" />
              <label for="remember" className="input-checkbox-label">No</label>
            </div>
            <div className="radio-section">
              <input className="custom-radio mx-3" type="radio" name="remember" />
              <label for="remember" className="input-checkbox-label">Yes</label>
            </div>
          </div>
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

export default Privacy