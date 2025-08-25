import { useState } from 'react'

const ForgotPassword = () => {
    const [passwordchangerequest, setPasswordchangerequest] = useState(false)
    const [email, setEmail] = useState("")
    const handleForgotPassword = (e) => {
        e.preventDefault();
        alert(`forgotpassword: ${email}`);
        setPasswordchangerequest(true)
    };
    return (
        <>
            <div className="d-flex justify-content-center align-items-center auth-container">
                <div className="p-4 auth-form">
                    <p className='text-center mb-3 forgot-password-message'>{!passwordchangerequest ? "To reset your password, please enter your email address or username below." : "If an account matching the provided details exists, we will send a password reset link. Please check your inbox."}</p>
                    {!passwordchangerequest && (
                        <form onSubmit={handleForgotPassword}>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    className="form-control custom-auth-input"
                                    placeholder='Enter your username or email'
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-flex justify-content-center mt-4">
                                <button type="submit" className="border-0 auth-btns auth-btn-1">
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div>
                 
            </div>

        </>
    )
}

export default ForgotPassword