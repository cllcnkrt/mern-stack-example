import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import AuthReducer from "../slices/auth";
import { selectAuth } from "../slices/auth";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const selectAuthState = (state: RootState) => selectAuth(state.auth);
