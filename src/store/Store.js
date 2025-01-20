import { configureStore } from '@reduxjs/toolkit';
import { ApiMyShop } from '../services/ApiMyShop';
import cartSlice from './slices/cartSlice';
import { AuthApi } from '../services/AuthApi';
import userSlice from './slices/userSlice';
import profileSlice from './slices/profileSlice';
import addressSlice from './slices/addressSlice';

const Store = configureStore({
  reducer: {
    [ApiMyShop.reducerPath]: ApiMyShop.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    cartSlice: cartSlice.reducer,
    user: userSlice,
    profile: profileSlice.reducer,
    addressUser: addressSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiMyShop.middleware, AuthApi.middleware),
});

export default Store;
