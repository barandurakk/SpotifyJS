
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TokenType } from "../../util/getLocalToken";
import { setUser, unsetUser } from "../slices/userSlice";

import axios from "axios";

export const login = createAsyncThunk(
  "LOG_IN",
  async (token: TokenType, thunkAPI) => {
    try {
      const response = await axios.post("/api/getUserDetails", { token });
      if (response.data) {
        //set the user
        thunkAPI.dispatch(setUser(response.data));
      }
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
)

export const logout = createAsyncThunk(
  "LOG_OUT",
  async (_, thunkAPI) => {

    await thunkAPI.dispatch(unsetUser());
    return true;

  }
)
