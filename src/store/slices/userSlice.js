import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    idToken: '',
    localId: '',
  },
  reducers: {
    setUser: (state, actions) => {
      state.email = actions.payload.email;
      state.idToken = actions.payload.idToken;
      state.localId = actions.payload.localId;
    },
    clearUser: (state) => {
      state.email = '';
      state.idToken = '';
      state.localId = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
