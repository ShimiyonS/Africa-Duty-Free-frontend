import React, { useEffect, useState } from 'react';
import common from '../../../commonMethod/common.js';
import { useParams } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { toast } from 'react-toastify';

const AddressForm = () => {
    const { type } = useParams();
    const { firstLetterCapital, apiRequest } = common();
    const user = JSON.stringify(localStorage.getItem("user"))
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        company: "",
        region: "",
        street1: "",
        street2: "",
        city: "",
        postalCode: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});
    const handleRefresh = () => {
        setRefresh((prev) => !prev)
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateAllFields = () => {
        const newErrors = {};

        // Billing address validation
        newErrors.firstName = validateRequiredField(form?.firstName, "First name");
        newErrors.lastName = validateRequiredField(form?.lastName, "Last name");
        newErrors.country = validateRequiredField(form?.country, "Country");
        newErrors.street1 = validateRequiredField(form?.street1, "Street address");
        newErrors.city = validateRequiredField(form?.city, "City");
        newErrors.postalCode = validatePostcode(form?.postalCode);
        newErrors.phone = validatePhone(form?.phone);

        // // Shipping address validation (if different)
        // if (form?.shipDifferent) {
        //     newErrors.sFirstName = validateRequiredField(form?.sFirstName, "Shipping first name");
        //     newErrors.sLastName = validateRequiredField(form?.sLastName, "Shipping last name");
        //     newErrors.sCountry = validateRequiredField(form?.sCountry, "Shipping country");
        //     newErrors.sStreet1 = validateRequiredField(form?.sStreet1, "Shipping street address");
        //     newErrors.sCity = validateRequiredField(form?.sCity, "Shipping city");
        //     newErrors.sPostcode = validatePostcode(form?.sPostcode);
        // }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validated = await validateAllFields()
        if (validated) {
            const payload = {
                firstName: form?.firstName,
                lastName: form?.lastName,
                company: form?.company,
                country: form?.country,
                region: form?.region,
                city: form?.city,
                street1: form?.street1,
                street2: form?.street2,
                postalCode: form?.postalCode,
                phone: form?.phone,
                isDefault: type == "billing" ? true : false,
            };

            try {
                setLoading(true)
                const res = await apiRequest("POST", "/address", { [type]: { ...payload } });
                setForm()
                handleRefresh()
                toast.success(res?.message)

            }
            catch (error) {
                toast.error(error?.message)
            }
            finally {
                setLoading(false)
            }
        }

    };


    const validatePhone = (phone) => {
        if (!phone?.trim()) return "Phone number is required";
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(phone?.replace(/\s/g, ""))) return "Please enter a valid phone number";
        return "";
    };

    const validatePostcode = (postalCode) => {
        if (!postalCode?.trim()) return "Postcode is required";
        if (postalCode.length < 3) return "Postcode must be at least 3 characters";
        return "";
    };

    const validateRequiredField = (value, fieldName) => {
        if (!value?.trim()) return `${fieldName} is required`;
        return "";
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        let error = "";
        switch (name) {
            case "phone":
                error = validatePhone(value);
                break;
            case "postalCode":
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

    const fetchUserAddress = async () => {
        try {
            const res = await apiRequest("GET", "/address");
            const data = res?.addresses?.filter((item) => item?.type == type)
            setForm(data)
            toast.success(res?.message)
        }
        catch (error) {
            toast.success(error?.message)
        }

    }

    useEffect(() => {
        if (user) {
            fetchUserAddress()
        }
    }, [refresh])


    return (
        <div>
            <h2 className="fw-bold mb-4 cart-heading">
                {firstLetterCapital(type)} address
            </h2>
            <form className="col-12" onSubmit={handleSubmit}>
                {/* First name */}
                <label className="checkout-form-label required">First name</label>
                <input
                    type="text"
                    name="firstName"
                    value={form?.firstName}
                    onChange={handleChange}
                    placeholder="Please enter billing first name"
                    onBlur={handleBlur}
                    className={`  form-control  placeholder-custom custom-input ${errors.firstName ? "is-invalid" : ""
                        }`}
                />
                {errors.firstName && (
                    <div className="text-danger small mb-2">{errors.firstName}</div>
                )}

                {/* Last name */}
                <label className="checkout-form-label required">Last name</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Please enter billing last name"
                    value={form?.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`d-block form-control  placeholder-custom custom-input ${errors.lastName ? "is-invalid" : ""
                        }`}
                />
                {errors.lastName && (
                    <div className="text-danger small mb-2">{errors.lastName}</div>
                )}

                {/* Company */}
                <label className="checkout-form-label">Company name (optional)</label>
                <input
                    type="text"
                    name="company"
                    placeholder="Please enter billing company name"
                    value={form?.company}
                    onChange={handleChange}
                    className="d-block form-control  placeholder-custom custom-input"
                />

                {/* Region */}
                <label className="checkout-form-label required">Country / Region</label>
                <div className={` placeholder-custom custom-select-address ${errors.country ? 'border-danger' : ''}`}>
                    <CountryDropdown
                        value={form?.country}
                        placeholder="Please select country"
                        onChange={(val) =>
                            handleChange({ target: { name: "country", value: val } })
                        }
                        onBlur={() => handleBlur({ target: { name: "country", value: form?.country } })}
                        valueType="short"
                        className='form-control placeholder-custom custom-input w-100'
                    />
                </div>
                {errors.country && (
                    <div className="text-danger small mb-2">{errors.country}</div>
                )}

                {/* Street */}
                <label className="checkout-form-label required">Street address</label>
                <input
                    type="text"
                    name="street1"
                    placeholder="House number and street name"
                    value={form?.street1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`d-block form-control  placeholder-custom custom-input ${errors.street1 ? "is-invalid" : ""
                        }`}
                />
                {errors.street1 && (
                    <div className="text-danger small mb-2">{errors.street1}</div>
                )}

                {/* <input
                    type="text"
                    name="street2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    value={form?.street2}
                    onChange={handleChange}
                    className="d-block form-control  placeholder-custom custom-input"
                /> */}

                {/* City */}
                <label className="checkout-form-label required">Town / City</label>
                <input
                    type="text"
                    name="city"
                    placeholder="Please enter billing city"
                    value={form?.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`d-block form-control  placeholder-custom custom-input ${errors.city ? "is-invalid" : ""
                        }`}
                />
                {errors.city && <div className="text-danger small mb-2">{errors.city}</div>}

                {/* State */}
                <label className="checkout-form-label required">State</label>
                <RegionDropdown
                    country={form?.country}
                    value={form?.region}
                    onChange={(val) =>
                        handleChange({ target: { name: "region", value: val } })
                    }
                    className="placeholder-custom form-control w-100 custom-input"
                    countryValueType="short"
                />
                {errors.region && (
                    <div className="text-danger small mb-2">{errors.region}</div>
                )}

                {/* Postcode */}
                <label className="checkout-form-label required">Postcode</label>
                <input
                    type="number"
                    name="postalCode"
                    placeholder="Please enter billing postalCode"
                    value={form?.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`d-block form-control  placeholder-custom custom-input ${errors.postalCode ? "is-invalid" : ""
                        }`}
                />
                {errors.postalCode && (
                    <div className="text-danger small mb-2">{errors.postalCode}</div>
                )}

                {/* Phone */}
                <label className="checkout-form-label required">Phone</label>
                <input
                    type="number"
                    name="phone"
                    value={form?.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Please enter phone number"
                    className={`d-block form-control  placeholder-custom custom-input ${errors.phone ? "is-invalid" : ""
                        }`}
                />
                {errors.phone && (
                    <div className="text-danger small mb-2">{errors.phone}</div>
                )}

                <button
                    type="submit"
                    className="d-block button-text-primary button-bg-primary border-0 px-4 py-2 ms-auto rounded-2 mt-3"
                >
                    {loading ? "Loading..." : "Save address"}
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
