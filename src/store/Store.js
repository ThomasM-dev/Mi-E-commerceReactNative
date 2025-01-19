import { configureStore } from '@reduxjs/toolkit';
import { ApiMyShop } from '../services/ApiMyShop';
import cartSlice from './slices/cartSlice';
import { AuthApi } from '../services/AuthApi';
import userSlice from "./slices/userSlice"
import profileSlice from './slices/profileSlice';

const Store = configureStore({
  reducer: {
    [ApiMyShop.reducerPath]: ApiMyShop.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    cartSlice: cartSlice.reducer,
    user: userSlice,
    profile: profileSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiMyShop.middleware, AuthApi.middleware),
});

export default Store;
