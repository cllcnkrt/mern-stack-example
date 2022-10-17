import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../../services/auth";
import { IAuth } from "./IAuth";

const register = createAsyncThunk("auth/register", async (user: IAuth.State, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (err: any) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const user = JSON.parse(localStorage.getItem("user") || "{}");

const initialState = {
  user: user ? user : null,
  loading: "idle",
  message: "",
} as IAuth.State;

const AuthSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.loading = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = "pending";
        state.user = null;
        state.message = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
        state.message = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = "failed";
        state.user = null;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = AuthSlice.actions;
export const { actions, reducer } = AuthSlice;
export const selectUser = (state: IAuth.State) => state.user;
export default AuthSlice.reducer;
