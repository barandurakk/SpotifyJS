import {createSlice} from "@reduxjs/toolkit"
import {login} from "../asyncActions/index";

export const authSlice = createSlice({
  name: "authSlice",

  initialState: 
  {
  loading: false, 
  authError: null,
  isAuthenticated: false
  },

  reducers: {
    logoutUser: (state:any) => {
      state.isAuthenticated= false;
      localStorage.removeItem("spotifyAuthToken");
    }
  },

  extraReducers: {
    [login.pending.toString()]: (state:any) => {
      state.loading=true;
    },
    [login.fulfilled.toString()]: (state:any) => {
      console.log("login Fullfilled!");
      state.isAuthenticated=true
      state.loading=false;
      state.authError=null;
    },
    [login.rejected.toString()]: (state:any, action) => {
      state.loading=false;
      state.authError = action.payload.error;
      state.isAuthenticated=false;
    },

  }
})

export const {logoutUser} = authSlice.actions;