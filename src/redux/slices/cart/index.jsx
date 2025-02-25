import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    initialState: {
        cartItems: {},
        totalAmount: 0,
        discountAmount: 0,
        finalAmount: 0
    },
    name: 'cart',
    reducers: {
        addToCart: (state, action) => {
            state.cartItems[action.payload.id] = { ...action.payload.data, quantity: action.payload.quantity }
            state.totalAmount = state.totalAmount + Math.floor(action.payload.totalAmount);
            state.discountAmount = state.discountAmount + Math.floor(action.payload.discountAmount);
            state.finalAmount = state.finalAmount + Math.floor(action.payload.finalAmount);
        },
        removeCartItem: (state, action) => {
            if (state.cartItems[action.payload.id]) {
                const tempCartItems = state.cartItems;
                const item = tempCartItems[action.payload.id]
                const quantity = item.quantity;
                const totalAmount = Math.floor(item.price / (1-(item.discountPercentage/100)));
                const discountAmount = Math.floor(item.price * (item.discountPercentage/100)/ (1-(item.discountPercentage/100)));
                const finalAmount = item.price;
                state.totalAmount = state.totalAmount - quantity*totalAmount;
                state.discountAmount = state.discountAmount - quantity*discountAmount;
                state.finalAmount = state.finalAmount - quantity*finalAmount;
                delete tempCartItems[action.payload.id];
                state.cartItems = tempCartItems;
            }
        },
        increaseCartItem: (state, action) => {
            if (state.cartItems[action.payload.id]) {
                const item =state.cartItems[action.payload.id]
                const totalAmount = Math.floor(item.price / (1-(item.discountPercentage/100)));
                const discountAmount = Math.floor(item.price * (item.discountPercentage/100)/ (1-(item.discountPercentage/100)));
                const finalAmount = item.price;
                state.totalAmount = state.totalAmount + totalAmount;
                state.discountAmount = state.discountAmount + discountAmount;
                state.finalAmount = state.finalAmount + finalAmount;
                state.cartItems[action.payload.id].quantity = state.cartItems[action.payload.id].quantity + 1;
            }
        },
        decreaseCartItem: (state, action) => {
            if (state.cartItems[action.payload.id]) {
                const item =state.cartItems[action.payload.id]
                const totalAmount = Math.floor(item.price / (1-(item.discountPercentage/100)));
                const discountAmount = Math.floor(item.price * (item.discountPercentage/100)/ (1-(item.discountPercentage/100)));
                const finalAmount = item.price;
                state.totalAmount = state.totalAmount - totalAmount;
                state.discountAmount = state.discountAmount - discountAmount;
                state.finalAmount = state.finalAmount - finalAmount;
                state.cartItems[action.payload.id].quantity = state.cartItems[action.payload.id].quantity - 1;
            }
        },
    }
})

export const { addToCart, removeCartItem, increaseCartItem, decreaseCartItem } = cartSlice.actions;
export default cartSlice.reducer