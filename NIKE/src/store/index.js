import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './ProductSlice'
import { cartSlice } from './CartSlice'
import { apiSlice } from './apiSlice'

export const Store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        api: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

