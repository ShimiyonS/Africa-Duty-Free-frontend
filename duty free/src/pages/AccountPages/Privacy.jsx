import { FaLock } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { MdOutlineWatch } from "react-icons/md";
import { useEffect, useState } from "react";
import { Tooltip } from "bootstrap";
import Message from "../../components/commonComponents/Message";

const Privacy = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formdata, setFormdata] = useState({})
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
      <div className="d-flex align-items-center mb-4">
        <span className="me-2 fs-5"><FaLock /></span>
        <h5 className="m-0 navigator-name fw-bold">Privacy</h5>
      </div>
      <form onSubmit={handlePrivacyUpdate} className='privacy-form'>
        <div className="mb-3">
          <p htmlFor="currentPassword" className="form-label fw-bold mb-3">
            Hide my profile from directory <span className="ps-1 tooltip-icons" data-bs-toggle="tooltip" data-bs-placement="right" title="Here you can hide yourself from appearing in public directory"><FaCreditCard /></span>
          </p>
          <div className="d-flex justify-content-between py-3 w-75">
            <label className="d-flex align-items-center gap-2">
              <input type="radio" name="option" className="d-none" />
              <span className="privacy-page-icon">
                <MdOutlineWatch className="unchecked" />
                <FaDroplet className="checked" />
              </span>
              Yes
            </label>

            <label className="d-flex align-items-center gap-2">
              <input type="radio" name="option" className="d-none" />
              <span className="privacy-page-icon">
                <MdOutlineWatch className="unchecked" />
                <FaDroplet className="checked" />
              </span>
              No
            </label>
          </div>
        </div>
        <div className="mb-3">
          <p htmlFor="currentPassword" className="form-label fw-bold mb-3">
            Show my last login? <span className="ps-1 tooltip-icons" data-bs-toggle="tooltip" data-bs-placement="right" title="Here you can hide yourself last login field on the profile page and card in member directory"><FaCreditCard /></span>
          </p>
          <div className="d-flex justify-content-between py-3 w-75">
            <label className="d-flex align-items-center gap-2">
              <input type="radio" name="option1" className="d-none" />
              <span className="privacy-page-icon">
                <MdOutlineWatch className="unchecked" />
                <FaDroplet className="checked" />
              </span>
              Yes
            </label>

            <label className="d-flex align-items-center gap-2">
              <input type="radio" name="option1" className="d-none" />
              <span className="privacy-page-icon">
                <MdOutlineWatch className="unchecked" />
                <FaDroplet className="checked" />
              </span>
              No
            </label>
          </div>
        </div>
        <div className="mb-3">
          <p htmlFor="currentPassword" className="form-label fw-bold mb-3">
            Download your data <span className="ps-1 tooltip-icons" data-bs-toggle="tooltip" data-bs-placement="right" title="you can request with the information the we believe is most revelent and useful to you"><FaCreditCard /></span>
          </p>

          <p>Enter your current password to confirm a new export of your personal data.</p>

          <input
            type="password"
            className="form-control custom-auth-input mb-3"
            id="newPassword"
            placeholder="password"
            value={formdata.newpassword}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
          <button className="border-0 p-2 rounded-2 auth-btn-1">Request data</button>

        </div>

        <div className="mb-5">
          <p className="form-label fw-bold mb-3">
            Erase of your data <span className="ps-1 tooltip-icons" data-bs-toggle="tooltip" data-bs-placement="right" title="you can request erasing of the data that we have about you"><FaCreditCard /></span>
          </p>
          <p>Enter your current password to confirm the erasure of your personal data.</p>

          <input
            type="password"
            className="form-control custom-auth-input mb-3"
            id="newPassword"
            placeholder="password"
            value={formdata.newpassword}
            onChange={(e) => setFormdata(e.target.value)}
            required
          />
          <button className="border-0 p-2 rounded-2 auth-btn-1">Request data erase</button>
        </div>


        <div className="d-flex">
          <button type="submit" className="border-0 px-2 py-2 rounded-2 auth-btn-1">
            Update Privacy
          </button>
        </div>
      </form>
    </div>
  )
}

export default Privacy