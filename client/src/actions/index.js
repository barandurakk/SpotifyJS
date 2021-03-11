import axios from "axios";

import {SET_USER} from "./types";

export const signIn = (token) => dispatch => {
console.log("inside actionSignIn", token);
const authToken = {token}
axios.post("/api/getUserDetails", authToken).then(res=>{
    dispatch({type:SET_USER, payload: res.data});
}).catch(err=>{
    console.error(err);
})
}
