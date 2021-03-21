import axios from "axios";
//import {AppDispatch} from "../reducers/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TokenType} from "../../util/getLocalToken";
import {setUser} from "../slices/userSlice";

export const login = createAsyncThunk(
  "LOG_IN",
  async (token:TokenType, thunkAPI) => {
    try{
      const response = await axios.post("/api/getUserDetails", {token});
      console.log("thunkstate: ",thunkAPI.getState())
       if(response.data){
         //set the user
        thunkAPI.dispatch(setUser(response.data));
      }
      return response.data;
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data);
    } 
  }
)

export const setAboutText = createAsyncThunk(
  "SET_ABOUT_TEXT",
  async ({body, token}:any, {rejectWithValue}) => {
    try{
      const response = await axios.post("/api/setUserAbout", {token, body})
      return response.data;
    }catch(err){
      return rejectWithValue(err.response.data);
    } 
  }
)
