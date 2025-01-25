import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { base_auth_url, api_key } from '../data/ApiPost';
import { showMessage } from 'react-native-flash-message';

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: base_auth_url }),
  endpoints: (builder) => ({
    sigNup: builder.mutation({
      query: (credentials) => ({
        url: `accounts:signUp?key=${api_key}`,
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (error) => {
        const { message } = error.data.error;
        const errorMap = {
          EMAIL_EXISTS: 'El correo ya está registrado.',
        };

        const errorMessage =
          errorMap[message] || 'Ocurrió un error desconocido.';

        showMessage({
          message: 'Error en el registro',
          description: errorMessage,
          type: 'danger',
          icon: 'danger',
        });

        return errorMessage;
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: `accounts:signInWithPassword?key=${api_key}`,
        method: 'POST',
        body: credentials,
      }),
      transformErrorResponse: (error) => {
        const { message } = error.data.error;
        const errorMap = {
          USER_DISABLED: 'La cuenta está deshabilitada.',
          INVALID_LOGIN_CREDENTIALS: 'Correo o contraseña incorrecto',
        };

        const errorMessage =
          errorMap[message] || 'Ocurrió un error desconocido.';

        showMessage({
          message: 'Error en el inicio de sesión',
          description: errorMessage,
          type: 'danger',
          icon: 'danger',
        });

        return errorMessage;
      },
    }),
  }),
});

export const { useLoginMutation, useSigNupMutation } = AuthApi;
