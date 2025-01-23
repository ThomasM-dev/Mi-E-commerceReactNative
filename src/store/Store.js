import { configureStore } from '@reduxjs/toolkit';
import { ApiMyShop } from '../services/ApiMyShop';
import cartSlice from './slices/cartSlice';
import { AuthApi } from '../services/AuthApi';
import userSlice from './slices/userSlice';
import { userCartApi } from '../services/userCartApi';

const Store = configureStore({
  reducer: {
    [ApiMyShop.reducerPath]: ApiMyShop.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [userCartApi.reducerPath]: userCartApi.reducer,
    cart: cartSlice.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApiMyShop.middleware,
      AuthApi.middleware,
      userCartApi.middleware
    ),
});

export default Store;
