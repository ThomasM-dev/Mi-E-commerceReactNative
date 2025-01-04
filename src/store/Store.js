
import { configureStore } from "@reduxjs/toolkit";
import { ApiMyShop } from "../services/ApiMyShop";
import cartSlice from "./slices/cartSlice";

const Store = configureStore({
    reducer: {
        [ApiMyShop.reducerPath]: ApiMyShop.reducer,
        cartSlice: cartSlice.reducer
},
middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiMyShop.middleware), 
});

export default Store