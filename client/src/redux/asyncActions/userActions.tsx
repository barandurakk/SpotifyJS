import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const setAboutText = createAsyncThunk(
    "SET_ABOUT_TEXT",
    async (body: string, thunkAPI) => {
        try {
            const response = await axios.post("/api/setUserAbout", { body })
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const searchUser = createAsyncThunk(
    "SEARCH_USER",
    async (keyword: string, thunkAPI) => {
        const encodedKeyword = encodeURI(keyword);
        try {
            const response = await axios.get(`/api/search/user/${encodedKeyword}`)
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const getFriendRequests = createAsyncThunk(
    "GET_REQUESTS",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/api/request/get");
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const acceptRequest = createAsyncThunk(
    "ACCEPT_REQUESTS",
    async (requestId: string, thunkAPI) => {
        try {
            const response = await axios.get(`/api/request/accept/${requestId}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const rejectRequest = createAsyncThunk(
    "DELETE_REQUESTS",
    async (requestId: string, thunkAPI) => {
        try {
            const response = await axios.get(`/api/decline/accept/${requestId}`);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)