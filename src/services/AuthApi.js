import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_auth_url, api_key } from '../data/ApiPost';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_auth_url }),
  endpoints: (builder) => ({
    sigNup: builder.mutation({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSigNupMutation } = AuthApi;
