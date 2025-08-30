import { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({})
    const handleInput = (e) => {
        const { name, type, value, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRegister = (e) => {
        e.preventDefault();
        alert(`Register with: ${form?.email}, ${form?.password}, Remember: ${form?.remember}`);
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
                            <label htmlFor="password" className="form-label fw-bold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control custom-auth-input"
                                id="password"
                                name="confirmpassword"
                                value={form?.confirmpassword}
                                onChange={(e) => handleInput(e)}
                                placeholder='Confirm Password'
                                required
                            />
                        </div>

                        <div className="mt-4 d-flex gap-2 gap-md-4">
                            <button type="submit" className="border-0 auth-btns button-text-primary button-bg-primary">
                                Register
                            </button>
                            <Link to="/login" className="text-decoration-none auth-btns button-text-primary button-bg-danger">
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