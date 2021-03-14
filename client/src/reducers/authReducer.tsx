import {createSlice} from "@reduxjs/toolkit"
import {fetchCurrentUser} from "../actions/index";

export const authSlice = createSlice({
  name: "authSlice",

  initialState: 
  {user: {
    id:"",
    displayName:"",
    imageUrl:"",
    followers: 0,
    profileLink:""
  },
  loading: false, 
  authError: null,
  isAuthenticated: false
  },

  reducers: {
    logoutUser: (state:any) => {
      state.isAuthenticated= false;
      localStorage.removeItem("spotifyAuthToken");
      state.user = {
        id:"",
        displayName:"",
        imageUrl: "",
        followers: 0,
        profileLink:""
      }
    }
  },

  extraReducers: {
    [fetchCurrentUser.pending.toString()]: (state:any) => {
      state.loading=true;
    },
    [fetchCurrentUser.fulfilled.toString()]: (state:any, action) => {
      let imageUrl;
      {action.payload.images.slice(0,1).map((image:any) => {
       imageUrl = image.url;
      })}
      state.user = {
                   id: action.payload.id,
                   displayName: action.payload.display_name,
                   imageUrl: imageUrl,
                   followers: action.payload.followers.total,
                   profileLink: action.payload.href,
                 };
      state.isAuthenticated=true
      state.loading=false;
      state.authError=null;
    },
    [fetchCurrentUser.rejected.toString()]: (state:any, action) => {
      state.loading=false;
      state.authError = action.payload.error;
      state.isAuthenticated=false;
    },

  }
})

export const {logoutUser} = authSlice.actions;