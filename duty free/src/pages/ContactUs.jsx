import { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "firstname" || name === "lastname") newValue = restrictNumbers(value);

    setForm((prev) => ({
      ...prev,
      [name]: newValue
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form?.username?.trim()) newErrors.username = "Username is required";
    if (!form?.firstname?.trim()) newErrors.firstname = "First name is required";
    if (!form?.lastname?.trim()) newErrors.lastname = "Last name is required";
    if (!form?.email?.trim()) {
      newErrors.email = "Email is required";
    } else {
      if (!verifyEmail(form.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // ✅ password validation
    if (!form?.password?.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }

    if (form?.password?.trim() && !form?.confirmpassword?.trim()) {
      newErrors.confirmpassword = "Confirm password is required";
    } else if (form?.password !== form?.confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      setErrors({});
      const payload = {
        username: form?.username,
        firstName: form?.firstname,
        lastName: form?.lastname,
        email: form?.email,
        password: form?.password
      };
      const res = await apiRequest('POST', '/auth/register', payload);
      if (res?.status && res?.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        navigate('/');
        return;
      } else {
        setErrors((prev) => ({ ...prev, form: res?.message || 'Registration failed' }));
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed';
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="row container mx-auto contact-us-form justify-content-center">
        <div className="col-12 col-lg-5">
          <h2 className="contact-us-header justuspro-bold">Contact Us for Your Duty-Free Shopping Experience</h2>
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="icon-wrapper">
                <MdOutlinePhone className="contact-us-icon text-color-gold" />
              </div>
              <div className="contact-info-details">
                <h3 className="contact-us-subheader contact-us-header justuspro-medium mt-2">Phone:</h3>
                <Link to="/tel:+99 (0) 101 0000 888" className="d-block text-decoration-none mb-2 text-color-muted">+99 (0) 101 0000 888</Link>
                <Link to="/tel:+99 (0) 101 0000 888" className="d-block text-decoration-none mb-2 text-color-muted">+99 (0) 101 0000 888</Link>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="icon-wrapper">
                <MdOutlineMailOutline className="contact-us-icon text-color-gold" />
              </div>
              <div className="contact-info-details">
                <h3 className="contact-us-subheader contact-us-header justuspro-medium mt-2">Email:</h3>
                <Link to="/mailto:sales@africadutyfree.com" className="d-block text-decoration-none mb-2 text-color-muted">sales@africadutyfree.com</Link>
                <Link to="/mailto:info@africadutyfree.com" className="d-block text-decoration-none mb-2 text-color-muted">info@africadutyfree.com</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6 mt-4 mt-lg-0">
          <form action="" className="contact-us">
            <div className="row col-12 mb-4">
              <div className="col-12 col-md-6 ps-md-0 mb-3 mb-md-0">
                <input type="text" placeholder='Name' className='duty-popup-inputs' />
              </div>
              <div className="col-12 col-md-6 pe-md-0">
                <input type="number" placeholder='Phone Number' className='duty-popup-inputs' />
              </div>
            </div>

            <div className="row col-12 mb-4">
              <input type="email" name="" id="" placeholder='Your Email' className='duty-popup-inputs' />
            </div>

            <div className="row col-12 mb-4">
              <textarea name="message" id="" className="duty-popup-textarea" rows={10} cols={4} placeholder='Your message here' ></textarea>
            </div>

            <div className="d-flex justify-content-end">
              <button type='submit' className='duty-popup-button rounded-pill  bg-color-gold  text-color-secondary dmsans-bold'>
                Send
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default ContactUs