//redux
import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
//import { RootState } from "./types";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});

//clear store on logout
export const rootReducer: Reducer = (action: AnyAction) => {
  console.log(action.type);
};
