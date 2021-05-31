//redux
import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import { spotifySlice } from "./slices/spotifySlice";
import { uiSlice } from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    spotify: spotifySlice.reducer,
    ui: uiSlice.reducer
  },
});
