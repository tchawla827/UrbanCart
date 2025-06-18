import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {},
  totalAmount: 0,
  discountAmount: 0,
  finalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.cartItems[item.id] = {
        ...item.data,
        quantity: item.quantity,
        totalAmount: item.totalAmount,
        discountAmount: item.discountAmount,
        finalAmount: item.finalAmount,
      };
      state.totalAmount += Math.floor(item.totalAmount);
      state.discountAmount += Math.floor(item.discountAmount);
      state.finalAmount += Math.floor(item.finalAmount);
    },
    removeCartItem: (state, action) => {
      const item = state.cartItems[action.payload.id];
      if (item) {
        const quantity = item.quantity;
        const totalAmount = Math.floor(item.totalAmount);
        const discountAmount = Math.floor(item.discountAmount);
        const finalAmount = Math.floor(item.finalAmount / quantity);
        state.totalAmount -= quantity * totalAmount;
        state.discountAmount -= quantity * discountAmount;
        state.finalAmount -= quantity * finalAmount;
        delete state.cartItems[action.payload.id];
      }
    },
    increaseCartItem: (state, action) => {
      const item = state.cartItems[action.payload.id];
      if (item) {
        item.quantity += 1;
        item.finalAmount = item.quantity * (item.totalAmount - item.discountAmount);
        state.totalAmount += Math.floor(item.totalAmount);
        state.discountAmount += Math.floor(item.discountAmount);
        state.finalAmount += Math.floor(item.totalAmount - item.discountAmount);
      }
    },
    decreaseCartItem: (state, action) => {
      const item = state.cartItems[action.payload.id];
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.finalAmount = item.quantity * (item.totalAmount - item.discountAmount);
        state.totalAmount -= Math.floor(item.totalAmount);
        state.discountAmount -= Math.floor(item.discountAmount);
        state.finalAmount -= Math.floor(item.totalAmount - item.discountAmount);
      }
    },
  },
});

export const { addToCart, removeCartItem, increaseCartItem, decreaseCartItem } = cartSlice.actions;
export default cartSlice.reducer
