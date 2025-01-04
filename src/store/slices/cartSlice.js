import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    initialState: {
        value: {
            total: 0,
            cart: []
        }
    },
    name: "cart",
    reducers: {
        addToCart: (state, action) => {
            state.value.cart.push(action.payload)
        },
    }
})

export const {addToCart, removeItemToCart} = cartSlice.actions

export default cartSlice