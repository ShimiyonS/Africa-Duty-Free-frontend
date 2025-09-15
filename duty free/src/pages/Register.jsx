import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import common from '../commonMethod/common';

const Register = () => {
    const navigate = useNavigate();
    const { apiRequest } = common();

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const handleInput = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleConfirmBlur = () => {
        if (form?.confirmpassword && form?.password !== form?.confirmpassword) {
            setErrors((prev) => ({ ...prev, confirmpassword: 'Passwords do not match' }))
        } else {
            setErrors((prev) => ({ ...prev, confirmpassword: '' }))
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        // simple client validation
        if (!form?.username || !form?.firstname || !form?.lastname || !form?.email || !form?.password || !form?.confirmpassword) {
            setErrors((prev) => ({ ...prev, form: 'All fields are required' }))
            return;
        }
        if (form?.password !== form?.confirmpassword) {
            setErrors((prev) => ({ ...prev, confirmpassword: 'Passwords do not match' }))
            return;
        }

        try {
            setSubmitting(true)
            setErrors({})
            const payload = {
                username: form?.username,
                firstName: form?.firstname,
                lastName: form?.lastname,
                email: form?.email,
                password: form?.password
            }
            const res = await apiRequest('POST', '/auth/register', payload)
            if (res?.status && res?.token) {
                localStorage.setItem('token', res.token)
                navigate('/')
                return
            } else {
                setErrors((prev) => ({ ...prev, form: res?.message || 'Registration failed' }))
            }
        } catch (err) {
            const message = err?.response?.data?.message || 'Registration failed'
            setErrors((prev) => ({ ...prev, form: message }))
        } finally {
            setSubmitting(false)
        }
    };
    return (
        <>
            <div className="d-flex justify-content-center align-items-center auth-container">
                <div className="p-4 auth-form">

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label fw-bold">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control custom-auth-input"
                                id="username"
                                name="username"
                                value={form?.username}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label fw-bold">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control custom-auth-input"
                                id="firstname"
                                name='firstname'
                                value={form?.firstname}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label fw-bold">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control custom-auth-input"
                                id="lastname"
                                value={form?.lastname}
                                name={"lastname"}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control custom-auth-input"
                                id="email"
                                name='email'
                                value={form?.email}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control custom-auth-input"
                                id="password"
                                name="password"
                                value={form?.password}
                                onChange={(e) => handleInput(e)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmpassword" className="form-label fw-bold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className={`form-control custom-auth-input ${errors?.confirmpassword ? 'is-invalid' : ''}`}
                                id="confirmpassword"
                                name="confirmpassword"
                                value={form?.confirmpassword}
                                onChange={(e) => handleInput(e)}
                                onBlur={handleConfirmBlur}
                                placeholder='Confirm Password'
                                required
                            />
                            {errors?.confirmpassword ? (
                                <div className="invalid-feedback d-block">{errors.confirmpassword}</div>
                            ) : null}
                        </div>

                        <div className="mt-4 d-flex gap-2 gap-md-4">
                            <button type="submit" disabled={submitting} className="border-0 auth-btns button-text-primary button-bg-primary">
                                Register
                            </button>
                            <Link to="/login" className="text-decoration-none auth-btns button-text-primary button-bg-danger">
                                Login
                            </Link>
                        </div>
                        {errors?.form ? (
                            <div className="mt-3 text-danger small">{errors.form}</div>
                        ) : null}
                    </form>
                </div>
            </div>

        </>
    )
}

export default Register