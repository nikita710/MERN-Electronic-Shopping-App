import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCart,
  fetchItemsByUserId,
  resetCart,
  updateCart,
} from "./CartApi";

const initialState = {
  state: "idle",
  items: [],
};

// Add item in cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (cartItem) => {
    const response = await addToCart(cartItem);
    return response.data;
  }
);

// Fetch Items By User
export const fetchItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUser",
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

// Update Cart
export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

// Delete a cart
export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async (cartId) => {
    const response = await deleteCart(cartId);
    return response.data;
  }
);

// Reset Cart
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (cartId) => {
    const response = await resetCart(cartId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
