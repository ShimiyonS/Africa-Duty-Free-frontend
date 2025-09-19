import { createSlice } from "@reduxjs/toolkit";

const viewCardSlice = createSlice({
    name: "viewCard",
    initialState: {
    },
    reducers: {
        viewCard: (state, action) => {
            state.data = { ...action.payload };
        },
        clearCard: (state, action) => {
            state.data = {};
        },
    },
});

// Export the action
export const { viewCard, clearCard } = viewCardSlice.actions;

// Export the reducer
export default viewCardSlice.reducer;
