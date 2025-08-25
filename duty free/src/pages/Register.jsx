import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        alert(`Register with: ${email}, ${password}, Remember: ${remember}`);
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
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
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
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

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold">
                               Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control custom-auth-input"
                                id="password"
                                placeholder='Confirm Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4 d-flex gap-2 gap-md-4">
                            <button type="submit" className="border-0 auth-btns auth-btn-1">
                                Register
                            </button>
                            <Link to="/login" className="auth-btns auth-btn-2">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
             
        </>
    )
}

export default Register