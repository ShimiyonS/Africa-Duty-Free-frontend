import "../../css/discount.css"
import { LuSend } from "react-icons/lu";

const DiscountComponent = () => {
    return (
        <div className=" container">
            <div className="discount-main-component overflow-hidden ">
                <div className="d-flex align-items-center">
                    <div className="col-lg-6">
                    </div>
                    <div className="col-lg-6 d-flex py-lg-5 py-md-5 justify-content-center flex-column never-miss-out">
                        <div className="py-lg-5 py-md-3 p-3">
                            <div>
                                <h3 className="main-content justuspro-medium text-color-danger">Never miss a Duty-free discount!</h3>
                            </div>
                            <div className="content-div"><p>Be the first to know about special discounts, offers, and product launches from our airport shops. Sign up now!</p></div>
                            <div>
                                <form className="form-input ">
                                    <input type="text" placeholder="Enter Your Email" className="input-box button-bg-primary text-color-primary" />
                                    <button type="submit" className="button-bg-primary p-2 rounded subscribe_mail position-relative">
                                        <LuSend className="text-white text-xl position-absolute send-emoji " />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DiscountComponent