import { createSlice } from "@reduxjs/toolkit";
import { setAboutText } from "../asyncActions/userActions";

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
  }
})

export const { setUser, unsetUser } = userSlice.actions;