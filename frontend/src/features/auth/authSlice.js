import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // fetch all users
      const response = await axiosInstance.get("/users");
      const users = response.data;

      // check if user exists
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        return rejectWithValue("Invalid username or password");
      }

      return { user }; // success
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        state.user = JSON.parse(savedUser);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
