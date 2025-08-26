import { useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { HiEmojiSad } from "react-icons/hi";
import "../Styles/login.css"
import UserDefaultProfile from "../assets/user-default-profile.jpg"
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = localStorage.getItem("LoginToken")
    console.log(token);


    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Login with: ${email}, ${password}`);
        localStorage.setItem("LoginToken", "1234567890")
    };

    const handleLogout = () => {
        localStorage.removeItem("LoginToken")
    }

    return (
        <>

            <div className="d-flex justify-content-center align-items-center auth-container">
                {token === null ?
                    <div className="p-4 auth-form">

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">
                                    Username or E-mail
                                </label>
                                <input
                                    type="email"
                                    className="form-control custom-auth-input"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 custom-login-checkbox">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember" className="input-checkbox-label">
                                    <span className="icon unchecked">
                                        <HiEmojiSad size={25} />
                                    </span>
                                    <span className="icon checked">
                                        <IoShieldCheckmarkSharp size={25} />
                                    </span>
                                    Keep me signed in
                                </label>
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="border-0 auth-btns auth-btn-1">
                                    Login
                                </button>
                                <Link to="/register" className="auth-btns auth-btn-2">
                                    Register
                                </Link>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <Link to="/password-reset" className="forgot-password">
                                Forgot your password?
                            </Link>
                        </div>
                    </div> :
                    <div className="user-control">
                        <div className="img-section p-2">
                            <img src={UserDefaultProfile} width={80} height={80} className="rounded-circle user-default-img"></img>
                            <p className="text-center mb-1 fw-bold">Ganesh Kumar</p>
                        </div>
                        <div className="controls-section p-2">
                            <ul className="p-2 m-0">
                                <li><Link to="/account" className="link-custom text-decoration-none">your account</Link></li>
                                <li><button onClick={handleLogout} className="link-custom text-decoration-none d-inline btn p-0">logout</button></li>
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Login