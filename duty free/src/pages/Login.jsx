import { useState } from "react";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { HiEmojiSad } from "react-icons/hi";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "../Styles/login.css"
import UserDefaultProfile from "../assets/user-default-profile.jpg"
import { Link, useNavigate } from "react-router-dom";
import common from "../commonMethod/common";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/slice/authSlice";
import { setCartItems } from "../store/slice/cartSlice";
import { setWishlist } from "../store/slice/wishlistSlice";
import { setOrders } from "../store/slice/orderSlice";


const Login = () => {
    const navigate = useNavigate();
    const { apiRequest, getUserWishlist, getUserCartlist } = common();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [error, setError] = useState("")
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        password: true,
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
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





    const handleLogin = async (e) => {
        e.preventDefault();
        setError("")
        let newErrors = {};

        if (!formData?.usernameOrEmail?.trim()) {
            newErrors.usernameOrEmail = "Username or email is required";
        }
        if (!formData?.password?.trim()) {
            newErrors.password = "Password is required";
        }
        if (Object.keys(newErrors)?.length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true)
        try {
            const payload = {
                usernameOrEmail: formData.usernameOrEmail,
                password: formData.password
            }
            setErrors({});
            const res = await apiRequest('POST', '/auth/login', payload)
            if (res?.token && res?.user) {
                // store token and user data
                localStorage.setItem('token', res.token)
                localStorage.setItem('user', JSON.stringify(res.user))

                await getUserWishlist(res?.user?.id)
                await getUserCartlist(res?.user?.id)
                // // optionally store extras
                // if (res.orders) localStorage.setItem('orders', JSON.stringify(res.orders))
                // if (res.wishlist) localStorage.setItem('wishlist', JSON.stringify(res.wishlist))
                // if (res.cart) localStorage.setItem('cart', JSON.stringify(res.cart))


                // Redux
                dispatch(setAuth({ token: res.token, user: res.user }))
                // if (Array.isArray(res.cart?.items)) {
                //     dispatch(setCartItems(res.cart.items))
                // } else if (Array.isArray(res.cart)) {
                //     dispatch(setCartItems(res.cart))
                // }
                // if (Array.isArray(res.wishlist)) dispatch(setWishlist(res.wishlist))
                // if (Array.isArray(res.orders)) dispatch(setOrders(res.orders))
                setToken(res.token)
                // checking the role 
                if (res?.user?.role === "admin" || res?.user?.role === "superadmin") {
                    navigate('/siteadmin')
                } else {
                    navigate('/')
                }
            } else {
                setError(res?.message || 'Login failed')
            }
        } catch (err) {
            const message = err?.response?.data?.message || 'Login failed'
            setError(message)
        } finally {
            setLoading(false)
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("orders")
        localStorage.removeItem("wishlist")
        localStorage.removeItem("cart")
        setToken(null)
    }

    return (
        <>

            <div className="d-flex justify-content-center align-items-center auth-container">
                {token === null ?
                    <div className="p-4 auth-form">

                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold required">
                                    Username or E-mail
                                </label>
                                <input
                                    type="text"
                                    className={`form-control custom-auth-input ${errors?.usernameOrEmail ? "is-invalid" : ""}`}
                                    id="text"
                                    name="usernameOrEmail"
                                    value={formData?.usernameOrEmail}
                                    onChange={handleInput}
                                    placeholder="Enter your username or email"
                                />
                                {errors?.usernameOrEmail && <div className="invalid-feedback d-block">{errors.usernameOrEmail}</div>}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold required">
                                    Password
                                </label>
                                <div className='position-relative'>
                                    <input
                                        type={state.password ? "password" : "text"}
                                        className={`form-control custom-auth-input ${errors?.password ? "is-invalid" : ""}`}
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData?.password}
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
                                {errors?.password && <div className="invalid-feedback d-block">{errors.password}</div>}

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
                                <button type="submit" disabled={loading} className="border-0 auth-btns button-text-primary button-bg-primary">
                                    Login
                                </button>
                                <Link to="/register" className="text-decoration-none auth-btns button-text-primary button-bg-danger">
                                    Register
                                </Link>
                            </div>
                            {error ? (
                                <div className="alert alert-danger mt-3">{error}</div>
                            ) : null}
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
                            <p className="text-center mb-1 fw-bold">Logged in</p>
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