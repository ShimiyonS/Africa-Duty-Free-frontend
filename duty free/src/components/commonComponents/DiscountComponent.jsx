import "../../css/discount.css"

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
                                <h3 className="main-content">Never miss a Duty-free discount!</h3>
                            </div>
                            <div className="content-div"><p>Be the first to know about special discounts, offers, and product launches from our airport shops. Sign up now!</p></div>
                            <div>
                                <form className="form-input ">
                                    <input type="text" placeholder="Enter Your Email" className="input-box" />
                                    <input class="subscribe_mail" type="submit" value="" />
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