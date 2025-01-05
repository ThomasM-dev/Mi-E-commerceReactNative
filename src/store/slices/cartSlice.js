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
            if (state.value.cart.find(product => product.id === action.payload.id)) {
                alert("Producto ya existente")
            }
            else {
                state.value.cart.push(action.payload)
                state.value.total += action.payload.productxCount 
            }            
        },
        
    }
})

export const {addToCart, removeItemToCart} = cartSlice.actions

export default cartSlice