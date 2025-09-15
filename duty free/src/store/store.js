import { configureStore } from "@reduxjs/toolkit";
import cart from "./slice/cartSlice";
import auth from "./slice/authSlice";
import wishlist from "./slice/wishlistSlice";
import orders from "./slice/orderSlice";

export default configureStore({
    reducer: {
        cart: cart,
        auth: auth,
        wishlist: wishlist,
        orders: orders,
    },
});
