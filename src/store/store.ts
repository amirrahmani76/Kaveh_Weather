// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../api/apliSlice";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
});
