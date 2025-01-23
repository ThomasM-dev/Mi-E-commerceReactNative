import { api_firebase } from '../data/ApiPost';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const userCartApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: api_firebase,
  }),
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: ({ localId, cartData }) => ({
        url: `${localId}/cart.json`,
        method: 'POST',
        body: cartData,
      }),
    }),
    getCart: builder.query({
      query: (localId) => ({
        url: `${localId}/cart.json`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddCartMutation, useGetCartQuery } = userCartApi;
