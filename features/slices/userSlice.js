import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.user = action.payload;
      console.log(state.user);
    },
    removeUser: (state,action) => {
      state.user = {};
      sessionStorage.removeItem('user')
    }
  }
})
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;