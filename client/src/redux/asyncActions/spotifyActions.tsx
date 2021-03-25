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
            const res = await axios.get("/api/playTrack");
            console.log(res);

        } catch (err) {
            console.log(err);
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
                console.log(response.data);
                const res = { ...response.data, type }
                return res;
            }

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)