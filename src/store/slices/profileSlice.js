import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    image: null,
  },
  reducers: {
    changeImage: (state, action) => {
    state.image = action.payload; 
    },
},
});

export const { changeImage} = profileSlice.actions;

export default profileSlice;
