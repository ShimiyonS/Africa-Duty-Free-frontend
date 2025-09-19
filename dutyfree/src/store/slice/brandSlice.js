import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const BrandSlice = createSlice({
    name: "Brand",
    initialState,
    reducers: {
        setBrand: (state, action) => {
            state.items = Array.isArray(action.payload) ? action.payload : [];
        }
    },
});

export const { setBrand } = BrandSlice.actions;
export default BrandSlice.reducer;


