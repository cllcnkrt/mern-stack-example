import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import authService from "../../../services/auth";
import { IAuth } from "./IAuth";

export const register = createAsyncThunk<
  IAuth.User,
  IAuth.User,
  {
    rejectValue: string;
  }
>("auth/register", async (user: IAuth.User, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (err: any) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const user = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: IAuth.State = {
  user: user ? user : null,
  loading: "idle",
  errorMessage: "",
};

const AuthSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.loading = "idle";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = "pending";
        state.user = null;
        state.errorMessage = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.errorMessage = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = "failed";
        state.user = null;
        state.errorMessage = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = AuthSlice.actions;
export const { actions, reducer } = AuthSlice;
export const selectAuth = (state: IAuth.State) => state;
export default AuthSlice.reducer;
