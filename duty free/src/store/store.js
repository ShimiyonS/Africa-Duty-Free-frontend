import { configureStore } from "@reduxjs/toolkit";
import cart from "./slice/cartSlice";

export default configureStore({
    reducer: {
        cart: cart,
    },
});
