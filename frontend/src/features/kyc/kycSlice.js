// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../api/axiosInstance";

// export const saveKyc = createAsyncThunk(
//   "kyc/saveKyc",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/kyc/basic-detail", payload);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// export const fetchKycData = createAsyncThunk(
//   "kyc/fetchKycData",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get(`/kyc/basic-detail/${userId}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// const kycSlice = createSlice({
//   name: "kyc",
//   initialState: {
//     loading: false,
//     error: null,
//     kyc: null,
//     basicDetails: null,
//     currentSelectedPanel: 1,
//   },
//   reducers: {
//     resetBasicDetails: (state) => {
//       state.basicDetails = null;
//     },
//     handleChangeCurrentPanel: (state, action) => {
//       state.currentSelectedPanel = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(saveKyc.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(saveKyc.fulfilled, (state, action) => {
//         state.loading = false;
//         state.kyc = action.payload.kyc;
//         state.basicDetails = action.payload.kyc;
//       })
//       .addCase(saveKyc.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchKycData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchKycData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.basicDetails = action.payload.basicDetail;
//       })
//       .addCase(fetchKycData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetBasicDetails, handleChangeCurrentPanel } = kycSlice.actions;

// export default kycSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { logout } from "../auth/authSlice";

export const saveKyc = createAsyncThunk(
  "kyc/saveKyc",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/kyc/basic-detail", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchKycData = createAsyncThunk(
  "kyc/fetchKycData",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/kyc/basic-detail/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const kycSlice = createSlice({
  name: "kyc",
  initialState: {
    loading: false,
    error: null,
    kyc: null,
    basicDetails: null,
    currentSelectedPanel: 1,
  },
  reducers: {
    resetBasicDetails: (state) => {
      state.basicDetails = null;
    },
    handleChangeCurrentPanel: (state, action) => {
      state.currentSelectedPanel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveKyc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveKyc.fulfilled, (state, action) => {
        state.loading = false;
        state.kyc = action.payload.kyc;
        state.basicDetails = action.payload.kyc;
      })
      .addCase(saveKyc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchKycData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKycData.fulfilled, (state, action) => {
        state.loading = false;
        state.basicDetails = action.payload.basicDetail;
      })
      .addCase(fetchKycData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // clear KYC on logout
      .addCase(logout, (state) => {
        state.basicDetails = null;
        state.kyc = null;
        state.currentSelectedPanel = 1;
      });
  },
});

export const { resetBasicDetails, handleChangeCurrentPanel } = kycSlice.actions;
export default kycSlice.reducer;
