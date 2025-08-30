import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const MyaccountDetails = () => {
  const [form, setForm] = useState({ password: false, newpassword: false, confirmpassword: false })
  const handleChange = (e, name) => {
    setForm((prev) => ({
      ...prev,
      [name]: !form?.[name]
    }))
  }
  return (
    <div>
      <div className='col-12 '>
        <label className='checkout-form-label required'>First name</label>
        <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
        <label className='checkout-form-label required'>Last name</label>
        <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
        <label className='checkout-form-label required'>Display name</label>
        <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
        <label className='checkout-form-label required'>Email address</label>
        <input type='email' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />

        <h2 className='my-4 fw-bold'>Password Change</h2>
        <label className='checkout-form-label'>Current password (leave blank to leave unchanged)</label>
        <div className='password-see-icon col-12 col-lg-8'>
          <input type={form.password ? "text" : "password"} placeholder='' className='d-block w-100 placeholder-custom custom-input' />
          <button onClick={(e) => handleChange(e, "password")} name='password' type='button' className='see-btn border-0 bg-transparent'>
            {form.password ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <label className='checkout-form-label'>New password (leave blank to leave unchanged)</label>
        <div className='password-see-icon col-12 col-lg-8'>
          <input type={form.newpassword ? "text" : "password"} placeholder='' className='d-block w-100 placeholder-custom custom-input' />
          <button onClick={(e) => handleChange(e, "newpassword")} name='newpassword' type='button' className='see-btn border-0 bg-transparent'>
            {form.newpassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <label className='checkout-form-label'>Confirm new password</label>
        <div className='password-see-icon col-12 col-lg-8'>
          <input type={form.confirmpassword ? "text" : "password"} placeholder='' className='d-block w-100 placeholder-custom custom-input' />
          <button onClick={(e) => handleChange(e, "confirmpassword")} name='confirmpassword' type='button' className='see-btn border-0 bg-transparent'>
            {form.confirmpassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type='submit' className='button-text-primary button-bg-primary border-0 px-4 py-2 rounded-2'>Save changes</button>
      </div>
    </div>
  )
}

export default MyaccountDetails