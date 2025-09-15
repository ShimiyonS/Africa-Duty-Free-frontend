
const firstLetterCapital = (text) => { if (!text) return ""; return text.charAt(0).toUpperCase() + text.slice(1); };

const generateSlug = (value) => {
    return value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


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
const apiRequest = async (method, url, data = {}, headers = {}) => {
    try {
        const response = await api({
            method,
            url,
            data,
            params: method === "GET" ? data : {},
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
    return { dispatch, cartItems, firstLetterCapital, apiRequest, generateSlug }
}
export default common;
