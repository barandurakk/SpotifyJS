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
    profileLink:"",
    coverUrl: "",
    aboutText: "",
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
        profileLink:"",
        coverUrl: "",
        aboutText: "",
      }
    }
  },

  extraReducers: {
    [fetchCurrentUser.pending.toString()]: (state:any) => {
      state.loading=true;
    },
    [fetchCurrentUser.fulfilled.toString()]: (state:any, action) => {
      console.log("response", action.payload);
      state.user = {
                   id: action.payload.id,
                   displayName: action.payload.display_name,
                   imageUrl: action.payload.imageUrl,
                   followers: action.payload.followers.total,
                   profileLink: action.payload.external_urls.spotify,
                   coverUrl: action.payload.coverUrl,
                   aboutText: action.payload.aboutText
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