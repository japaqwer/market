'use client'
import { configureStore } from "@reduxjs/toolkit";
import categoryRoutesSlice from "./slices/categoryRoutesSlice";
import filterReducer from "./slices/filter-slice";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cart-slice";


export const store = configureStore({
    reducer: {
      routes: categoryRoutesSlice,
      filter: filterReducer,
      user: userSlice,
      cart: cartSlice,
    }
})