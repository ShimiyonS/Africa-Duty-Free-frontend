import React, { useEffect, useState } from "react";
import "../Styles/checkout.css";
import common from "../commonMethod/common.js";
import { Link } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { FaCreditCard } from "react-icons/fa6";
import { FaMobileAlt, FaUniversity } from "react-icons/fa";
import { toast } from "react-toastify";
const Checkout = () => {
  const { apiRequest, cartItems } = common();
  const user = JSON.stringify(localStorage.getItem("user"))

  const [address, setAddress] = useState({
    billing: {},
    shipping: []
  })
  const [couponStatus] = useState(false);
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
    sphone: ""
  });
  const [btnClick, setBtnClick] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [errors, setErrors] = useState({});
  const [paymentMethodError, setPaymentMethodError] = useState("");

  useEffect(() => {
    setCart(Array.isArray(cartItems) ? cartItems : []);
  }, [cartItems]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Validate individual field on blur
    let error = "";
    switch (name) {
      case "phone":
        error = validatePhone(value);
        break;
      case "postcode":
        error = validatePostcode(value);
        break;
      case "firstName":
        error = validateRequiredField(value, "First name");
        break;
      case "lastName":
        error = validateRequiredField(value, "Last name");
        break;
      case "country":
        error = validateRequiredField(value, "Country");
        break;
      case "street1":
        error = validateRequiredField(value, "Street address");
        break;
      case "city":
        error = validateRequiredField(value, "City");
        break;
      case "sFirstName":
        error = validateRequiredField(value, "Shipping first name");
        break;
      case "sLastName":
        error = validateRequiredField(value, "Shipping last name");
        break;
      case "sCountry":
        error = validateRequiredField(value, "Shipping country");
        break;
      case "sStreet1":
        error = validateRequiredField(value, "Shipping street address");
        break;
      case "sCity":
        error = validateRequiredField(value, "Shipping city");
        break;
      case "sPostcode":
        error = validatePostcode(value);
        break;
      default:
        break;
    }

    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
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
    if (btnClick) {
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
      await fetchUserAddress()
      console.log("Addresses saved:", res);
      return res;
    } catch (err) {
      console.error("Failed to save addresses", err);
      throw err;
    }
  };

  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentMethodError("");
  };


  const validatePhone = (phone) => {
    if (!phone?.trim()) return "Phone number is required";
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) return "Please enter a valid phone number";
    return "";
  };

  const validatePostcode = (postcode) => {
    if (!postcode?.trim()) return "Postcode is required";
    if (postcode.length < 3) return "Postcode must be at least 3 characters";
    return "";
  };

  const validateRequiredField = (value, fieldName) => {
    if (!value?.trim()) return `${fieldName} is required`;
    return "";
  };

  // Validation function for all fields
  const validateAllFields = () => {
    const newErrors = {};

    // Billing address validation
    newErrors.firstName = validateRequiredField(form.firstName, "First name");
    newErrors.lastName = validateRequiredField(form.lastName, "Last name");
    newErrors.country = validateRequiredField(form.country, "Country");
    newErrors.region = validateRequiredField(form.region, "Region");
    newErrors.street1 = validateRequiredField(form.street1, "Street address");
    newErrors.city = validateRequiredField(form.city, "City");
    newErrors.postcode = validatePostcode(form.postcode);
    newErrors.phone = validatePhone(form.phone);

    // Shipping address validation (if different)
    if (btnClick) {
      newErrors.sFirstName = validateRequiredField(form.sFirstName, "Shipping first name");
      newErrors.sLastName = validateRequiredField(form.sLastName, "Shipping last name");
      newErrors.sCountry = validateRequiredField(form.sCountry, "Shipping country");
      newErrors.sStreet1 = validateRequiredField(form.sStreet1, "Shipping street address");
      newErrors.sCity = validateRequiredField(form.sCity, "Shipping city");
      newErrors.sRegion = validateRequiredField(form.sRegion, "Shipping Region");
      newErrors.sPostcode = validatePostcode(form.sPostcode);
      newErrors.sphone = validatePhone(form.sphone);
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };



  const onPay = async () => {
    if (!paymentMethod) {
      setPaymentMethodError("Please select a payment method");
      toast.error("Please select a payment method");
      return;
    }

    if (!address?.billing?.id) {
      const isValid = validateAllFields();
      if (!isValid) {
        toast.error("Please complete all required fields");
        return;
      }
      else {
        submitAddresses()
      }
    }
    if (btnClick) {
      if (address?.shipping?.length < 0 || !address?.shipping?.find((item) => item?.checked == 1)) {
        toast.error("Please Select Shipping address");
        return;
      }
    }
    const payload = {
      items: cart?.map(item => ({
        product_id: item?.product?.id,
        quantity: item?.quantity,
        price: item?.product?.price
      })),
      total: computeTotal(),
      billingAddressId: address?.billing?.id,
      shippingAddressId: btnClick ? address?.shipping?.filter((item) => item?.checked == 1)[0]?.id : address?.billing?.id
    }
    console.log(payload)

    try {
      // 1. First create the order
      const orderResponse = await apiRequest("POST", "/orders", payload);

      const orderId = orderResponse.orderId;

      // 2. Then initialize payment with order ID
      const paymentResponse = await apiRequest("POST", "/payment/initialize", {
        amount: computeTotal(),
        name: `${form.firstName} ${form.lastName}`.trim() || "Test User",
        paymentMethod: paymentMethod,
        orderId: orderId,
        redirectUrl: window.location.origin + "/payment/callback",
      });

      // 3. Redirect to payment page
      if (paymentResponse.link) {
        window.location.href = paymentResponse.link;
      }
    } catch (error) {
      console.error("Payment initialization failed:", error);
      toast.error("Payment initialization failed. Please try again.");
    }
  };

  const fetchUserAddress = async () => {
    try {
      const res = await apiRequest("GET", "/address");
      const data = res?.addresses
      setAddress((prev) => ({
        ...prev,
        billing: data?.find((item) => item?.type == "billing"),
        shipping: data?.filter((item) => item?.type == "shipping")
      }))
      // toast.success(res?.message)
    }
    catch (error) {
      toast.success(error?.message)
    }
  }

  const enableShipping = (e) => {
    const { checked } = e.target
    setBtnClick(!btnClick)
    if (!checked) {
      setAddress((prev) => ({
        ...prev,
        shipping: prev?.shipping?.map((item) => ({ ...item, checked: 0 }))
      }))
    }
  }
  useEffect(() => {
    if (user) {
      fetchUserAddress()
    }
  }, [])
  return (
    <div className="container mt-0 mt-md-5">
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
      <div className="d-flex flex-wrap py-2  py-md-5 ">
        <div className="col-12 col-lg-6 p-lg-3">
          <h1 className="justuspro-bold mb-4 cart-heading">Billing details</h1>
          {Object.keys(address?.billing)?.length > 0 ?
            <div className="address-block mb-5">
              <p><strong>Name:  </strong>{address?.billing?.firstName}  {address?.billing?.lastName}</p>
              <p><strong>Country:</strong> {address?.billing?.country}</p>
              <p><strong>Region:</strong> {address?.billing?.region}</p>
              <p><strong>City:</strong> {address?.billing?.city}</p>
              <p><strong>Street:</strong> {address?.billing?.street1}</p>
              <p><strong>postalCode:</strong> {address?.billing?.postalCode}</p>
              <p><strong>Phone number:</strong> {address?.billing?.phone}</p>
            </div>
            :
            <div>
              <label className="checkout-form-label required dmsans-bold">
                First name
              </label>
              <input
                type="text"
                placeholder="Please enter billing first name"
                className={`form-control  placeholder-custom custom-input ${errors.firstName ? 'is-invalid' : ''}`}
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && (
                <div className="invalid-feedback d-block mt-2">
                  {errors.firstName}
                </div>
              )}
              <label className="checkout-form-label required dmsans-bold">
                Last name
              </label>
              <input
                type="text"
                placeholder="Please enter billing last name"
                className={` form-control placeholder-custom custom-input ${errors.lastName ? 'is-invalid' : ''}`}
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && (
                <div className="invalid-feedback d-block mt-2" >
                  {errors.lastName}
                </div>
              )}
              <label className="checkout-form-label dmsans-bold">
                Company name (optional)
              </label>
              <input
                type="text"
                placeholder="Please enter billing company name"
                className="form-control  placeholder-custom custom-input"
                name="company"
                value={form.company}
                onChange={handleChange}
              />
              <label className="checkout-form-label required dmsans-bold">
                Country / Region
              </label>
              <div className={`placeholder-custom custom-select-address `}>
                <CountryDropdown
                  value={form.country}
                  placeholder="Please select country"
                  onChange={(val) =>
                    handleChange({ target: { name: "country", value: val } })
                  }
                  onBlur={() => handleBlur({ target: { name: "country", value: form.country } })}
                  valueType="short"
                  className={`${errors.country ? 'is-invalid' : ''} form-control placeholder-custom custom-input w-100`}
                />
              </div>
              {errors.country && (
                <div className="invalid-feedback d-block mt-2" >
                  {errors.country}
                </div>
              )}

              <label className="checkout-form-label required dmsans-bold">
                Street address
              </label>
              <input
                type="text"
                placeholder="House number and street name"
                className={`form-control  placeholder-custom custom-input ${errors.street1 ? "is-invalid" : ""}`}
                name="street1"
                value={form.street1}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.street1 && (
                <div className="invalid-feedback d-block mt-2" >
                  {errors.street1}
                </div>
              )}
              {/* <input
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
                className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                name="street2"
                value={form.street2}
                onChange={handleChange}
              /> */}
              <label className="checkout-form-label required dmsans-bold">
                Town / City
              </label>
              <input
                type="text"
                placeholder="Please enter billing city"
                className={` form-control  placeholder-custom custom-input ${errors.city ? "is-invalid" : ""}`}
                name="city"
                value={form.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.city && (
                <div className="invalid-feedback d-block mt-2" >
                  {errors.city}
                </div>
              )}
              <label className="checkout-form-label dmsans-bold ">
                State / Province
              </label>
              <div className="placeholder-custom custom-select-address required">
                <RegionDropdown
                  country={form.country}
                  value={form.region}
                  onChange={(val) =>
                    handleChange({ target: { name: "region", value: val } })
                  }
                  className={`placeholder-custom form-control w-100 custom-input ${errors.region ? "is-invalid" : ""}`}
                  countryValueType="short"
                />
                {errors.region && (
                  <div className="invalid-feedback d-block mt-2">{errors.region}</div>
                )}
              </div>
              <label className="checkout-form-label required dmsans-bold">
                Postcode
              </label>
              <input
                type="number"
                placeholder="Please enter billing postcode"
                className={`form-control  placeholder-custom custom-input ${errors.postalCode ? "is-invalid" : ""
                  }`}
                name="postcode"
                value={form.postcode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.postcode && (
                <div className="invalid-feedback d-block mt-2" >
                  {errors.postcode}
                </div>
              )}
              <label className="checkout-form-label required dmsans-bold">
                Phone
              </label>
              <input
                type="number"
                placeholder="Please enter phone number"
                className={`d-block form-control  placeholder-custom custom-input ${errors.phone ? "is-invalid" : ""
                  }`}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && (
                <div className="invalid-feedback d-block mt-2" >
                  {errors.phone}
                </div>
              )}
            </div>
          }
          <div className="d-flex align-items-center gap-2 my-4">
            <input
              type="checkbox"
              onChange={(e) => enableShipping(e)}
            ></input>
            <h1 className="justuspro-bold cart-heading">
              Ship to a different address?
            </h1>
          </div>
          {btnClick && (
            <div className="">
              {address?.shipping?.length > 0 ?
                address?.shipping?.map((item) => {
                  return (
                    <div className="address-block mb-3">
                      <input
                        type="checkbox"
                        checked={item?.checked || false} // controlled checkbox
                        onChange={() =>
                          setAddress((prev) => ({
                            ...prev,
                            shipping: prev?.shipping?.map((addr) =>
                              addr.id === item.id
                                ? { ...addr, checked: !addr.checked } // toggle clicked one
                                : { ...addr, checked: false } // uncheck others
                            ),
                          }))
                        }
                      />
                      <p>{item?.firstName}  {item?.lastName}</p>
                      <p>{item?.phone}</p>
                      <p> {item?.street1},{item?.country},{item?.region},{item?.city},{item?.postalCode}</p>
                    </div>)
                }) :
                <>
                  <label className="checkout-form-label required dmsans-bold">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Please enter shipping first name"
                    className={`form-control  placeholder-custom custom-input ${errors.sFirstName ? 'is-invalid' : ''}`}
                    name="sFirstName"
                    value={form.sFirstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sFirstName && (
                    <div className="invalid-feedback d-block mt-2" >
                      {errors.sFirstName}
                    </div>
                  )}
                  <label className="checkout-form-label required dmsans-bold">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Please enter shipping last name"
                    className={` form-control placeholder-custom custom-input ${errors.sLastName ? 'is-invalid' : ''}`}
                    name="sLastName"
                    value={form.sLastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sLastName && (
                    <div className="invalid-feedback d-block mt-2" >
                      {errors.sLastName}
                    </div>
                  )}
                  <label className="checkout-form-label dmsans-bold">
                    Company name (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Please enter shipping company name"
                    className="form-control  placeholder-custom custom-input"
                    name="sCompany"
                    value={form.sCompany}
                    onChange={handleChange}
                  />
                  <label className="checkout-form-label required dmsans-bold">
                    Country / Region
                  </label>

                  <div className={`placeholder-custom custom-select-address`}>
                    <CountryDropdown
                      value={form.sCountry}
                      onChange={(val) =>
                        handleChange({ target: { name: "sCountry", value: val } })
                      }
                      onBlur={() => handleBlur({ target: { name: "sCountry", value: form.sCountry } })}
                      valueType="short"
                      placeholder="Please select country"
                      className={`${errors.sCountry ? 'is-invalid' : ''} form-control placeholder-custom custom-input w-100`}

                    />
                  </div>
                  {errors.sCountry && (
                    <div className="invalid-feedback d-block mt-2" >
                      {errors.sCountry}
                    </div>
                  )}

                  <label className="checkout-form-label required dmsans-bold">
                    Street address
                  </label>
                  <input
                    type="text"
                    placeholder="House number and street name"
                    className={`form-control  placeholder-custom custom-input ${errors.sStreet1 ? "is-invalid" : ""}`}
                    name="sStreet1"
                    value={form.sStreet1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sStreet1 && (
                    <div className="invalid-feedback d-block mt-2" >
                      {errors.sStreet1}
                    </div>
                  )}
                  {/* <input
                    type="text"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className="d-block col-12 col-lg-8 placeholder-custom custom-input"
                    name="sStreet2"
                    value={form.sStreet2}
                    onChange={handleChange}
                  /> */}
                  <label className="checkout-form-label required dmsans-bold">
                    Town / City
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className={` form-control  placeholder-custom custom-input ${errors.sCity ? "is-invalid" : ""}`}

                    name="sCity"
                    value={form.sCity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sCity && (
                    <div className="invalid-feedback d-block mt-2" >
                      {errors.sCity}
                    </div>
                  )}
                  <label className="checkout-form-label dmsans-bold ">
                    State / Province
                  </label>
                  <div className="placeholder-custom custom-select-address required">
                    <RegionDropdown
                      country={form.sCountry}
                      value={form.sRegion}
                      onChange={(val) =>
                        handleChange({ target: { name: "sRegion", value: val } })
                      }
                      className={`placeholder-custom form-control w-100 custom-input ${errors.sRegion ? "is-invalid" : ""}`}
                      countryValueType="short"
                    />
                    {errors.sRegion && (
                      <div className="invalid-feedback d-block mt-2">{errors.sRegion}</div>
                    )}
                  </div>
                  <label className="checkout-form-label required dmsans-bold">
                    Postcode
                  </label>
                  <input
                    type="number"
                    placeholder="Please enter postcode number"
                    className={`d-block form-control  placeholder-custom custom-input ${errors.sPostcode ? "is-invalid" : ""
                      }`}
                    name="sPostcode"
                    value={form.sPostcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sPostcode && (
                    <div className="invalid-feedback d-block mt-2" >
                      {errors.sPostcode}
                    </div>
                  )}
                  <label className="checkout-form-label required dmsans-bold">
                    Phone
                  </label>
                  <input
                    type="number"
                    placeholder="Please enter phone number"
                    className={`d-block form-control  placeholder-custom custom-input ${errors.sphone ? "is-invalid" : ""
                      }`}
                    name="sphone"
                    value={form.sphone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.sphone && (
                    <div className="invalid-feedback d-block mt-2" >
                      {errors.sphone}
                    </div>
                  )}
                </>
              }
            </div>
          )}
          {/* <label className="checkout-form-label mt-md-5">
            Order notes (optional)
          </label>
          <textarea
            className="d-block col-12 col-lg-8 placeholder-custom custom-input"
            rows={6}
            placeholder="Notes about your order, e.g. special notes for delivery."
            name="orderNotes"
            value={form.orderNotes}
            onChange={handleChange}
          ></textarea> */}
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
                  <div className="d-flex flex-wrap align-items-center flex-wrap p-2">
                    <div className="col-12 col-md-4">
                      <img
                        src={item?.product?.imageUrl}
                        className="checkout-item-image"
                        alt={item?.title || "Product"}
                      />
                    </div>
                    <div className="col-12 col-md-8">
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
          {/* <p className="table-box mt-5 mb-0 justuspro-regular text-color-primary">
            Sorry, it seems that there are no available payment methods. Please
            contact us if you require assistance or wish to make alternate
            arrangements.
          </p> */}
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
                    onChange={(e) => handlePaymentMethodChange(e.target.value)}
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
                    onChange={(e) => handlePaymentMethodChange(e.target.value)}
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
                    onChange={(e) => handlePaymentMethodChange(e.target.value)}
                    checked={paymentMethod === "bank"}
                  />
                  <FaUniversity color="#f9a825" />
                  Bank Transfer
                </label>
              </div>

              {/* Payment method error message */}
              {paymentMethodError && (
                <div style={{
                  color: "#dc3545",
                  fontSize: "14px",
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  borderRadius: "4px"
                }}>
                  {paymentMethodError}
                </div>
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
            <button type="button" onClick={() => onPay()} className="order-btn w-100 border-0 justuspro-medium text-color-primary button-bg-primary">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Checkout;