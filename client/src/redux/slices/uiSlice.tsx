import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { searchUser, getProfile } from "../asyncActions/userActions";

export const uiSlice = createSlice({
    name: "uiSlice",

    initialState:
    {
        search: {
            result: [],
            loading: false,
            error: ""
        },
        profile: {
            isFriend: false,
            loading: false,
            user: {
                id: "",
                spotifyId: "",
                displayName: "",
                imageUrl: "",
                followers: 0,
                profileLink: "",
                coverUrl: "",
                aboutText: "",
                friends: []
            },
            playlists: [],
            currentlyPlaying: {}
        }
    },

    reducers: {
        unsetResult: (state: any) => {
            state.search.result = [];
        }
    },

    extraReducers: {
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

        //get profile
        [getProfile.pending.toString()]: (state: any) => {
            state.profile.loading = true;
        },
        [getProfile.fulfilled.toString()]: (state: any, action) => {
            console.log("profile: ", action.payload)
            let profile = action.payload.user;
            state.profile.user = {
                id: profile._id,
                spotifyId: profile.spotifyId,
                displayName: profile.display_name,
                imageUrl: profile.profileImg,
                followers: profile.followers,
                profileLink: profile.profileLink,
                coverUrl: profile.coverUrl,
                aboutText: profile.aboutText
            };
            state.profile.isFriend = action.payload.friends
            state.profile.loading = false;
            state.profile.playlists = profile.spotifyDetails?.playlists ? profile.spotifyDetails.playlists : [];
            state.profile.currentlyPlaying = profile.spotifyDetails?.currentlyListen ? (
                {
                    trackType: "track",
                    trackUrl: profile.spotifyDetails.currentlyListen.external_urls.spotify,
                    trackName: profile.spotifyDetails.currentlyListen.name,
                    trackArtists: profile.spotifyDetails.currentlyListen.artists,
                    trackImg: profile.spotifyDetails.currentlyListen.album.images[0].url,
                    // progress: 0,
                    // duration: 0,
                    isPlaying: true,
                    isFriend: true
                }
            ) : {}
        },
        [getProfile.rejected.toString()]: (state: any) => {
            state.profile.loading = false;
        },
    }
})

export const { unsetResult } = uiSlice.actions;
export default uiSlice;