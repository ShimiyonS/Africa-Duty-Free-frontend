
const firstLetterCapital = (text) => { if (!text) return ""; return text.charAt(0).toUpperCase() + text.slice(1); };

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const api = axios.create({
    baseURL: "https://dummyjson.com",
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

const Common = () => {
    const dispatch = useDispatch();
    const getActiveCart = useSelector(
        (state) => state.viewCart
    );
    return { dispatch, getActiveCart ,firstLetterCapital, apiRequest}
}
export default Common;
