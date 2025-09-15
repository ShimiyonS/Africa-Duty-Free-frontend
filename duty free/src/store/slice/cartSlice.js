import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action) => {
            state.items = Array.isArray(action.payload) ? action.payload : [];
        },
        upsertCartItem: (state, action) => {
            const item = action.payload;
            if (!item || !item.id) return;
            const index = state.items.findIndex((p) => p.id === item.id);
            if (index >= 0) {
                const existing = state.items[index];
                state.items[index] = {
                    ...existing,
                    ...item,
                    quantity:
                        (existing.quantity || 0) + (item.quantityDelta ? item.quantityDelta : item.quantity || 0),
                };
            } else {
                state.items.push({
                    id: item.id,
                    title: item.title,
                    price: item.price || 0,
                    quantity: item.quantityDelta ? item.quantityDelta : item.quantity || 1,
                    thumbnail: item.thumbnail,
                });
            }
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload || {};
            const index = state.items.findIndex((p) => p.id === id);
            if (index >= 0) {
                state.items[index].quantity = Math.max(0, Number(quantity) || 0);
            }
        },
        removeCartItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((p) => p.id !== id);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { setCartItems, upsertCartItem, updateQuantity, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


