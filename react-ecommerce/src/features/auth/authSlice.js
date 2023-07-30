import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authApi";

const initialState = {
  registeredUser: null,
  state: "idle",
  error: {},
};

export const createUserAsync = createAsyncThunk(
  "auth/fetchUsers",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
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
      });
  },
});

export const selectRegisteredUser = (state) => state.auth.registeredUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
