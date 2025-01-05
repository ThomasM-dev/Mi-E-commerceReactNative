import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  initialState: {
    value: {
      updateAt: Date.now().toLocaleString(),
      total: 0,
      cart: [],
    },
  },
  name: 'cart',
  reducers: {
    addToCart: (state, action) => {
      if (
        state.value.cart.find((product) => product.id === action.payload.id)
      ) {
        alert('Producto ya existente');
      } else {
        state.value.cart.push(action.payload);
        state.value.total += action.payload.productxCount;
        state.value.updateAt = Date.now().toLocaleString()
      }
    },
    removeItemToCart: (state, action) => {
      state.value.total -= action.payload.productxCount;
      state.value.cart = state.value.cart.filter(
        (product) => product.id !== action.payload.id
      );
      state.value.updateAt = Date.now().toLocaleString()
    },
  },
});

export const { addToCart, removeItemToCart } = cartSlice.actions;

export default cartSlice;
