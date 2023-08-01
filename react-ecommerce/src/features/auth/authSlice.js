import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, updateUser } from "./authApi";

const initialState = {
  registeredUser: null,
  state: "idle",
  error: null,
};

// Create a new user
export const createUserAsync = createAsyncThunk(
  "auth/fetchUsers",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

// Login user
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);

//Update user
export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (user) => {
    const response = await updateUser(user);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.registeredUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkUserAsync.fulfilled, (state, acton) => {
        state.status = "idle";
        state.registeredUser = acton.payload;
      })
      .addCase(checkUserAsync.rejected, (state, acton) => {
        state.status = "error";
        state.error = acton.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, acton) => {
        state.status = "idle";
        state.registeredUser = acton.payload;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.registeredUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
