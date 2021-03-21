import {store} from "./store";

//redux types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const SET_USER = "SET_USER";
export const LOADING_DATA = "LOADING_DATA";
