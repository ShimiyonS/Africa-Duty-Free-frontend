import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react'
import './App.css'
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import NoPage from './pages/NoPage';
import ProductDetails from './pages/ProductDetails';
import BrandDetails from './pages/BrandDetails';
import CategoryDetails from './pages/CategoryDetails';
import ShopDetails from './pages/ShopDetails';
import Cart from './pages/Cart';
import AccountRoutes from './routes/AccountRoutes';
import Checkout from './pages/Checkout';
import MainPage from './pages/MainPage';
import ProtectedRoute from './routes/ProtectedRoute';
import MyAccountRoutes from './routes/MyAccountRoutes';
import AdminRoutes from './routes/AdminRoutes';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import HomePage from './pages/homePage/HomePage';

function App() {
  const location = useLocation()
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 20) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };
    toggleVisibility();
  }, [location]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/home" element={<MainPage />} />
          <Route path='homepage' element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<ForgotPassword />} />
          <Route path="/product-category/:slug" element={<CategoryDetails />} />
          <Route path="/product-category/:slug/:subslug" element={<CategoryDetails />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/brand/:slug" element={<BrandDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* <Route path="/africa-best-buy/product-category/:slug" element={<BrandDetails />} /> */}
          <Route path="/shop" element={<ShopDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="account/*" element={<ProtectedRoute ><AccountRoutes /></ProtectedRoute>} />
          <Route path="my-account/*" element={<ProtectedRoute ><MyAccountRoutes /></ProtectedRoute>} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="search" element={<Search />} />
          <Route path="siteadmin/*" element={<ProtectedAdminRoute><AdminRoutes /></ProtectedAdminRoute>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
