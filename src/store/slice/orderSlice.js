import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.list = Array.isArray(action.payload) ? action.payload : [];
        },
        clearOrders: (state) => {
            state.list = [];
        },
    },
});

export const { setOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;


