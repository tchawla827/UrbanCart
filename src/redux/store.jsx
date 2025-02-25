import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/products'
import cartSlice from './slices/cart'
import { productsApi } from './slices/api'
import { setupListeners } from '@reduxjs/toolkit/query'
import userSlice from './slices/user'

export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice,
        user: userSlice,
        [productsApi.reducerPath]: productsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
})

setupListeners(store.dispatch)