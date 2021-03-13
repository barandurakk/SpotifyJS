import {createSlice} from "@reduxjs/toolkit"
import {fetchCurrentUser} from "../actions/index";

export const userDataSlice = createSlice({
  name: "userData",

  initialState: 
  {user: {
    id:"",
    displayName:"",
    images:[{url:""}],
    followers: 0,
    profileLink:""
  },
  loading: false, 
  authError: null
  },

  reducers: {

  },

  extraReducers: {

    [fetchCurrentUser.pending.toString()]: (state:any) => {
      state.loading=true;
    },
    [fetchCurrentUser.fulfilled.toString()]: (state:any, action) => {
      state.user = {
                   id: action.payload.id,
                   displayName: action.payload.display_name,
                   images: action.payload.images,
                   followers: action.payload.followers.total,
                   profileLink: action.payload.href,
                 };
      state.loading=false;
      state.authError=null;
    },
    [fetchCurrentUser.rejected.toString()]: (state:any, action) => {
      state.loading=false;
      console.log(action);
      state.authError = action.payload.error;
    },

  }
})