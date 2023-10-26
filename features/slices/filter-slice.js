import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    inputValue1: '',
    inputValue2: '',
  },
  reducers: {
    setInputValue1: (state, action) => {
      state.inputValue1 = action.payload;
    },
    setInputValue2: (state, action) => {
      state.inputValue2 = action.payload;
    },
  },
});

export const { setInputValue1, setInputValue2 } = filterSlice.actions;

export default filterSlice.reducer;