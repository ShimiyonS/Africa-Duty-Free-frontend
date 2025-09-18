import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const MyaccountDetails = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    email: user?.email,
    password: '',
    newpassword: '',
    confirmpassword: ''
  });

  const handleformdata = (e) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData, 
      [name]: value
    }));
  }

  const [form, setForm] = useState({ password: false, newpassword: false, confirmpassword: false })
  const handleChange = (e, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: !form?.[name]
    }))
  }
  return (
    <div>
      <form>
        <div className='col-12 '>
          <label className='checkout-form-label required'>First name</label>
          <input type='text' placeholder='' value={formData.firstName} onChange={handleformdata} name='firstName' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
          <label className='checkout-form-label required'>Last name</label>
          <input type='text' placeholder='' value={formData.lastName} onChange={handleformdata} name='lastName' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
          <label className='checkout-form-label required'>Display name</label>
          <input type='text' placeholder='' value={formData.username} onChange={handleformdata} name='username' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
          <label className='checkout-form-label required'>Email address</label>
          <input type='email' placeholder='' value={formData.email} onChange={handleformdata} name='email' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />

          <h2 className='my-4 fw-bold'>Password Change</h2>
          <label className='checkout-form-label'>Current password (leave blank to leave unchanged)</label>
          <div className='password-see-icon col-12 col-lg-8'>
            <input type={form.password ? "text" : "password"} placeholder='' value={formData.password} className='d-block w-100 placeholder-custom custom-input' />
            <button onClick={(e) => handleChange(e, "password")} onChange={handleformdata} name='password' type='button' className='see-btn border-0 bg-transparent'>
              {form.password ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <label className='checkout-form-label'>New password (leave blank to leave unchanged)</label>
          <div className='password-see-icon col-12 col-lg-8'>
            <input type={form.newpassword ? "text" : "password"} placeholder='' value={formData.newpassword} className='d-block w-100 placeholder-custom custom-input' />
            <button onClick={(e) => handleChange(e, "newpassword")} onChange={handleformdata} name='newpassword' type='button' className='see-btn border-0 bg-transparent'>
              {form.newpassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <label className='checkout-form-label'>Confirm new password</label>
          <div className='password-see-icon col-12 col-lg-8'>
            <input type={form.confirmpassword ? "text" : "password"} placeholder='' value={formData.confirmpassword} className='d-block w-100 placeholder-custom custom-input' />
            <button onClick={(e) => handleChange(e, "confirmpassword")} onChange={handleformdata} name='confirmpassword' type='button' className='see-btn border-0 bg-transparent'>
              {form.confirmpassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type='submit' className='button-text-primary button-bg-primary border-0 px-4 py-2 rounded-2'>Save changes</button>
        </div>
      </form>
    </div>
  )
}

export default MyaccountDetails