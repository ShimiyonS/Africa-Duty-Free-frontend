import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import cart from "./slice/cartSlice";
import auth from "./slice/authSlice";
import wishlist from "./slice/wishlistSlice";
import orders from "./slice/orderSlice";
import brand from "./slice/brandSlice"
const persistConfig = {
    key: "root",
    storage,
    whitelist: [], // state slices you want to persist
};
const rootReducer = combineReducers({
    cart,
    auth,
    wishlist,
    orders,
    brand,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist
        }),
});


export const persistor = persistStore(store);
export default store;
