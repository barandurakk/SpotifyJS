import axios from "axios";
//import {AppDispatch} from "../reducers/store";
import {createAsyncThunk} from "@reduxjs/toolkit";

// function withPayloadType<T>() {
//   return (t: T) => ({ payload: t })
// }



export const fetchCurrentUser = createAsyncThunk(
  "FETCH_USER",
  async (token:string, {rejectWithValue}) => {
    try{
      const response = await axios.post("/api/getUserDetails", {token})
      return response.data;
    }catch(err){
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    } 
    //history.push("/profile");
  }
)
