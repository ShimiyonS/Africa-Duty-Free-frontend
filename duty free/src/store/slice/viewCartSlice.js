import { createSlice } from "@reduxjs/toolkit";

const viewCartSlice = createSlice({
    name: "viewCart",
    initialState: {
    },
    reducers: {
        viewCart: (state, action) => {
            state.data = { ...action.payload };
        },
        clearCart: (state, action) => {
            state.data = {};
        },
    },
});

// Export the action
export const { viewCart, clearCart } = viewCartSlice.actions;

// Export the reducer
export default viewCartSlice.reducer;
