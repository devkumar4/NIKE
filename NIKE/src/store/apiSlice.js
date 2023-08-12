import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.1.4:9000/';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => 'products',
        }),
        getProduct: builder.query({
            query: (id) => `products/${id}`,
        }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: 'orders',
                method: 'POST',
                body: newOrder
            })
        }),
        getOrder: builder.query({
            query: (ref) => `orders/${ref}`,
        }),
        createPaymentIntent: builder.mutation({
            query: (data) => ({
                url: "payments/intents",
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useGetProductQuery,
    useGetProductsQuery,
    useCreateOrderMutation,
    useGetOrderQuery,
    useCreatePaymentIntentMutation

} = apiSlice;