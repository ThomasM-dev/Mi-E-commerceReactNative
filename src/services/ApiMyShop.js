import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiMyShop = createApi({
  reducerPath: "ApiMyShop",  
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ecommerce-react-native-feffd-default-rtdb.firebaseio.com/",  
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "products.json", 
    }),
    getProductsByCategory: builder.query({
        query: (categoryText) => `products.json?orderBy="category"&equalTo="${categoryText}"`,
    }),
  }),
});

export const { useGetCategoryQuery, useGetProductsByCategoryQuery } = ApiMyShop;
