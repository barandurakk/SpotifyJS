import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentTrack = createAsyncThunk(
    "GET_CURRENT_TRACK",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/api/getCurrentTrack");
            if (response) {
                return response.data.currentTrack;
            }

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const playCurrentTrack = createAsyncThunk(
    "PLAY_CURRENT_TRACK",
    async (_, thunkAPI) => {
        try {
            await axios.get("/api/playTrack");

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const stopCurrentTrack = createAsyncThunk(
    "PLAY_CURRENT_TRACK",
    async (_, thunkAPI) => {
        try {
            await axios.get("/api/stopTrack");

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getTopDetails = createAsyncThunk(
    "GET_TOP_DETAILS",
    async (type: string, thunkAPI) => {
        try {
            const response = await axios.post("/api/getUsersTop", { type });
            if (response) {
                const res = { ...response.data, type }
                return res;
            }

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getRecentTracks = createAsyncThunk(
    "GET_RECENT_TRACKS",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/api/getRecentTracks");
            if (response) {

                const res = response.data
                return res;
            }

        } catch (err) {

            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)