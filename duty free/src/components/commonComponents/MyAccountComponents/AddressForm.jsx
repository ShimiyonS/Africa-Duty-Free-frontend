import React, { useState } from 'react'

const AddressForm = () => {
    const [form, setForm] = useState({})
    const handleChange = () => {

    }
    return (
        <div>
            <div className='col-12 '>
                <label className='checkout-form-label required'>Email address</label>
                <input type='email' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <label className='checkout-form-label required'>First name</label>
                <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <label className='checkout-form-label required'>Last name</label>
                <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <label className='checkout-form-label '>Company name (optional)</label>
                <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <label className='checkout-form-label required '>Country / Region</label>
                <select value={form} onChange={handleChange} className='d-block col-12 col-lg-8 placeholder-custom custom-input'>
                    <option value="">-- Select Region --</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                </select>
                <label className='checkout-form-label required'>Street address</label>
                <input type='text' placeholder='House number and street name' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <input type='text' placeholder='Apartment, suite, unit, etc. (optional)' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <label className='checkout-form-label required '>Town / City</label>
                <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <label className='checkout-form-label required'>State</label>
                <select value={form} onChange={handleChange} className='d-block col-12 col-lg-8 placeholder-custom custom-input'>
                    <option value="">-- Select State --</option>
                    <option value="north">Tamil Nadu</option>
                    <option value="south">Karanataka</option>
                    <option value="east">Andhra Pradesh</option>
                    <option value="west">Delhi</option>
                </select>
                <label className='checkout-form-label required '>Postcode</label>
                <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <label className='checkout-form-label required '>Phone</label>
                <input type='text' placeholder='' className='d-block col-12 col-lg-8 placeholder-custom custom-input' />
                <button className='auth-btn-1 border-0 px-4 py-2 rounded-2'>Save address</button>
            </div>
        </div>
    )
}

export default AddressForm