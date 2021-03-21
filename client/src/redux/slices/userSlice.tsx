import {createSlice} from "@reduxjs/toolkit";
//import {logoutUser} from "./authSlice";

export const userSlice = createSlice({
  name: "userSlice",

  initialState: 
  {user: {
    id:"",
    displayName:"",
    imageUrl:"",
    followers: 0,
    profileLink:"",
    coverUrl: "",
    aboutText: "",
  }
  },

  reducers: {
    setUser:(state:any, action)=>{
      console.log("user set: ", action.payload);
        state.user = {
            id: action.payload.id,
            displayName: action.payload.display_name,
            imageUrl: action.payload.imageUrl,
            followers: action.payload.followers.total,
            profileLink: action.payload.external_urls.spotify,
            coverUrl: action.payload.coverUrl,
            aboutText: action.payload.aboutText
          };
    },
    unsetUser:(state:any)=>{
      console.log("user unset");
        state.user = {
          id:"",
          displayName:"",
          imageUrl:"",
          followers: 0,
          profileLink:"",
          coverUrl: "",
          aboutText: "",
          };
    }
  },

  extraReducers: () => {
   
   }
})

export const {setUser, unsetUser} = userSlice.actions;