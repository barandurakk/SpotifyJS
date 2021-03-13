//redux
import {configureStore} from "@reduxjs/toolkit";

import {userDataSlice} from "./dataReducer";

export const store = configureStore({
  reducer:{
    data: userDataSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


