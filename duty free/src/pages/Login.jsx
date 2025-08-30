import { useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { HiEmojiSad } from "react-icons/hi";
import "../Styles/login.css"
import UserDefaultProfile from "../assets/user-default-profile.jpg"
import { Link } from "react-router-dom";


const Login = () => {
    const [formData,setFormData] = useState({email:"",password:""})
    const [token, setToken] = useState(localStorage.getItem("LoginToken"))
    console.log(token);


    const handleLogin = (e) => {
        e.preventDefault();
        alert(`Login with: ${formData.password}`);
        const updateToken = "1234567890"
        localStorage.setItem("LoginToken", updateToken)
        setToken(updateToken)
    };

    const handleLogout = () => {
        localStorage.removeItem("LoginToken")
        setToken(null)
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
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email:e.target.value})}
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
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password:e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-3 custom-login-checkbox">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">
                                    <span className="icon unchecked text-color-muted">
                                        <HiEmojiSad size={25} />
                                    </span>
                                    <span className="icon checked text-color-muted">
                                        <IoShieldCheckmarkSharp size={25} />
                                    </span>
                                    Keep me signed in
                                </label>
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="border-0 auth-btns button-text-primary button-bg-primary">
                                    Login
                                </button>
                                <Link to="/register" className="text-decoration-none auth-btns button-text-primary button-bg-danger">
                                    Register
                                </Link>
                            </div>
                        </form>

                        <div className="text-center mt-4">
                            <Link to="/password-reset" className="forgot-password text-color-muted">
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