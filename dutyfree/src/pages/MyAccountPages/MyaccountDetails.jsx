import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import common from "../../commonMethod/common.js"

const MyaccountDetails = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { apiRequest, restrictNumbers, verifyEmail, passwordConditions } = common();

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    email: user?.email
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleformdata = (e) => {
    const { name, value } = e.target
    let newValue = value;

    if (name === "firstName" || name === "lastName") newValue = restrictNumbers(value);

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  }

  const [pass, setPass] = useState({ password: false, newPassword: false, confirmPassword: false })

  const handleEye = (name) => {
    setPass((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData?.username?.trim()) newErrors.username = "Username is required";
    if (!formData?.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData?.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else {
      if (!verifyEmail(formData?.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // ✅ password validation
    // if (!passwordConditions(formData?.currentPassword)) {
    //   newErrors.currentPassword =
    //     "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    // }

    if (formData?.newPassword?.trim() && !formData?.confirmPassword?.trim()) {
      newErrors.confirmpassword = "Confirm password is required";
      newErrors.newPassword = "New Password is required";
    } else if (!passwordConditions(formData?.newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }
    else if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.newPassword = "Passwords do not match";
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});
      const payload = {
        username: formData?.username,
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        // password: formData?.password
      };
      // const res = await apiRequest('POST', '/auth', payload);

    } catch (err) {
      const message = err?.response?.data?.message || 'updated failed';
      setErrors((prev) => ({ ...prev, formData: message }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <div className='col-12 '>
          <label className='checkout-form-label required'>First name</label>
          <input type='text' placeholder='' value={formData.firstName} onChange={handleformdata} name='firstName' className={`d-block col-12 col-lg-8 placeholder-custom custom-input form-control ${errors?.firstName ? "is-invalid" : ""}`} />
          {errors?.firstName && <div className="invalid-feedback d-block mb-2">{errors.firstName}</div>}
          <label className='checkout-form-label required'>Last name</label>
          <input type='text' placeholder='' value={formData.lastName} onChange={handleformdata} name='lastName' className={`d-block col-12 col-lg-8 placeholder-custom custom-input form-control ${errors?.lastName ? "is-invalid" : ""}`} />
          {errors?.lastName && <div className="invalid-feedback d-block mb-2">{errors.lastName}</div>}
          <label className='checkout-form-label required'>Display name</label>
          <input type='text' placeholder='' value={formData.username} onChange={handleformdata} name='username' className={`d-block col-12 col-lg-8 placeholder-custom custom-input form-control ${errors?.username ? "is-invalid" : ""}`} />
          {errors?.username && <div className="invalid-feedback d-block mb-2">{errors.username}</div>}
          <label className='checkout-form-label required'>Email address</label>
          <input type='email' placeholder='' value={formData.email} onChange={handleformdata} name='email' className={`d-block col-12 col-lg-8 placeholder-custom custom-input form-control ${errors?.email ? "is-invalid" : ""}`} />
          {errors?.email && <div className="invalid-feedback d-block mb-2">{errors.email}</div>}

          <h2 className='my-4 fw-bold'>Password Change</h2>
          <label className='checkout-form-label'>Current password (leave blank to leave unchanged)</label>
          <div className='password-see-icon col-12 col-lg-8'>
            <div className='position-relative'>
              <input type={pass.password ? "text" : "password"} placeholder='' name="currentPassword" value={formData.currentPassword} onChange={handleformdata} className={`d-block w-100 placeholder-custom custom-input form-control ${errors?.currentPassword ? "is-invalid" : ""}`} />
              <span
                className="position-absolute  translate-middle-y password-icon pe-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleEye("password")}
              >
                {pass.password ? <FaEyeSlash /> : <FaEye />}
              </span>

            </div>
            {errors?.currentPassword && <div className="invalid-feedback d-block mb-2">{errors.currentPassword}</div>}
          </div>
          <label className='checkout-form-label'>New password (leave blank to leave unchanged)</label>
          <div className='password-see-icon col-12 col-lg-8'>
            <div className='position-relative'>
              <input type={pass.newPassword ? "text" : "password"} placeholder='' name="newPassword" value={formData.newPassword} onChange={handleformdata} className={`d-block w-100 placeholder-custom custom-input form-control ${errors?.newPassword ? "is-invalid" : ""}`} />
              <span
                className="position-absolute  translate-middle-y password-icon pe-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleEye("newPassword")}
              >
                {pass.newPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors?.newPassword && <div className="invalid-feedback d-block mb-2">{errors.newPassword}</div>}
          </div>
          <label className='checkout-form-label'>Confirm new password</label>
          <div className='password-see-icon col-12 col-lg-8'>
            <div className='position-relative'>
              <input type={pass.confirmPassword ? "text" : "password"} placeholder='' name="confirmPassword" value={formData.confirmPassword} onChange={handleformdata} className={`d-block w-100 placeholder-custom custom-input form-control ${errors?.confirmPassword ? "is-invalid" : ""}`} />
              <span
                className="position-absolute  translate-middle-y password-icon pe-3"
                style={{ cursor: "pointer" }}
                onClick={() => handleEye("confirmPassword")}
              >
                {pass.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors?.confirmPassword && <div className="invalid-feedback d-block mb-2">{errors.confirmPassword}</div>}
          </div>

          <button type='submit' className='button-text-primary button-bg-primary border-0 px-4 py-2 rounded-2'> {submitting ? "Changing ..." : "Save changes"}</button>
        </div>
      </form>
    </div>
  )
}

export default MyaccountDetails