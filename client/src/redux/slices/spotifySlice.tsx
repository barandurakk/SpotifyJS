import { createSlice } from "@reduxjs/toolkit";
import { getCurrentTrack, getTopDetails } from "../asyncActions/spotifyActions";

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
        },
        topTracks: {
            loading: false,
            error: "",
            trackList: [{ name: "", external_urls: { spotify: "" }, popularity: 0, image: "" }]
        }
    },

    reducers: {

    },

    extraReducers: {
        //get Current Track 
        [getCurrentTrack.pending.toString()]: (state: any) => {
            state.currentTrack.loading = true;
        },
        [getCurrentTrack.fulfilled.toString()]: (state: any, action) => {
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


        //get top tracks
        [getTopDetails.pending.toString()]: (state: any) => {
            state.topTracks.loading = true;
        },
        [getTopDetails.fulfilled.toString()]: (state: any, action) => {
            let top = action.payload;
            //set track
            if (top.type === "tracks") {
                state.topTracks.trackList = top.items.map((track: any) => (
                    {
                        name: track.name,
                    }
                ));

                //set track loading status
                state.topTracks.loading = false;
            } else if (top.type === "artists") {

            }
        },
        [getTopDetails.rejected.toString()]: (state: any, action) => {
            console.log("err");
            state.topTracks.loading = false;
            state.topTracks.error = action.payload.error;
        },
    }
})
