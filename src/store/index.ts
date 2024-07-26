import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import authSlice from "./auth/authSlice";
import userPreferencesSlice from "./userPreferences/userPreferencesSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    userPreferences: userPreferencesSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
