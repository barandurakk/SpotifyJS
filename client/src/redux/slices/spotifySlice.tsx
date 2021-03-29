import { createSlice } from "@reduxjs/toolkit";
import { getCurrentTrack, getTopDetails, getRecentTracks } from "../asyncActions/spotifyActions";

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
            trackList: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", artists: [{ id: 0, name: "", url: "" }] }],
            totalPopularity: 0
        },
        topArtists: {
            loading: false,
            error: "",
            artistList: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", followers: "" }]
        },
        recentTracks: {
            loading: false,
            error: "",
            recentList: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", artists: [{ id: 0, name: "", url: "" }] }]
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
            let top = action.payload.top;
            let totalPop = 0;


            //set track
            if (action.payload.type === "tracks") {
                state.topTracks.trackList = top.items.map((track: any) => {
                    totalPop += track.popularity;
                    return {
                        id: track.id,
                        name: track.name,
                        popularity: track.popularity,
                        url: track.external_urls.spotify,
                        artists: track.artists.map((artist: any) => ({ id: artist.id, name: artist.name, url: artist.external_urls.spotify })),
                        imageUrl: track.album.images[0].url
                    }
                });
                state.topTracks.totalPopularity = (totalPop / 20).toFixed(1);

                //set track loading status 
                state.topTracks.loading = false;
            } else if (action.payload.type === "artists") {
                state.topArtists.artistList = top.items.map((artist: any) => (
                    {
                        id: artist.id,
                        name: artist.name,
                        popularity: artist.popularity,
                        url: artist.external_urls.spotify,
                        followers: artist.followers.total,
                        imageUrl: artist.images[0].url
                    }
                ));
                //set artist loading status 
                state.topArtists.loading = false;
            }
        },
        [getTopDetails.rejected.toString()]: (state: any, action) => {
            console.log("err");
            state.recentTracks.loading = false;
            state.recentTracks.error = action.payload.error;
        },


        //get recent tracks
        [getRecentTracks.pending.toString()]: (state: any) => {
            state.recentTracks.loading = true;
        },
        [getRecentTracks.fulfilled.toString()]: (state: any, action) => {
            let recents = action.payload.items;

            state.recentTracks.recentList = recents.map((item: any) => (
                {
                    id: item.track.id,
                    name: item.track.name,
                    popularity: item.track.popularity,
                    url: item.track.external_urls.spotify,
                    artists: item.track.artists.map((artist: any) => ({ id: artist.id, name: artist.name, url: artist.external_urls.spotify })),
                    imageUrl: item.track.album.images[0].url
                }
            ));
            state.recentTracks.loading = false;

        },
        [getRecentTracks.rejected.toString()]: (state: any, action) => {
            console.log("err");
            state.recentTracks.loading = false;
            state.recentTracks.error = action.payload.error;
        },
    }
})
