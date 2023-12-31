import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllOrdersByUserId,
  fetchLoggedInUser,
  updateUser,
} from "./userApi";

const initialState = {
  state: "idle",
  userOrders: [],
  userInfo: null,
};

export const fetchAllOrdersByUserIdAsync = createAsyncThunk(
  "user/userOrders",
  async (userId) => {
    const response = await fetchAllOrdersByUserId(userId);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
