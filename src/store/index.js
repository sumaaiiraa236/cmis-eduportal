// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice"; // <-- NOT "./authSlice"

export const store = configureStore({
  reducer: { auth },
});
