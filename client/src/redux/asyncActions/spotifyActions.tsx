import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentTrack = createAsyncThunk(
    "GET_CURRENT_TRACK",
    async (_, thunkAPI) => {
        //console.log(i);
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