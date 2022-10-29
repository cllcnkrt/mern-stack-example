import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import AuthReducer from "../slices/auth";
import { selectAuth } from "../slices/auth";
import GoalsReducer from "../slices/goals";
import { selectGoals } from "../slices/goals";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    goals: GoalsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const selectAuthState = (state: RootState) => selectAuth(state.auth);
export const selectGoalsState = (state: RootState) => selectGoals(state.goals);
