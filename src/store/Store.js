
import { configureStore } from "@reduxjs/toolkit";
import { ApiMyShop } from "../services/ApiMyShop";

const Store = configureStore({
    reducer: {
        [ApiMyShop.reducerPath]: ApiMyShop.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiMyShop.middleware), 
});

export default Store