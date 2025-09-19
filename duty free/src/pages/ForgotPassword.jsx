import { useEffect, useState } from "react";
import common from "../commonMethod/common";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const navigate = useNavigate();
    let params = new URLSearchParams(document.location.search);
    const uid = params.get("uid");
    const token = params.get("token");
    const updated = params.get("updated")

    const { apiRequest, verifyEmail, passwordConditions } = common();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({})
    const [state, setState] = useState({
        password: true,
        confirmpassword: true
    });
    const [errors, setErrors] = useState({});
    const [verify, setVerify] = useState(false);

    const handleEye = (name) => {
        setState((prev) => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleInput = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleVerify = async (userid, token) => {
        if (!userid || !token) return;
        try {
            const payload = { uid: userid, token: token };
            const res = await apiRequest("POST", "/auth/verify-reset", payload);
            console.log(res);
            setVerify(res?.status === true);
        } catch (err) {
            console.error(err);
            setVerify(false);
        }
    };

    useEffect(() => {
        handleVerify(uid, token);
    }, [uid, token]);


    const handleForgotPassword = async (e) => {

        e.preventDefault();

        let newErrors = {};

        if (!form?.email?.trim()) newErrors.email = "Email is required";

        if (!verifyEmail(form.email)) newErrors.email = "Please enter a valid email address";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true)
            const payload = { email: form?.email, redirectUrl: window.location.origin };
            const res = await apiRequest("POST", "/auth/forgot-password", payload);
            console.log(res);
            navigate("/reset-password?updated=checkmail")
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    };


    const handlePasswordChange = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!form?.newPassword?.trim()) {
            newErrors.newPassword = "New Password is required";
        } else if (!passwordConditions(form?.newPassword)) {
            newErrors.newPassword =
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.";
        }
        if (!form?.confirmPassword?.trim()) newErrors.confirmPassword = "Confirm Password is required";

        if (form?.newPassword !== form?.confirmPassword) {
            newErrors.newPassword = "Both new password and confirm password must be same"
            newErrors.confirmPassword = "Both new password and confirm password must be same"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true)
            const payload = { uid, token, newPassword: form?.confirmPassword };
            const res = await apiRequest("POST", "/auth/reset-password", payload);
            console.log(res);
            if(res.status) toast.success(res.message)
            navigate('/login')
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center auth-container">
            <div className="p-4 auth-form">

                {!uid && !token && !updated && (
                    <>
                        <p className="text-center mb-3 forgot-password-message">
                            To reset your password, please enter your email address or
                            username below.
                        </p>
                        <form onSubmit={handleForgotPassword}>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className={`form-control custom-auth-input ${errors?.email ? "is-invalid" : ""}`}
                                    placeholder="Enter your email"
                                    name="email"
                                    value={form?.email || ""}
                                    onChange={handleInput}
                                />
                                {errors?.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                            </div>

                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    type="submit"
                                    className="border-0 auth-btns button-bg-primary button-text-primary"
                                >
                                    {loading === false ? "Reset Password" : "Loading..."}
                                </button>
                            </div>
                        </form>
                    </>
                )}


                {!uid && !token && updated && (
                    <p className="text-center mb-3 forgot-password-message">
                        If an account matching the provided details exists, we will send a
                        password reset link. Please check your inbox.
                    </p>
                )}


                {uid && token && (
                    <>
                        {verify ? (
                            <form onSubmit={handlePasswordChange}>
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label fw-bold">
                                        New Password
                                    </label>
                                    <div className='position-relative'>
                                        <input
                                            type={state.password ? "password" : "text"}
                                            className={`form-control custom-auth-input ${errors?.newPassword ? "is-invalid" : ""}`}
                                            id="newPassword"
                                            name="newPassword"
                                            value={form?.newPassword || ""}
                                            onChange={handleInput}
                                        />
                                        <span
                                            className="position-absolute  translate-middle-y password-icon pe-3"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleEye("password")}
                                        >
                                            {state.password ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                                        </span>
                                    </div>
                                    {errors?.newPassword && <div className="invalid-feedback d-block">{errors.newPassword}</div>}
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label fw-bold"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className='position-relative'>
                                        <input
                                            type={state.confirmpassword ? "password" : "text"}
                                            className={`form-control custom-auth-input ${errors?.confirmPassword ? "is-invalid" : ""}`}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={form?.confirmPassword || ""}
                                            onChange={handleInput}
                                        />
                                        <span
                                            className="position-absolute translate-middle-y pe-3 password-icon"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleEye("confirmpassword")}
                                        >
                                            {state.confirmpassword ? <EyeInvisibleOutlined /> : <EyeTwoTone />}
                                        </span>
                                    </div>
                                    {errors?.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                                </div>

                                {errors?.form && <div className="alert alert-danger mt-3">{errors.form}</div>}

                                <div className="d-flex justify-content-center mt-4">
                                    <button
                                        type="submit"
                                        id="confirmbtn"
                                        className="border-0 auth-btns button-bg-primary button-text-primary"
                                    >
                                        {loading === false ? "Change Password" : "Loading..."}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-center text-danger">Invalid or expired link</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
