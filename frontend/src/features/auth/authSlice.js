// // src/features/auth/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../api/axiosInstance";

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       // ✅ Now using POST instead of JSON-server GET
//       const response = await axiosInstance.post("/auth/login", {
//         username,
//         password,
//       });

//       const user = response.data; // backend should return user + maybe token
//       localStorage.setItem("user", JSON.stringify(user));

//       return user;
//     } catch (error) {
//       // If backend sends a message, show that; else fallback
//       const message =
//         error.response?.data?.message || "Login failed. Please try again.";
//       return rejectWithValue(message);
//     }
//   }
// );

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   loading: true, // prevents flicker on reload
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loadUserFromStorage: (state) => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         state.user = JSON.parse(storedUser);
//         state.isAuthenticated = true;
//       }
//       state.loading = false;
//     },
//     logout: (state) => {
//       localStorage.removeItem("user");
//       state.user = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { loadUserFromStorage, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// existing login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      return rejectWithValue(message);
    }
  }
);

// NEW: registerUser thunk (used by Step1)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      // posts to /api/auth/kyc
      const response = await axiosInstance.post("/auth/kyc", formData);
      // backend returns created user (or a response object)
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
        state.isAuthenticated = true;
      }
      state.loading = false;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // backend could return { message, user } or user directly
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadUserFromStorage, logout, } = authSlice.actions;
export default authSlice.reducer;
