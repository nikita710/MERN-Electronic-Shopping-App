import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logoutUser } from "./authApi";

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
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Logout user
export const logoutUserAsync = createAsyncThunk(
  "user/logout",
  async (userId) => {
    const response = await logoutUser(userId);
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
        state.status = "idle";
        state.error = acton.payload;
      })

      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "loading";
        state.registeredUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.registeredUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
