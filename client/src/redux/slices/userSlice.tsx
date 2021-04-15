import { createSlice } from "@reduxjs/toolkit";
import Search from "../../components/Search/Search";
import { setAboutText, searchUser, getFriendRequests } from "../asyncActions/userActions";

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
    search: {
      result: [],
      loading: false,
      error: ""
    },
    aboutTextLoading: false
  },

  reducers: {
    setUser: (state: any, action) => {
      state.user = {
        id: action.payload.id,
        displayName: action.payload.display_name,
        imageUrl: action.payload.profileImg,
        followers: action.payload.followers.total,
        profileLink: action.payload.external_urls.spotify,
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
    },
    unsetResult: (state: any) => {
      state.search.result = [];
    }
  },

  extraReducers: {
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

    //search User
    [searchUser.pending.toString()]: (state: any) => {
      state.search.loading = true;
    },
    [searchUser.fulfilled.toString()]: (state: any, action) => {
      state.search.result = action.payload;
      state.search.loading = false;
    },
    [searchUser.rejected.toString()]: (state: any) => {
      state.search.loading = false;
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
  }
})

export const { setUser, unsetUser, unsetResult } = userSlice.actions;