import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    cart: [],
    total: 0,
    updateAt: null,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (
        state.value.cart.find(
          (product) => product.title === action.payload.title
        )
      ) {
        alert('Producto ya existente');
      } else {
        state.value.cart.push(action.payload);
        state.value.total += action.payload.productxCount;
        state.value.updateAt = Date.now().toLocaleString();
      }
    },
    removeItemToCart: (state, action) => {
      state.value.total -= action.payload.productxCount;
      state.value.cart = state.value.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.value.updateAt = Date.now().toLocaleString();
    },
    clearCart: (state) => {
      state.value.cart = [];
      state.value.total = 0;
      state.value.updateAt = Date.now().toLocaleString();
    },
  },
});

export const { addToCart, removeItemToCart, clearCart } = cartSlice.actions;

export default cartSlice;
