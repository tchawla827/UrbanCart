import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    initialState: {
        products: []
    },
    name: 'product',
    reducers: {
        addProducts: (state, action) => {
            console.log("addProducts working")
            state.products = action.payload;
        },
        addCategoryProducts: (state, action) => {
            if (action.payload.isFirst) {
                // const tempArray = state.products.filter((x) => x.category !== action.payload);
                state.products = action.payload.data;
            }
            else {
                state.products = [...action.payload.data, ...state.products];
            }
        },
        removeCategoryProducts: (state, action) => {
            const tempArray = state.products.filter((x) => x.category !== action.payload);
            state.products = tempArray
        },
        sortByLowToHigh: (state) => {
            state.products.sort((a, b) => a.price - b.price);
        },
        sortByHighToLow: (state) => {
            state.products.sort((a, b) => b.price - a.price);
        },
        sortByRating: (state) => {
            state.products.sort((a, b) => b.rating - a.rating);
        }

    }
})

export const {
    addProducts,
    addCategoryProducts,
    removeCategoryProducts,
    sortByLowToHigh,
    sortByHighToLow,
    sortByRating
} = productSlice.actions;
export default productSlice.reducer