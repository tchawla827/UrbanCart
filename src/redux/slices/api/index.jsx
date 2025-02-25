import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "products/?limit=0"
        }),
        getAllCategoryProducts: builder.query({
            query: (category) => `products/${category}`
        }),
        getProductById: builder.query({
            query: (id) => `products/${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetAllCategoryProductsQuery, useGetProductByIdQuery } = productsApi