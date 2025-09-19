import { useEffect, useState } from "react";
import common from "../commonMethod/common.js";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    let params = new URLSearchParams(document.location.search);
    const uid = params.get("uid");
    const token = params.get("token");
    const updated = params.get("updated")

    const { apiRequest } = common();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [verify, setVerify] = useState(false);
    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

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
        try {
            setLoading(true)
            const payload = { email };
            const res = await apiRequest("POST", "/auth/forgot-password", payload);
            console.log(res);
            navigate("/reset-password?updated=checkmail")
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    const handleConfirmBlur = () => {
        if (password?.confirmPassword && password?.newPassword !== password?.confirmPassword) {
            setErrorMsg('Passwords must not be same')
        } else {
            setErrorMsg('')
        }
    }


    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (password.newPassword !== password.confirmPassword) {
            setErrorMsg("Passwords must not be same");
            return;
        }

        try {
            setLoading(true)
            const payload = { uid, token, newPassword: password.confirmPassword };
            const res = await apiRequest("POST", "/auth/reset-password", payload);
            console.log(res);
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
                                    className="form-control custom-auth-input"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
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
                                    <input
                                        type="password"
                                        className="form-control custom-auth-input"
                                        id="newPassword"
                                        value={password.newPassword}
                                        onChange={(e) =>
                                            setPassword({ ...password, newPassword: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="form-label fw-bold"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control custom-auth-input"
                                        id="confirmPassword"
                                        value={password.confirmPassword}
                                        onBlur={handleConfirmBlur}
                                        onChange={(e) =>
                                            setPassword({
                                                ...password,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                {errorMsg && <p className="text-danger">{errorMsg}</p>}

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
