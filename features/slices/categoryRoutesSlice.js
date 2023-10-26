import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryRotes: [],
};

const categoryRoutesSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        setCategoryRoutes: (state, action) => {
            state.categoryRotes = action.payload;
        },
    },
});

export const { setCategoryRoutes } = categoryRoutesSlice.actions;

export default categoryRoutesSlice.reducer;
