import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllOrdersByUserId } from "./userApi";

const initialState = {
  state: "idle",
  userOrders: [],
};

export const fetchAllOrdersByUserIdAsync = createAsyncThunk(
  "user/userOrders",
  async (userId) => {
    const response = await fetchAllOrdersByUserId(userId);
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
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
