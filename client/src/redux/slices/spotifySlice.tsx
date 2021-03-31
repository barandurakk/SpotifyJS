import { createSlice } from "@reduxjs/toolkit";
import { getCurrentTrack, getTopDetails, getRecentTracks, getUsersPlaylist } from "../asyncActions/spotifyActions";

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
            trackList: {
                short_term: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", artists: [{ id: 0, name: "", url: "" }] }],
                medium_term: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", artists: [{ id: 0, name: "", url: "" }] }],
                long_term: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", artists: [{ id: 0, name: "", url: "" }] }],
            },
            totalPopularity: 0
        },
        topArtists: {
            loading: false,
            error: "",
            artistList: {
                short_term: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", followers: "" }],
                medium_term: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", followers: "" }],
                long_term: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", followers: "" }]
            }
        },
        recentTracks: {
            loading: false,
            error: "",
            recentList: [{ id: 0, name: "", url: "", popularity: 0, imageUrl: "", artists: [{ id: 0, name: "", url: "" }] }]
        },
        playlists: {
            loading: false,
            error: "",
            playlistList: [{ id: 0, name: "", url: "", totalTrack: 0, imageUrl: "", description: "" }]
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
            state.topArtists.loading = true;
        },
        [getTopDetails.fulfilled.toString()]: (state: any, action) => {

            let top = action.payload.top;
            let shortTerm = top.short;
            let mediumTerm = top.medium;
            let longTerm = top.long;
            let totalPop = 0;


            //set track
            if (action.payload.type === "tracks") {
                state.topTracks.trackList.short_term = shortTerm.items.map((track: any) => {
                    return {
                        id: track.id,
                        name: track.name,
                        popularity: track.popularity,
                        url: track.external_urls.spotify,
                        artists: track.artists.map((artist: any) => ({ id: artist.id, name: artist.name, url: artist.external_urls.spotify })),
                        imageUrl: track.album.images[0].url
                    }
                });

                state.topTracks.trackList.medium_term = mediumTerm.items.map((track: any) => {
                    return {
                        id: track.id,
                        name: track.name,
                        popularity: track.popularity,
                        url: track.external_urls.spotify,
                        artists: track.artists.map((artist: any) => ({ id: artist.id, name: artist.name, url: artist.external_urls.spotify })),
                        imageUrl: track.album.images[0].url
                    }
                });

                state.topTracks.trackList.long_term = longTerm.items.map((track: any) => {
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


            } else if (action.payload.type === "artists") {

                state.topArtists.artistList.short_term = shortTerm.items.map((artist: any) => (
                    {
                        id: artist.id,
                        name: artist.name,
                        popularity: artist.popularity,
                        url: artist.external_urls.spotify,
                        followers: artist.followers.total,
                        imageUrl: artist.images[0].url
                    }
                ));

                state.topArtists.artistList.medium_term = mediumTerm.items.map((artist: any) => (
                    {
                        id: artist.id,
                        name: artist.name,
                        popularity: artist.popularity,
                        url: artist.external_urls.spotify,
                        followers: artist.followers.total,
                        imageUrl: artist.images[0].url
                    }
                ));

                state.topArtists.artistList.long_term = longTerm.items.map((artist: any) => (
                    {
                        id: artist.id,
                        name: artist.name,
                        popularity: artist.popularity,
                        url: artist.external_urls.spotify,
                        followers: artist.followers.total,
                        imageUrl: artist.images[0].url
                    }
                ));


            }
            //set loading status 
            state.topArtists.loading = false;
            state.topTracks.loading = false;
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

        //get users playlists
        [getUsersPlaylist.pending.toString()]: (state: any) => {
            state.playlists.loading = true;
        },
        [getUsersPlaylist.fulfilled.toString()]: (state: any, action) => {
            let playlists = action.payload.items;

            state.playlists.playlistList = playlists.map((item: any) => (
                {
                    id: item.id,
                    name: item.name,
                    totalTrack: item.tracks.total,
                    url: item.external_urls.spotify,
                    description: item.description,
                    imageUrl: item.images[0].url
                }
            ));
            state.playlists.loading = false;

        },
        [getUsersPlaylist.rejected.toString()]: (state: any, action) => {
            state.playlists.loading = false;
            state.playlists.error = action.payload.error;
        },
    }
})
