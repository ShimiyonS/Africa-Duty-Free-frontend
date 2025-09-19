import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import common from '../commonMethod/common';

const Register = () => {
    const navigate = useNavigate();
    const { apiRequest, restrictNumbers, verifyEmail, passwordConditions } = common();

    const [form, setForm] = useState({});
    const [state, setState] = useState({
        password: true,
        confirmpassword: true
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === "firstname" || name === "lastname") newValue = restrictNumbers(value);

        setForm((prev) => ({
            ...prev,
            [name]: newValue
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleEye = (name) => {
        setState((prev) => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleConfirmBlur = () => {
        if (form?.confirmpassword && form?.password !== form?.confirmpassword) {
            setErrors((prev) => ({ ...prev, confirmpassword: 'Passwords do not match' }));
        } else {
            setErrors((prev) => ({ ...prev, confirmpassword: '' }));
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!form?.username?.trim()) newErrors.username = "Username is required";
        if (!form?.firstname?.trim()) newErrors.firstname = "First name is required";
        if (!form?.lastname?.trim()) newErrors.lastname = "Last name is required";
        if (!form?.email?.trim()) {
            newErrors.email = "Email is required";
        } else {
            if (!verifyEmail(form.email)) {
                newErrors.email = "Please enter a valid email address";
            }
        }

        // ✅ password validation
        if (!form?.password?.trim()) {
            newErrors.password = "Password is required";
        } else if (!passwordConditions(form?.password)) {
            newErrors.password =
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
        }

        if (form?.password?.trim() && !form?.confirmpassword?.trim()) {
            newErrors.confirmpassword = "Confirm password is required";
        } else if (form?.password !== form?.confirmpassword) {
            newErrors.confirmpassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setSubmitting(true);
            setErrors({});
            const payload = {
                username: form?.username,
                firstName: form?.firstname,
                lastName: form?.lastname,
                email: form?.email,
                password: form?.password
            };
            const res = await apiRequest('POST', '/auth/register', payload);
            if (res?.status && res?.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('user', JSON.stringify(res.user));
                navigate('/');
                return;
            } else {
                setErrors((prev) => ({ ...prev, form: res?.message || 'Registration failed' }));
            }
        } catch (err) {
            const message = err?.response?.data?.message || 'Registration failed';
            setErrors((prev) => ({ ...prev, form: message }));
        } finally {
            setSubmitting(false);
        }
    };

    // ✅ check if password is valid before enabling confirm password
    const isPasswordValid = passwordConditions(form?.password || "");

    return (
        <div className="d-flex justify-content-center align-items-center auth-container">
            <div className="p-4 auth-form">
                <form onSubmit={handleRegister}>

                    {/* Username */}
                    <div className="mb-3">
                        <label className="form-label fw-bold required">Username</label>
                        <input
                            type="text"
                            className={`form-control custom-auth-input ${errors?.username ? "is-invalid" : ""}`}
                            name="username"
                            value={form?.username || ""}
                            onChange={handleInput}
                            placeholder="Enter your username"
                        />
                        {errors?.username && <div className="invalid-feedback d-block">{errors.username}</div>}
                    </div>

                    {/* First Name */}
                    <div className="mb-3">
                        <label className="form-label fw-bold required">First Name</label>
                        <input
                            type="text"
                            className={`form-control custom-auth-input ${errors?.firstname ? "is-invalid" : ""}`}
                            name="firstname"
                            value={form?.firstname || ""}
                            onChange={handleInput}
                            placeholder="Enter your firstname"
                        />
                        {errors?.firstname && <div className="invalid-feedback d-block">{errors.firstname}</div>}
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label className="form-label fw-bold required">Last Name</label>
                        <input
                            type="text"
                            className={`form-control custom-auth-input ${errors?.lastname ? "is-invalid" : ""}`}
                            name="lastname"
                            value={form?.lastname || ""}
                            onChange={handleInput}
                            placeholder="Enter your lastname"
                        />
                        {errors?.lastname && <div className="invalid-feedback d-block">{errors.lastname}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label fw-bold required">Email address</label>
                        <input
                            type="email"
                            className={`form-control custom-auth-input ${errors?.email ? "is-invalid" : ""}`}
                            name="email"
                            value={form?.email || ""}
                            onChange={handleInput}
                            placeholder="Enter your email"
                        />
                        {errors?.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3 position-relative">
                        <label className="form-label fw-bold required">Password</label>
                        <div className='position-relative'>
                            <input
                                type={state.password ? "password" : "text"}
                                className={`form-control custom-auth-input ${errors?.password ? "is-invalid" : ""}`}
                                name="password"
                                value={form?.password || ""}
                                onChange={handleInput}
                                placeholder="Enter your password"
                            />
                            <span
                                className="position-absolute  translate-middle-y password-icon pe-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleEye("password")}
                            >
                                {state.password ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                            </span>
                        </div>
                        {errors?.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3 position-relative">
                        <label className="form-label fw-bold required">Confirm Password</label>
                        <div className='position-relative'>
                            <input
                                type={state.confirmpassword ? "password" : "text"}
                                className={`form-control custom-auth-input ${errors?.confirmpassword ? "is-invalid" : ""}`}
                                name="confirmpassword"
                                value={form?.confirmpassword || ""}
                                onChange={handleInput}
                                onBlur={handleConfirmBlur}
                                placeholder="Confirm password"
                                disabled={!isPasswordValid}   // ✅ disable until password valid
                            />
                            <span
                                className="position-absolute translate-middle-y pe-3 password-icon"
                                style={{ cursor: isPasswordValid ? "pointer" : "not-allowed", opacity: isPasswordValid ? 1 : 0.5 }}
                                onClick={() => isPasswordValid && handleEye("confirmpassword")}
                            >
                                {state.confirmpassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                            </span>
                        </div>

                        {errors?.confirmpassword && <div className="invalid-feedback d-block">{errors.confirmpassword}</div>}
                    </div>

                    {errors?.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

                    <div className="mt-4 d-flex gap-2 gap-md-4">
                        <button type="submit" disabled={submitting} className="border-0 auth-btns button-text-primary button-bg-primary">
                            {submitting ? "Registering..." : "Register"}
                        </button>
                        <Link to="/login" className="text-decoration-none auth-btns button-text-primary button-bg-danger">
                            Login
                        </Link>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Register;
