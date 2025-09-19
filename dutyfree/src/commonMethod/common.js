
const firstLetterCapital = (text) => { if (!text) return ""; return text.charAt(0).toUpperCase() + text.slice(1); };

const restrictNumbers = (val) => { if (!val) return ""; return val.replace(/[^A-Za-z\s]/g, ""); };

const verifyEmail = (email) => {
    if (!email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

const passwordConditions = (password) => {
    if (!password) return false
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).{8,}$/;
    return passwordRegex.test(password)
}

const generateSlug = (value) => {
    return value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../store/slice/wishlistSlice";
import { setCartItems } from "../store/slice/cartSlice";


const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
const apiRequest = async (method, url, data = {}, headers = {}, baseURL, params) => {
    try {
        const response = await api({
            method,
            url,
            baseURL: baseURL || import.meta.env.VITE_APP_API_URL,
            data,
            params: method === "GET" ? data : params,
            headers,
        });
        return response.data;

    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};


const common = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart?.items || []);
    const wishlistItems = useSelector((state) => state.wishlist?.items || []);
    const brandItems = useSelector((state) => state.brand?.items || [])

    const getUserWishlist = async (userId) => {
        const res = await apiRequest("GET", `/auth/${userId}/wishlist`);
        dispatch(setWishlist(res?.products || []));
    };
    const getUserCartlist = async () => {
        const res = await apiRequest("GET", `/cart`);
        dispatch(setCartItems(res?.items || []));
    };
    const addUserCart = async (data) => {
        const res = await apiRequest("POST", `/cart/add`, data);
        getUserCartlist()
    };
    const removeUserCart = async (productId) => {
        const res = await apiRequest("DELETE", `/cart/remove/${productId}`);
        getUserCartlist()
    };
    const changeProductQuantityCart = async (data) => {
        const res = await apiRequest("POST", `/cart/quantity`, data);
        getUserCartlist()
    };

    const toggleUserWishlist = async (userId, productId) => {
        const res = await apiRequest("POST", `/auth/${userId}/wishlist/toggle`, { productId });
        getUserWishlist(userId);
    };

    return { changeProductQuantityCart, removeUserCart, addUserCart, getUserCartlist, toggleUserWishlist, getUserWishlist, dispatch, cartItems, brandItems, wishlistItems, firstLetterCapital, restrictNumbers, verifyEmail, passwordConditions, apiRequest, generateSlug }
}
export default common;
