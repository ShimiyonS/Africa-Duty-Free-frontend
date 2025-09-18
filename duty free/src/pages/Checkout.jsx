import React, { useEffect, useState } from "react";
import "../Styles/checkout.css";
import common from "../commonMethod/common";
import { Link } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { FaCreditCard } from "react-icons/fa6";
import { FaMobileAlt, FaUniversity } from "react-icons/fa";
const Checkout = () => {
  const [couponStatus, setCouponStatus] = useState(false);
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    region: "",
    postcode: "",
    phone: "",
    shipDifferent: false,
    sFirstName: "",
    sLastName: "",
    sCompany: "",
    sCountry: "",
    sStreet1: "",
    sStreet2: "",
    sCity: "",
    sRegion: "",
    sPostcode: "",
    orderNotes: "",
  });
  const [btnClick, setBtnClick] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const { apiRequest, cartItems } = common();

  useEffect(() => {
    setCart(Array.isArray(cartItems) ? cartItems : []);
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const computeTotal = () => {
    const total = (cart || []).reduce(
      (acc, item) => acc + (item?.quantity || 0) * (item?.product?.price || 0),
      0
    );
    return Number(total.toFixed(2)); // rounds to 2 decimals
  };

  const buildAddressPayload = () => {
    const billing = {
      firstName: form.firstName,
      lastName: form.lastName,
      company: form.company,
      country: form.country,
      region: form.region,
      city: form.city,
      street1: form.street1,
      street2: form.street2,
      postalCode: form.postcode,
      phone: form.phone,
      isDefault: true,
    };

    let shipping = undefined;
    if (form.shipDifferent || btnClick) {
      shipping = {
        firstName: form.sFirstName,
        lastName: form.sLastName,
        company: form.sCompany,
        country: form.sCountry,
        region: form.sRegion,
        city: form.sCity,
        street1: form.sStreet1,
        street2: form.sStreet2,
        postalCode: form.sPostcode,
        phone: form.phone,
        isDefault: false,
      };
    }

    return { billing, shipping };
  };

  const submitAddresses = async () => {
    try {
      const payload = buildAddressPayload();
      const res = await apiRequest("POST", "/address", payload);
      console.log("Addresses saved:", res);
      return res;
    } catch (err) {
      console.error("Failed to save addresses", err);
      throw err;
    }
  };



  const [paymentMethod, setPaymentMethod] = useState("");

  const onPay = async (method) => {
    try {
      // 1. First create the order
      const orderResponse = await apiRequest("POST", "/orders", {
        items: cart.map(item => ({
          product_id: item?.product?.id,
          quantity: item?.quantity,
          price: item?.product?.price
        })),
        total: computeTotal(),
        userId: 1, // TODO: change to user id 
      });

      const orderId = orderResponse.orderId;

      // 2. Then initialize payment with order ID
      const paymentResponse = await apiRequest("POST", "/payment/initialize", {
        amount: computeTotal(),
        email: form.email || "test@test.com",
        name: `${form.firstName} ${form.lastName}`.trim() || "Test User",
        paymentMethod: method,
        orderId: orderId,
        redirectUrl: window.location.origin + "/payment/callback",
        userId: 1,
      });

      // 3. Redirect to payment page
      if (paymentResponse.link) {
        window.location.href = paymentResponse.link;
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Payment initialization failed. Please try again.");
    }
  };
  const handlePay = () => {
    if (!paymentMethod) return;
    // Trigger parent callback or payment initiation
    onPay(paymentMethod);


  };
  return (
    <div className="container mt-5">
      {/* <div className="d-flex align-items-center flex-wrap gap-2">
        <p className="m-0">Have a coupon?</p>
        <button
          type="button"
          onClick={() => {
            setCouponStatus(!couponStatus);
          }}
          className="link-custom m-0 p-0 bg-transparent border-0"
        >
          Click here to enter your code
        </button>
      </div> */}
      {couponStatus ? (
        <>
          <input
            type="text"
            placeholder="coupon code"
            className="placeholder-custom custom-input mt-5 col-12 col-lg-4"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            onClick={() => {
              // Placeholder apply coupon logic
              if (!couponCode?.trim()) return;
              console.log("Applying coupon:", couponCode);
            }}
            className="apply-btn"
          >
            Apply coupon
          </button>
        </>
      ) : (
        ""
      )}
      <div className="d-flex flex-wrap py-5 ">
        <div className="col-12 col-lg-6 p-lg-3">
          <h1 className="justuspro-bold mb-4 cart-heading">Billing details</h1>
          <label className="checkout-form-label required dmsans-bold">
            Email address
          </label>
          <input
            type="email"
            placeholder=""
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <label className="checkout-form-label required dmsans-bold">
            First name
          </label>
          <input
            type="text"
            placeholder=""
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <label className="checkout-form-label required dmsans-bold">
            Last name
          </label>
          <input
            type="text"
            placeholder=""
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <label className="checkout-form-label dmsans-bold">
            Company name (optional)
          </label>
          <input
            type="text"
            placeholder=""
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
          <label className="checkout-form-label required dmsans-bold">
            Country / Region
          </label>
          <div></div>
          <div className="d-block col-12 col-lg-8 placeholder-custom custom-select-address">
            <CountryDropdown
              value={form.country}
              onChange={(val) =>
                handleChange({ target: { name: "country", value: val } })
              }
              valueType="short"
            />
          </div>
          <div></div>
          <label className="checkout-form-label required dmsans-bold">
            Street address
          </label>
          <input
            type="text"
            placeholder="House number and street name"
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="street1"
            value={form.street1}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Apartment, suite, unit, etc. (optional)"
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="street2"
            value={form.street2}
            onChange={handleChange}
          />
          <label className="checkout-form-label required dmsans-bold">
            Town / City
          </label>
          <input
            type="text"
            placeholder=""
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <label className="checkout-form-label dmsans-bold ">
            State / Province
          </label>
          <div></div>
          <div className="d-block col-12 col-lg-8 placeholder-custom custom-select-address">
            <RegionDropdown
              country={form.country}
              value={form.region}
              onChange={(val) =>
                handleChange({ target: { name: "region", value: val } })
              }
              classes="d-block col-12 col-lg-8 placeholder-custom custom-input"
              countryValueType="short"
            />
          </div>
          <div></div>
          <label className="checkout-form-label required dmsans-bold">
            Postcode
          </label>
          <input
            type="text"
            placeholder=""
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="postcode"
            value={form.postcode}
            onChange={handleChange}
          />
          <label className="checkout-form-label required dmsans-bold">
            Phone
          </label>
          <input
            type="text"
            placeholder=""
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <div className="d-flex align-items-center gap-2 my-4">
            <input
              type="checkbox"
              onChange={(e) => {
                setBtnClick(e.target.checked);
                handleChange({
                  target: {
                    name: "shipDifferent",
                    type: "checkbox",
                    checked: e.target.checked,
                  },
                });
              }}
              checked={btnClick}
            ></input>
            <h1 className="justuspro-bold cart-heading">
              Ship to a different address?
            </h1>
          </div>
          {btnClick && (
            <div className="">
              {" "}
              <label className="checkout-form-label required dmsans-bold">
                First name
              </label>
              <input
                type="text"
                placeholder=""
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="sFirstName"
                value={form.sFirstName}
                onChange={handleChange}
              />
              <label className="checkout-form-label required dmsans-bold">
                Last name
              </label>
              <input
                type="text"
                placeholder=""
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="sLastName"
                value={form.sLastName}
                onChange={handleChange}
              />
              <label className="checkout-form-label dmsans-bold">
                Company name (optional)
              </label>
              <input
                type="text"
                placeholder=""
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="sCompany"
                value={form.sCompany}
                onChange={handleChange}
              />
              <label className="checkout-form-label required dmsans-bold">
                Country / Region
              </label>
              <div></div>
              <div className="d-block col-12 col-lg-8 placeholder-custom custom-select-address">
                <CountryDropdown
                  value={form.sCountry}
                  onChange={(val) =>
                    handleChange({ target: { name: "sCountry", value: val } })
                  }

                  valueType="short"
                />
              </div>
              <div></div>
              <label className="checkout-form-label required dmsans-bold">
                Street address
              </label>
              <input
                type="text"
                placeholder="House number and street name"
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="sStreet1"
                value={form.sStreet1}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="sStreet2"
                value={form.sStreet2}
                onChange={handleChange}
              />
              <label className="checkout-form-label required dmsans-bold">
                Town / City
              </label>
              <input
                type="text"
                placeholder=""
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="sCity"
                value={form.sCity}
                onChange={handleChange}
              />
              <label className="checkout-form-label dmsans-bold ">
                State / Province
              </label>
              <div></div>
              <div className="d-block col-12 col-lg-8 placeholder-custom custom-select-address">
                <RegionDropdown
                  country={form.sCountry}
                  value={form.sRegion}
                  onChange={(val) =>
                    handleChange({ target: { name: "sRegion", value: val } })
                  }
                  classes="d-block col-12 col-lg-8 placeholder-custom custom-select-address"
                  countryValueType="short"
                />
              </div>
              <div></div>
              <label className="checkout-form-label required dmsans-bold">
                Postcode
              </label>
              <input
                type="text"
                placeholder=""
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="sPostcode"
                value={form.sPostcode}
                onChange={handleChange}
              />
            </div>
          )}
          <label className="checkout-form-label mt-5">
            Order notes (optional)
          </label>
          <textarea
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            rows={6}
            placeholder="Notes about your order, e.g. special notes for delivery."
            name="orderNotes"
            value={form.orderNotes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-12 col-lg-6 p-lg-3">
          <h1 className="justuspro-bold mb-4 cart-heading">Your order</h1>
          <div className="d-flex align-items-center flex-wrap table-box">
            <div className="col-8 col-lg-10 cart-table-title justuspro-bold text-color-muted">
              Product
            </div>
            <div className="col-4 col-lg-2 cart-table-title justuspro-bold text-color-muted">
              Subtotal
            </div>
          </div>
          {cart?.map((item, index) => {
            return (
              <div
                key={item?.id ?? index}
                className="d-flex align-items-center flex-wrap table-box-list"
              >
                <div className="col-8 col-lg-10 cart-table-item">
                  <div className="d-flex align-items-center flex-wrap p-2">
                    <div className="col-4">
                      <img
                        src={item?.product?.imageUrl}
                        className="checkout-item-image"
                        alt={item?.title || "Product"}
                      />
                    </div>
                    <div className="col-8">
                      <Link
                        to={`/product/${item?.product?.slug}`}
                        className="text-decoration-none cart-product-link justuspro-regular text-color-danger dmsans-bold"
                      >
                        {item?.product?.productName}
                      </Link>
                      <p>${item?.product?.price} * {item?.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-lg-2 cart-table-item text-break dmsans-bold">
                  ${item?.product?.price * item?.quantity}
                </div>
              </div>
            );
          })}
          <div className="d-flex align-items-center flex-wrap table-box">
            <div className="col-8 col-lg-10 dmsans-bold text-color-primary">
              SUBTOTAL
            </div>
            <div className="col-4 col-lg-2 dmsans-bold text-color-primary">
              {" "}
              ${computeTotal()}
            </div>
          </div>
          <div className="d-flex align-items-center table-box-list">
            <div className="col-12 cart-table-title right-total p-4">
              <p className="dmsans-bold text-color-primary"> SHIPPING</p>
              <p className="delivery-type px-4 py-3 dmsans-bold text-color-primary">
                FREE SHIPPING
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center flex-wrap table-box">
            <div className="col-8 col-lg-10  dmsans-bold text-color-primary">
              TOTAL
            </div>
            <div className="col-4 col-lg-2 dmsans-bold text-color-primary">
              {" "}
              ${computeTotal()}
            </div>
          </div>
          <p className="table-box mt-5 mb-0 justuspro-regular text-color-primary">
            Sorry, it seems that there are no available payment methods. Please
            contact us if you require assistance or wish to make alternate
            arrangements.
          </p>
          <div>
            <div style={{
              border: "1px solid #ddd",
              padding: "20px",
              margin: "20px 0px "
            }}>
              <h3 style={{ marginBottom: "15px" }}>Choose a Payment Method</h3>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px"
              }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  border: paymentMethod === "card" ? "2px solid #f9a825" : "1px solid #ccc",
                  borderRadius: "6px"
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "card"}
                  />
                  <FaCreditCard color="#f9a825" />
                  Pay with Card
                </label>

                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  border: paymentMethod === "mobilemoneyghana" ? "2px solid #f9a825" : "1px solid #ccc",
                  borderRadius: "6px"
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="mobilemoneyghana"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "mobilemoneyghana"}
                  />
                  <FaMobileAlt color="#f9a825" />
                  Mobile Money
                </label>

                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "10px",
                  border: paymentMethod === "bank" ? "2px solid #f9a825" : "1px solid #ccc",
                  borderRadius: "6px"
                }}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "bank"}
                  />
                  <FaUniversity color="#f9a825" />
                  Bank Transfer
                </label>
              </div>

              {paymentMethod && (
                <button
                  onClick={handlePay}
                  style={{
                    backgroundColor: "#f9a825",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: "pointer"
                  }}
                >
                  Pay ${computeTotal()} Now
                </button>
              )}
            </div>
          </div>
          <div className=" table-box ">
            <p className=" text-color-primary">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <Link
                to="/privacy"
                className="text-decoration-none text-color-danger"
              >
                privacy policy.
              </Link>
            </p>
            <button
              onClick={async () => {
                try {
                  // Save addresses first
                  await submitAddresses();

                  // Then proceed with payment if method is selected
                  if (paymentMethod) {
                    await onPay(paymentMethod);
                  } else {
                    alert("Please select a payment method");
                  }
                } catch (e) {
                  console.error(e);
                  alert("Order placement failed. Please try again.");
                }
              }}
              className="order-btn w-100 border-0 justuspro-medium text-color-primary button-bg-primary"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
