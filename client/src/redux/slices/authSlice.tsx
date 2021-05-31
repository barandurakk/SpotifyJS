import { createSlice } from "@reduxjs/toolkit"
import { logout } from "../asyncActions/authActions";
import axios from "axios";
import { getLocalToken } from "../../util/getLocalToken";

export const authSlice = createSlice({
  name: "authSlice",

  initialState:
  {
    loading: false,
    authError: null,
    isAuthenticated: false
  },

  reducers: {
    setAuthenticated: (state: any) => {
      state.isAuthenticated = true;
    },
  },

  extraReducers: {
    //login
    // [login.pending.toString()]: (state: any) => {
    //   state.loading = true;

    // },
    // [login.fulfilled.toString()]: (state: any) => {
    //   state.isAuthenticated = true
    //   state.loading = false;
    //   state.authError = null;
    // },
    // [login.rejected.toString()]: (state: any, action) => {

    //   state.loading = false;
    //   state.authError = action.error.error;
    //   state.isAuthenticated = false;
    // },

    //logout
    [logout.pending.toString()]: (state: any) => {
      state.loading = true;
    },
    [logout.fulfilled.toString()]: (state: any) => {
      state.isAuthenticated = false;
      localStorage.removeItem("spotifyAuthToken");
      axios.defaults.headers.common['Authorization'] = null;
      state.loading = false;
    },
  }
})

export const { setAuthenticated } = authSlice.actions;
export default authSlice;
