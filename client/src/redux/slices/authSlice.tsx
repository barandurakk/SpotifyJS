import { createSlice } from "@reduxjs/toolkit"
import { login, logout } from "../asyncActions/authActions";
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

  },

  extraReducers: {
    //login
    [login.pending.toString()]: (state: any) => {
      state.loading = true;
    },
    [login.fulfilled.toString()]: (state: any) => {
      axios.defaults.headers.common['Authorization'] = getLocalToken();
      state.isAuthenticated = true
      state.loading = false;
      state.authError = null;
    },
    [login.rejected.toString()]: (state: any, action) => {
      console.log(action.payload);
      state.loading = false;
      state.authError = action.payload.error;
      state.isAuthenticated = false;
    },

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

export default authSlice;