import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

const user = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: IAuth.State = {
  user: user ? user : null,
  loading: "idle",
  message: "",
};

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
export const selectAuth = (state: IAuth.State) => state;
export default AuthSlice.reducer;
