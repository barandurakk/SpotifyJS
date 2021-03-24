import { createSlice } from "@reduxjs/toolkit";
import { getCurrentTrack } from "../asyncActions/spotifyActions";

export const spotifySlice = createSlice({
    name: "spotifySlice",

    initialState: {
        currentTrack: {
            trackType: "",
            trackUrl: "",
            trackName: "",
            trackArtists: [{ name: "", external_urls: { spotify: "" } }],
            trackImg: "",
            progress: 0,
            duration: 0,
            isPlaying: false,
            loading: false,
            error: ""
        }
    },

    reducers: {

    },

    extraReducers: {
        //setaboutText
        [getCurrentTrack.pending.toString()]: (state: any) => {
            state.currentTrack.loading = true;
        },
        [getCurrentTrack.fulfilled.toString()]: (state: any, action) => {
            console.log("currentTrack: ", action.payload);
            let player = action.payload;
            //set track
            if (player.currently_playing_type === "track") {
                state.currentTrack.trackType = player.currently_playing_type;
                state.currentTrack.trackUrl = player.item.external_urls.spotify;
                state.currentTrack.trackName = player.item.name;
                state.currentTrack.trackArtists = player.item.artists;
                state.currentTrack.trackImg = player.item.album.images[0].url;
                state.currentTrack.progress = player.progress_ms;
                state.currentTrack.duration = player.item.duration_ms;
                state.currentTrack.isPlaying = player.is_playing;
            }
            //set track loading status
            state.currentTrack.loading = false;
        },
        [getCurrentTrack.rejected.toString()]: (state: any, action) => {
            console.log("err");
            state.currentTrack.loading = false;
            state.currentTrack.error = action.payload.error;
        },
    }
})
