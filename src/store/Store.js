import { configureStore } from '@reduxjs/toolkit';
import { ApiMyShop } from '../services/ApiMyShop';
import cartSlice from './slices/cartSlice';
import { AuthApi } from '../services/AuthApi';

const Store = configureStore({
  reducer: {
    [ApiMyShop.reducerPath]: ApiMyShop.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    cartSlice: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiMyShop.middleware, AuthApi.middleware),
});

export default Store;
