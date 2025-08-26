import { configureStore } from "@reduxjs/toolkit";
import viewCart from "./slice/viewCartSlice";

export default configureStore({
    reducer: {
        viewCart: viewCart,
    },
});
