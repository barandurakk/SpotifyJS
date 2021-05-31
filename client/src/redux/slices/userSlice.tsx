import { createSlice } from "@reduxjs/toolkit";
import { setAboutText, getFriendRequests, getFriends, getCurrentUser } from "../asyncActions/userActions";

export const userSlice = createSlice({
  name: "userSlice",

  initialState:
  {
    user: {
      id: "",
      displayName: "",
      imageUrl: "",
      followers: 0,
      profileLink: "",
      coverUrl: "",
      aboutText: "",
      friends: []
    },
    requests: {
      loading: false,
      list: [],
      error: ""
    },
    friends: {
      loading: false,
      list: [],
      error: ""
    },
    aboutTextLoading: false
  },

  reducers: {
    setUser: (state: any, action) => {
      state.user = {
        id: action.payload._id,
        displayName: action.payload.display_name,
        imageUrl: action.payload.profileImg,
        followers: action.payload.followers,
        profileLink: action.payload.profileLink,
        coverUrl: action.payload.coverUrl,
        aboutText: action.payload.aboutText
      };
    },
    unsetUser: (state: any) => {
      state.user = {
        id: "",
        displayName: "",
        imageUrl: "",
        followers: 0,
        profileLink: "",
        coverUrl: "",
        aboutText: "",
      };
    }
  },

  extraReducers: {
    //set user
    [getCurrentUser.fulfilled.toString()]: (state: any, action) => {
      state.user = {
        id: action.payload._id,
        displayName: action.payload.display_name,
        imageUrl: action.payload.profileImg,
        followers: action.payload.followers,
        profileLink: action.payload.profileLink,
        coverUrl: action.payload.coverUrl,
        aboutText: action.payload.aboutText
      };

    },

    //setaboutText
    [setAboutText.pending.toString()]: (state: any) => {
      state.aboutTextLoading = true;
    },
    [setAboutText.fulfilled.toString()]: (state: any, action) => {
      state.user.aboutText = action.payload.aboutText;
      state.aboutTextLoading = false;
    },
    [setAboutText.rejected.toString()]: (state: any) => {
      state.aboutTextLoading = false;
    },

    //getRequests
    [getFriendRequests.pending.toString()]: (state: any) => {
      state.requests.loading = true;
    },
    [getFriendRequests.fulfilled.toString()]: (state: any, action) => {
      state.requests.list = action.payload;
      state.requests.loading = false;
    },
    [getFriendRequests.rejected.toString()]: (state: any) => {
      state.requests.loading = false;
    },

    //getFriends
    [getFriends.pending.toString()]: (state: any) => {
      state.friends.loading = true;
    },
    [getFriends.fulfilled.toString()]: (state: any, action) => {
      state.friends.list = action.payload;
      state.friends.loading = false;
    },
    [getFriends.rejected.toString()]: (state: any) => {
      state.friends.loading = false;
    },
  }
})

export const { setUser, unsetUser } = userSlice.actions;