// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Создаем asyncThunk для выполнения GET-запроса с передачей URL
export const fetchCartData = createAsyncThunk('cart/fetchData', async (url, headers) => {
  const response = await fetch(url, headers);
  const data = await response.json();
  return data;
});

export const addToCart = createAsyncThunk('cart/addItem', async ({ url, item }) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
});

export const removeFromCart = createAsyncThunk('cart/removeItem', async (url, headersForFetch) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: headersForFetch
  });
  const data = await response.json();
  return data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // Добавьте обработку для addToCart и removeFromCart, если это необходимо
  },
});

export default cartSlice.reducer;
